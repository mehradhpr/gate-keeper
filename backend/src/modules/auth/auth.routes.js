const express = require("express");
const {login, register, logout} = require("./auth.controller");

const router = express.Router();

router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/logout', logout);

module.exports = router;