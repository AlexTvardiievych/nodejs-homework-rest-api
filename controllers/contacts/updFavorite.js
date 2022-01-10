const mongoose = require('mongoose');
const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const updFavorite = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;

        if (!mongoose.isValidObjectId(contactId)) {
            throwError(contactId);
        }

        const updatedContacts = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

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

module.exports = updFavorite;