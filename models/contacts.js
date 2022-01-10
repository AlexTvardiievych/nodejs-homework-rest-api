const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactsSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

const contactJoiSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.bool().default(false),
});

const favoritePatchJoiSchema = Joi.object({
    favorite: Joi.bool().valid(true, false).required(),
});

const Contact = model("contact", contactsSchema);

module.exports = {
    Contact,
    contactJoiSchema,
    favoritePatchJoiSchema,
}

