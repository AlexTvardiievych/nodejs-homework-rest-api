const { Contact } = require('../../models');

const addContact = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const newContact = await Contact.create({ ...req.body, owner: _id });

        res.json({
            status: "sucess",
            code: 201,
            data: { newContact }
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = addContact;