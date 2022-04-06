const express = require('express');
const router = express.Router();
const db = require('../models');

//get all todos
router.get("/all",(req,res)=>{
    db.Todo.findAll().then(todos=>res.send(todos));
});

//get a todo
router.get("/find/:id",(req,res)=>{
    db.Todo.findAll({
        where:{
            id:req.params.id
        }
    }).then(todo=>res.send(todo));
});

// create a new todo
router.post("/new",(req,res)=>{
    db.Todo.create({text: req.body.text})
        .then(subimttedTodo=> res.send(subimttedTodo));
});

//delete a todo
router.delete("/delete/:id",(req,res)=>{
    db.Todo.destroy({
        where:{
            id:req.params.id
        }
    }).then(res.send(`L'id numero ${req.params.id} a bien été supprimé`))
})

//edit a todo
router.put("/edit",(req,res)=>{
    db.Todo.update(
    {
        text:req.body.text //Le texte à modifier
    },
    {
        where:{id: req.body.id}
    }).then(()=>res.send(`Le todo numéro ${req.body.id} a bien été modifié.`))
})
module.exports = router;