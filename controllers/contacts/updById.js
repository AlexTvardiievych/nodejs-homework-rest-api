const mongoose = require('mongoose');
const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updById = async (req, res, next) => {
    try {
        const { contactId } = req.params;

        if (!mongoose.isValidObjectId(contactId)) {
            throwError(contactId);
        }

        const updatedContacts = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

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