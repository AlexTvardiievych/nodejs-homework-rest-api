const mongoose = require('mongoose');
const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;

        console.log("HERE");

        if (!mongoose.isValidObjectId(contactId)) {
            throwError(contactId);
        }

        const result = await Contact.findOneAndDelete({ _id: contactId, owner: contactId });

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