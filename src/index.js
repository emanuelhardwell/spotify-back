require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {
  notFoundMiddleware,
  errorMiddleware,
} = require("./middlewares/error.middlewares");
const { dbConnection } = require("./db/db");

const app = express();

// DB connection
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/v1/auth.routes"));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server running in the port 3001"));

// app.post("/refresh", (req, res) => {
//   const refreshToken = req.body.refreshToken;
//   console.log(refreshToken);

//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken,
//   });

//   spotifyApi
//     .refreshAccessToken()
//     .then((data) => {
//       console.log("se renovo");
//       res.status(200).json({
//         ok: true,
//         accessToken: data.body.access_token,
//         expiresIn: data.body.expires_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({
//         ok: false,
//         msg: "Error al renovar token",
//       });
//     });
// });

// app.post("/login", (req, res) => {
//   const code = req.body.code;

//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//   });

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data) => {
//       res.status(200).json({
//         ok: true,
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({
//         ok: false,
//         msg: "Error al generar token",
//       });
//     });
// });
