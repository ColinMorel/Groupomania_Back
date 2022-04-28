const db = require('../models');
const Post = require('../models/post');
const Com = require('../models/com');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs'); //gerer les file systeme, pense y


exports.signup = (req,res,next)=>{
    const user = {...req.body}
        bcrypt.hash(req.body.password, 10)
        .then((hash) =>{
            user.password = hash
            db.User.create(user)
            .then(()=>res.status(201).json({message: 'Utilisateur crée'}))
            .catch((err) => res.status(400).json({err,message:"1ere err"}))
        })
        .catch((err) => res.status(500).json({err,message:"2eme err"}));    
};

exports.login = async (req, res, next)=>{
    db.User.findOne({ where : {email: req.body.email}})
        .then((user) =>{
            if(!user){ // si on n'a pas d'user, alors erreur
                return res.status(401).json({error:'Utilisateur non trouvé!'});
            }
            else{
                bcrypt.compare(req.body.password, user.password) // on compare le mdp entré avec le hash qui est dans la database
                .then((valid) => {
                    console.log("valid est", valid);
                    if(!valid){ // Si comparaison pas bonne, on renvoi erreur
                        return res.status(401).json({error:'Mot de passe incorrect !'})
                    }
                    console.log("valid est bien true");
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                          { userId: user.id }, //payload
                          'RANDOM_TOKEN_SECRET', //secret key
                          { expiresIn: '24h' } //expire
                        )
                      });
                })
                .catch(error => res.status(500).json({message:"Erreur idk"}));
            }
        })            
        .catch(error => res.status(500).json({error}));
};

exports.getAllUser = (req,res)=>{
    db.User.findAll({include: db.Post})
    .then(Users => res.send(Users))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.getAUser = (req,res)=>{
    db.User.findAll({
        where:{
            id:req.params.id
        }
    })
    .then(User=>res.send(User))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.deleteUser = (req,res)=>{
    db.User.findOne({where:{id:req.params.id}})
    .then((user)=>{
        const filename = user.image.split('/images/')[1];//on recup le nom du fichier
        fs.unlink(`images/${filename}`, () =>{
            db.User.destroy({where:{id:req.params.id}})
            .then(res.send(`L'User possédant l'id numero ${req.params.id} a bien été supprimé`))
            .catch(err => console.log(err));
        })
    })
    .catch();
};

exports.editUser = (req,res)=>{
    db.User.findOne({where:{id:req.params.id}})
    .then(user => {
        const filename = user.image.split('/images/')[1];//on recup le nom du fichier
        fs.unlink(`images/${filename}`, () =>{
            db.User.update({image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`},{where:{id: req.params.id}})
                .then(()=>res.send(`L'User possédant l'id numéro ${req.params.id} a bien été modifié.`))
                .catch(err => console.log(err));
        })
    })
}