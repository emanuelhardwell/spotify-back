const { Router } = require("express");
const {
  getFavorites,
  deleteFavorite,
  createFavorite,
} = require("../../controllers/favorite.controller");
const router = Router();

router.get("/", getFavorites);

router.post("/", createFavorite);

router.delete("/:id", deleteFavorite);

module.exports = router;
