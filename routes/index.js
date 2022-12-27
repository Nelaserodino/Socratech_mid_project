var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

//ruta base del proyecto --> localhost:3000

//localhost:3000/
router.get("/", indexController.allCollectors);



module.exports = router;
