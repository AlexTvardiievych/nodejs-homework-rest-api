const contactsOperations = require('../../model/index');

const addContact = async (req, res, next) => {
    try {
        const newContact = await contactsOperations.addContact({ ...req.body });

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