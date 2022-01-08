const { Contact } = require('../../models');

const addContact = async (req, res, next) => {
    try {
        console.log("START");
        const newContact = await Contact.create(req.body);

        console.log(newContact);
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