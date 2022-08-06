const {
  responseSuccessfully,
  responseErrorCode,
} = require("../middlewares/handleResponse");
const SpotifyWebApi = require("spotify-web-api-node");

const authCtrl = {};

authCtrl.login = (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      responseSuccessfully(res, "Login correcto", 200, {
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);

      return responseErrorCode(res, "Error al generar token", 400);
    });
};

authCtrl.renewToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("se renovo");

      responseSuccessfully(res, "Renew token correcto", 200, {
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);

      return responseErrorCode(res, "Error al renovar token", 400);
    });
};

module.exports = authCtrl;
