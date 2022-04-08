const express = require('express');
const router = express.Router();
const db = require('../models');

//get all Users
router.get("/find/all",(req,res)=>{
    db.User.findAll().then(Users=>res.send(Users));
});

//get a User
router.get("/find/:id",(req,res)=>{
    db.User.findAll({
        where:{
            id:req.params.id
        }
    }).then(User=>res.send(User));
});

//create a new user
router.post("/new",(req,res)=>{
    db.User.create({mail:req.body.mail,password:req.body.password,lastname:req.body.lastname,firstname:req.body.firstname})
        .then(submitedUser => res.send(submitedUser))
});

//delete a User
router.delete("/delete/:id",(req,res)=>{
    db.User.destroy({
        where:{
            id:req.params.id
        }
    }).then(res.send(`L'User possédant l'id numero ${req.params.id} a bien été supprimé`))
})

//edit a User
router.put("/edit/:id",(req,res)=>{
    db.User.update(
    {
        mail:req.body.mail,
        password:req.body.password,
        lastname:req.body.lastname,
        firstname:req.body.firstname
    },
    {
        where:{id: req.params.id}
    }).then(()=>res.send(`L'User possédant l'id numéro ${req.params.id} a bien été modifié.`))
})
module.exports = router;