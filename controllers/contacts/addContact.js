const contactsOperations = require('../../model/index');
const { contactSchema } = require('../../schemas/index');
const { BadRequest } = require('http-errors');


const addContact = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);

        if (error) {
            throw new BadRequest('Missing required name field');
        }

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