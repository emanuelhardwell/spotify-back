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
app.use("/api/v1/favorite", require("./routes/v1/favorite.routes"));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server running in the port 3001"));
