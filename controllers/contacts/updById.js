const { NotFound, BadRequest } = require('http-errors');
const contactsOperations = require('../../model/index');
const { contactPutSchema } = require('../../schemas/index');

const updById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const bodyFields = { ...req.body };
        const { error } = contactPutSchema.validate(req.body);

        if (Object.keys(bodyFields).length === 0 || error)
            throw new BadRequest('Missing fields or bad data');

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