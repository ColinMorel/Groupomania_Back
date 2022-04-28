const db = require('../models');
const fs = require('fs'); //gerer les file systeme, pense y

exports.getAllPost = (req,res) =>{
    db.Post.findAll({include: db.Com})
    .then(Posts=>res.send(Posts))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.getAPost = (req,res) =>{
    db.Post.findOne({
        where:{id:req.params.id}
    })
    .then(Post=>res.send(Post))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.createPost = (req,res)=>{
    db.Post.create({
        UserId:req.body.UserId,
        content:req.body.content,
        title:req.body.title,
        author:req.body.author,
        image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(submitedPost => res.send(submitedPost))
    .catch(()=>res.status(500).send(new Error('Attention erreur de database!')))
};

exports.deletePost = (req,res)=>{
    db.Post.findOne({where:{id:req.params.id}})
    .then(post => {
        const filename = post.image.split('/images/')[1];//on recup le nom du fichier
        fs.unlink(`images/${filename}`, () =>{
            db.Post.destroy({where:{id:req.params.id}})
            .then(res.send(`Le Post possédant l'id numero ${req.params.id} a bien été supprimé`))
            .catch((error)=>{res.status(400).json({error})});
        })
    })
    .catch(err => res.status(500).json({err}));
};

exports.editPost = (req,res)=>{
    db.Post.update({
        user_id:req.body.id,
        content:req.body.content,
        title:req.body.title,
        image:req.body.image
    },
    {where:{id: req.params.id}})
    .then(()=>res.send(`L'Post possédant l'id numéro ${req.params.id} a bien été modifié.`))
    .catch(()=>{res.status(500).send(new Error('Database Error!'))});
};
