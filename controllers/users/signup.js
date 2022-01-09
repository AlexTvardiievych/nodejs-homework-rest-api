const { User } = require('../../models');
const { Conflict } = require('http-errors');
const bccrypt = require('bcryptjs');

const signup = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Conflict(`Email ${email} in use`);
        }

        const hashPassword = bccrypt.hashSync(password, bccrypt.genSaltSync(10));
        const result = await User.create({ email, password: hashPassword, subscription });

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