const { NotFound } = require('http-errors');
const contactsOperations = require('../../model/index');

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contacts = await contactsOperations.getContactById(contactId);

        if (!contacts) {
            throw new NotFound(`Contact with id ${contactId} not found`);
        }

        res.json({
            status: "sucess",
            code: 200,
            data: { contacts }
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = getById;