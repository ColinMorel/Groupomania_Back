const db = require('../models');
const fs = require('fs'); //gerer les file systeme, pense y

exports.getAllCom = (req,res) =>{
    db.Com.findAll()
    .then(Coms=>res.send(Coms))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.getACom = (req,res) =>{
    db.Com.findOne({
        where:{id:req.params.id}
    })
    .then(Com=>res.send(Com))
    .catch(()=>{res.status(404).send(new Error('OH OH NOT FOUND'))});
};

exports.createCom = (req,res)=>{
    db.Com.create({...req.body})
    .then(submitedCom => res.send(submitedCom))
    .catch(()=>res.status(500).send(new Error('Attention erreur de database!')))
};

exports.deleteCom = (req,res)=>{
    db.Com.destroy({where:{id:req.params.id}})
    .then(`Le com avec l'Id numéro ${req.params.id} a bien été supprimé`)
    .catch(err => res.status(500).json({err}));
};

exports.editCom = (req,res)=>{
    db.Com.update({
        content:req.body.content,
        likes:req.body.likes,
        dislikes:req.body.dislikes
    },
    {where:{id: req.params.id}})
    .then(()=>res.send(`L'Com possédant l'id numéro ${req.params.id} a bien été modifié.`))
    .catch(()=>{res.status(500).send(new Error('Database Error!'))});
};