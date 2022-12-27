const express = require("express");
const collectibleController = require("../controllers/collectibleController");
const uploadImage = require("../middleware/uploadImage");
const router = express.Router();

// ruta base: localhost:3000/collectible

// localhost:3000/collectible/addCollectible/:id
router.get("/addCollectible/:id", collectibleController.createCollectibleForm);

// localhost:3000/collectible/addCollectible
router.post("/addCollectible", uploadImage("collectibles"), collectibleController.addCollectible);

// localhost:3000/collectible/editCollectible/:collectible_id
router.get("/editCollectible/:collectible_id", collectibleController.viewCollectibleEditForm);

// localhost:3000/collectible/editCollectible/:collectible_id/:collector_id
router.post(
    "/editCollectible/:collectible_id/:collector_id",
    uploadImage("collectibles"),
    collectibleController.editCollectible
  );

// localhost:3000/collectible/deleteCollectible/:collectible_id/:collector_id
router.get("/deleteCollectible/:collectible_id/:collector_id", collectibleController.deleteCollectible);

// localhost:3000/collectible/navAddCollectible
router.get("/navAddCollectible", collectibleController.navAddCollectible);

//localhost:3000/collectible/allCollectibles
router.get("/allCollectibles", collectibleController.showAllCollectibles);

module.exports = router;