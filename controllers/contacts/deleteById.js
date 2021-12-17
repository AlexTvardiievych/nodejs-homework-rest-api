const { NotFound } = require('http-errors');
const contactsOperations = require('../../model/index');

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactsOperations.removeContact(contactId);

        if (!result) {
            throw new NotFound(`Contact with id ${contactId} not found`);
        }

        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

module.exports = deleteById;