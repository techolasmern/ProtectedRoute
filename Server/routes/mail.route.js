const { Router } = require("express");
const mailController = require("../controllers/mail.controller");

const mailRoute = Router();

mailRoute.post('/otp/send', mailController.sendOneTimePassword);
mailRoute.post('/otp/verify', mailController.verifyOneTimePassword);
mailRoute.post('/otp/resend', mailController.resendOneTimePassword);

module.exports = mailRoute;
