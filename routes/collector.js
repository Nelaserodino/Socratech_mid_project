var express = require("express");
const collectorController = require("../controllers/collectorController");
const uploadImage = require("../middleware/uploadImage");
var router = express.Router();

//ruta base de un coleccionista --> localhost:3000/collector

// localhost:3000/collector/login
router.get("/login", collectorController.viewLoginForm);

// localhost:3000/users/login
router.post("/login", collectorController.login);

// localhost:3000/registerForm
router.get("/registerForm", collectorController.viewRegisterForm);

 // localhost:3000/collector/registerCollector
 router.post("/registerCollector", uploadImage("collectors"), collectorController.registerCollector);

//localhost:3000/collector/oneCollector/:id
router.get("/oneCollector/:id", collectorController.showOneCollector);


// localhost:3000/collector/oneCollector/delete/:id
router.get("/oneCollector/delete/:id", collectorController.deleteCollector);

//localhost:3000/collector/oneCollector/editCollector/:id
router.get("/oneCollector/editCollector/:id", collectorController.editCollectorForm);

// localhost:3000/collector/oneCollector/editCollector/:id
router.post("/oneCollector/editCollector/:id", uploadImage("collectors"), collectorController.saveEditedCollector);

module.exports = router;