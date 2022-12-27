var express = require('express');
var router = express.Router();
const categoryController = require("../controllers/categoryController");


//localhost:3000/oneCategory/:id
router.get("/oneCategory/:id", categoryController.oneCategory);

module.exports = router;