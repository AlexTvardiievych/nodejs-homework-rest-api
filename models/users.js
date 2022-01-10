const { Schema, model } = require("mongoose");
const Joi = require("joi");

const user = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

const userRegisterJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
    token: Joi.string().default(null),
});

const userLoginJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

const userResendEmailJoiSchema = Joi.object({
    email: Joi.string().required(true, "missing required field email")
})

const User = model("user", user);

module.exports = {
    userRegisterJoiSchema,
    userLoginJoiSchema,
    userResendEmailJoiSchema,
    User
}

