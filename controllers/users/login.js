const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const bccrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const passCompare = bccrypt.compareSync(password, user.password);

        if (!user || !user.verify || !passCompare) {
            throw new Unauthorized("Email is wrong or not verify or password are wrong");
        }

        const payload = {
            id: user._id
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        await User.findByIdAndUpdate(user._id, { token }, { new: true });

        res.status(200).json({
            status: 'OK',
            code: 200,
            data: {
                "user": {
                    user
                }
            }
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports = login;