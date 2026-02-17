const { Router } = require('express');
const { userSignup, userLogin } = require('../controllers/auth.controller');

const authRoute = Router();

authRoute.post("/signup", userSignup);
authRoute.post("/login", userLogin);

module.exports = authRoute;
