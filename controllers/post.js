const Post = require('../models/post');
const db = require('../models');


exports.getAllPost = (req,res) =>{
    db.Post.findAll()
    .then(Posts=>res.send(Posts))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.getAPost = (req,res) =>{
    db.Post.findAll({
        where:{id:req.params.id}
    })
    .then(Post=>res.send(Post))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.createPost = (req,res)=>{
    db.Post.create({
        user_id:req.body.user_id,
        content:req.body.content,
        image: req.body.image
    })
    .then(submitedPost => res.send(submitedPost))
    .catch(()=>{res.status(500).send(new Error('Database Error!'))});
};

exports.deletePost = (req,res)=>{
    db.Post.destroy({
        where:{id:req.params.id}
    }).then(res.send(`Le Post possédant l'id numero ${req.params.id} a bien été supprimé`))
    .catch(()=>{res.status(500).send(new Error('Database Error!'))});
};

exports.editPost = (req,res)=>{
    db.Post.update({
        user_id:req.body.id,
        content:req.body.content,
        image:req.body.image
    },
    {where:{id: req.params.id}})
    .then(()=>res.send(`L'Post possédant l'id numéro ${req.params.id} a bien été modifié.`))
    .catch(()=>{res.status(500).send(new Error('Database Error!'))});
};
