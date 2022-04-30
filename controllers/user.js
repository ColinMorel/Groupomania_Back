const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs'); //gerer les file systeme, pense y

exports.signup = (req,res,next)=>{
    const user = {...req.body}
        bcrypt.hash(req.body.password, 10)
        .then((hash)=>{
            user.password = hash
            db.User.create(user)
            .then(()=>res.status(201).json({message: 'Utilisateur crée'}))
            .catch((err)=>res.status(400).json({err,message:"1ere err"}))
        })
        .catch((err)=>res.status(500).json({err,message:"2eme err"}));    
};

exports.login = async (req, res, next)=>{
    db.User.findOne({ where : {email: req.body.email}})
        .then((user)=>{
            if(!user){ 
                return res.status(401).json({error:'Utilisateur non trouvé!'});
            }
            else{
                bcrypt.compare(req.body.password, user.password) 
                .then((valid)=>{
                    console.log("valid est", valid);
                    if(!valid){ 
                        return res.status(401).json({error:'Mot de passe incorrect !'})
                    }
                    console.log("valid est bien true");
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                          { userId: user.id },
                          process.env.SECRET_TOKEN,
                          { expiresIn: '24h' } 
                        )
                      });
                })
                .catch(error=>res.status(500).json({message:"Erreur idk"}));
            }
        })            
        .catch(error=>res.status(500).json({error}));
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
    .then((user)=>{
        if(req.file && req.body.bio){
            const filename = user.image.split('/images/')[1];//on recup le nom du fichier
            fs.unlink(`images/${filename}`, () =>{
            db.User.update({bio:req.body.bio,image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`},{where:{id: req.params.id}});
            })
        }
        else if(req.file){
            const filename = user.image.split('/images/')[1];//on recup le nom du fichier
            fs.unlink(`images/${filename}`,()=>{
            db.User.update({image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`},{where:{id: req.params.id}});
            })
        }
        else{
            db.User.update({bio:req.body.bio},{where:{id: req.params.id}})
            .then(()=>res.send(`L'User possédant l'id numéro ${req.params.id} a bien été modifié.`))
            .catch(err => console.log(err));            
        }            
    });
};