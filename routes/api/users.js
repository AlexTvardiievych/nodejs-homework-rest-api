const express = require('express');
const { users: ctrl } = require('../../controllers/index');
const { userRegisterJoiSchema, userLoginJoiSchema } = require('../../models/users');
const { validation, login } = require('../../middleware/index');
const router = express.Router();

router.post("/signup", validation(userRegisterJoiSchema), ctrl.signup);

router.post("/login", validation(userLoginJoiSchema), ctrl.login);

router.get("/current", login, ctrl.getCurrent);

router.post("/logout", login, ctrl.logout);

module.exports = router
