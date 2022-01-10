const { Contact } = require('../../models');

const addContact = async (req, res, next) => {
    try {
        const newContact = await Contact.create(req.body);

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