const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

router.get("/find/all",postCtrl.getAllPost);
router.get("/find/:id",postCtrl.getAPost);
router.post("/new",postCtrl.createPost);
router.delete("/delete/:id",postCtrl.deletePost);
router.put("/edit/:id",postCtrl.editPost);

module.exports = router;