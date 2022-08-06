const { Router } = require("express");
const { login, renewToken } = require("../../controllers/auth.controllers");
const router = Router();

router.post("/login", login);

router.post("/refresh", renewToken);

module.exports = router;
