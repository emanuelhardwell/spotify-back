const {
  responseError500,
  responseSuccessfully,
  responseErrorCode,
} = require("../middlewares/handleResponse");
const Favorite = require("../models/Favorite.model");

const favoriteCtrl = {};

favoriteCtrl.getFavorites = async (req, res) => {
  const { idUser = "", type = "" } = req.query;

  try {
    const favorites = await Favorite.findAll({ where: { idUser, type } });

    responseSuccessfully(res, "Canciones y Artistas obtenidos", 200, {
      favorites,
    });
  } catch (error) {
    responseError500(res, error);
  }
};

favoriteCtrl.createFavorite = async (req, res) => {
  const { idUser, idFavorite } = req.body;

  try {
    const favorite = await Favorite.findOne({ where: { idUser, idFavorite } });
    if (favorite) {
      return responseErrorCode(res, "Este elemento ya esta en favoritos", 400);
    }

    const favoriteSaved = await Favorite.create(req.body);

    responseSuccessfully(res, "Agregado a favoritos", 200, {
      favorite: favoriteSaved,
    });
  } catch (error) {
    responseError500(res, error);
  }
};

favoriteCtrl.deleteFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await Favorite.findOne({ where: { id } });
    if (!favorite) {
      return responseErrorCode(res, "Este elemento no existe", 400);
    }

    await Favorite.destroy({ where: { id } });

    responseSuccessfully(res, "Eliminado de favoritos", 200, {});
  } catch (error) {
    responseError500(res, error);
  }
};

module.exports = favoriteCtrl;
