const { generateAndSendOTP } = require("../lib/mailer");
const UserModel = require("../models/user.model");
const { userLogin } = require("./auth.controller");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sendOneTimePassword = async (request, response) => {
    try {
        // Validate request body & check if email is valid
        const post_data = request?.body;
        console.log(post_data)
        if (!post_data || !post_data?.email) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Email is required`
            })
        }
        const { email } = post_data;
        if (!emailRegex.test(email)) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Email is invalid`
            })
        }
        // Check if email already exists
        const existing_data = await UserModel.findOne({ email });
        if(!existing_data) {
            return response.status(404).send({
                ok: false,
                message: `NOT FOUND: You're new user. Please sign up first.`
            })
        }
        if (existing_data.otp?.expire > Math.floor(Date.now() / 1000)) {
            return response.status(409).send({
                ok: false,
                message: `CONFLICT: Otp already sent. Please check your email.`
            })
        }
        // Generate and send OTP
        const result = await generateAndSendOTP(email);
        if (!result?.ok) {
            return response.status(400).send(result);
        }
        const { otp, ...rest } = result;
        const data = { value: otp, expire: Math.floor(Date.now() / 1000) + 300, cooldown: Math.floor(Date.now() / 1000) + 60 };
        existing_data.otp = data;
        await existing_data.save();
        return response.status(200).send(rest);
    } catch (err) {
        return response.status(500).send({
            ok: false,
            message: `SERVER ERROR: Failed to send OTP`
        })
    }
}

const verifyOneTimePassword = async (request, response) => {
    try {
        // Validate request body & check if email is valid
        const post_data = request?.body;
        if (!post_data || !post_data?.email || !post_data?.otp) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Email and OTP are required`
            })
        }
        const { email, otp } = post_data;
        if (!emailRegex.test(email)) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Email is invalid`
            })
        }
        // Check if email already exists
        const existing_data = await UserModel.findOne({ email });
        if (!existing_data) {
            return response.status(404).send({
                ok: false,
                message: `NOT FOUND: You're new user. Please sign up first.`
            })
        }
        // Check if OTP is valid
        if (existing_data.otp.expire < Math.floor(Date.now() / 1000)) {
            if (existing_data.otp.value === otp) {
                return response.status(400).send({
                    ok: false,
                    message: `BAD REQUEST: OTP expired`
                })
            }
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Unable to verify OTP. Try again with new OTP.`
            })
        }
        if (existing_data.otp.value !== otp) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Invalid OTP`
            })
        }
        // OTP is valid
        return response.status(200).send({
            ok: true,
            message: `SUCCESS: OTP verified`
        })
    } catch (err) {
        return response.status(500).send({
            ok: false,
            message: `SERVER ERROR: Failed to verify OTP`
        })
    }
}

const resendOneTimePassword = async (request, response) => {
    try {
        // Validate request body & check if email is valid
        const post_data = request?.body;
        if (!post_data || !post_data?.email) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Email is required`
            })
        }
        const { email } = post_data;
        if (!emailRegex.test(email)) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: Email is invalid`
            })
        }
        // Check if email already exists
        const existing_data = await OTPModel.findOne({ email });
        if (!existing_data) {
            return response.status(404).send({
                ok: false,
                message: `NOT FOUND: You're new user. Please send OTP first.`
            })
        }
        // Check if OTP is resendable
        if (existing_data.resend_at > Date.now()) {
            return response.status(400).send({
                ok: false,
                message: `BAD REQUEST: OTP is resendable after ${Math.floor((existing_data.resend_at - Date.now()) / 1000)}s.`
            })
        }
        // Resend OTP
        const result = await generateAndSendOTP(email);
        if (!result?.ok) {
            return response.status(400).send(result);
        }
        const { otp, ...rest } = result;
        const data = { otp, verified: false, expires_at: Date.now() + 300000, resend_at: Date.now() + 60000 };
        const updated_data = await OTPModel.updateOne({ email }, { $set: data });
        if (updated_data.matchedCount == 0 && updated_data.modifiedCount == 0) {
            return response.status(500).send({
                ok: false,
                message: `DATABASE ERROR: Failed to update document.`
            })
        }
        return response.status(200).send(rest);
    } catch (err) {
        return response.status(500).send({
            ok: false,
            message: `SERVER ERROR: Failed to resend OTP`
        })
    }
}

module.exports = {
    sendOneTimePassword,
    verifyOneTimePassword,
    resendOneTimePassword
}
