const { User } = require('../../models');
const { Conflict } = require('http-errors');
const bccrypt = require('bcryptjs');
const gravatar = require('gravatar');
const nanoid = require('nanoid');
const { sendEmail } = require('../../helpers');

const signup = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Conflict(`Email ${email} in use`);
        }

        const avatarURL = gravatar.url(email);
        const hashPassword = bccrypt.hashSync(password, bccrypt.genSaltSync(10));
        const verificationToken = nanoid();
        const result = await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });

        const mail = {
            to: email,
            subject: "Verification email",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}"> Verify email </a>`
        }

        await sendEmail(mail);

        res.status(201).json({
            status: 'Created',
            code: 201,
            data: {
                "user": {
                    result
                }
            }
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports = signup;