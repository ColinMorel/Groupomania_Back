const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post("/new",auth, multer, postCtrl.createPost);
router.get("/find/all",auth,postCtrl.getAllPost);
router.get("/find/:id",auth,postCtrl.getAPost);
router.delete("/delete/:id",auth,postCtrl.deletePost);
router.put("/edit/:id",auth, multer, postCtrl.editPost);

module.exports = router;