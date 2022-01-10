const { User } = require('../../models');
const { sendEmail } = require('../../helpers');
const { BadRequest } = require('http-errors');

const resendEmail = async (req, res) => {
    const { verify, verificationToken, email } = req.user;

    if (verify) {
        throw BadRequest("Verification has already been passed");
    }

    const mail = {
        to: email,
        subject: "Verification email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}"> Verify email </a>`
    }

    await sendEmail(mail);

    res.status(200).json({
        status: "OK",
        data: {
            message: "Verification email sent"
        }
    })
}

module.exports = resendEmail;