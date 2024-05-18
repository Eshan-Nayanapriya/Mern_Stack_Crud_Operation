const express = require('express');
const router = express.Router();
//Insert model
const user =   require('../Model/userModel');
//Insert user Controller
const userController = require('../Controllers/userControllers');

router.get("/",userController.getAllUsers);
router.post("/",userController.addUsers);
router.get("/:id",userController.getById);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

//export
module.exports = router;