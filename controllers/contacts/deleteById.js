const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);

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