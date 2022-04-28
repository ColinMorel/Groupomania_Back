const express = require('express');
const router = express.Router();
const comCtrl = require('../controllers/com');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post("/new",auth, multer, comCtrl.createCom);
router.get("/find/all",auth,comCtrl.getAllCom);
router.get("/find/:id",auth,comCtrl.getACom);
router.delete("/delete/:id",auth,comCtrl.deleteCom);
router.put("/edit/:id",auth, multer, comCtrl.editCom);

module.exports = router;