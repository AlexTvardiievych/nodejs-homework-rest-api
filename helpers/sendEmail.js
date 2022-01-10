const nodemailer = require('nodemailer');

require('dotenv').config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "goittestmail@meta.ua",
        pass: META_PASSWORD
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: "goittestmail@meta.ua" };
    try {
        await transporter.sendMail(email);
        return true;
    }
    catch (error) {
        throw error;
    }
}

module.exports = sendEmail;



