const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//auth
router.post("/signup",userCtrl.signup);
router.post("/login",userCtrl.login);


//User Database
router.get("/find/all",userCtrl.getAllUser);
router.get("/find/:id",userCtrl.getAUser);
router.put("/edit/:id",auth, multer, userCtrl.editUser);
router.delete("/delete/:id",userCtrl.deleteUser);

module.exports = router;