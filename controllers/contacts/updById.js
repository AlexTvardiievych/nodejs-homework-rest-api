const { NotFound } = require('http-errors');
const contactsOperations = require('../../model/index');

const updById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const bodyFields = { ...req.body };

        const updatedContacts = await contactsOperations.updateContact(contactId, bodyFields);

        if (!updatedContacts) {
            throw new NotFound(`Contact with id ${contactId} not found`);
        }

        res.json({
            status: "sucess",
            code: 200,
            data: { updatedContacts }
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = updById;