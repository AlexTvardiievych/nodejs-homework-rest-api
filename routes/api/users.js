const express = require('express');
const { users: ctrl } = require('../../controllers/index');
const { userRegisterJoiSchema, userLoginJoiSchema, userResendEmailJoiSchema } = require('../../models/users');
const { validation, login, upload } = require('../../middleware');
const router = express.Router();

router.post("/signup", validation(userRegisterJoiSchema), ctrl.signup);

router.post("/login", validation(userLoginJoiSchema), ctrl.login);

router.get("/current", login, ctrl.getCurrent);

router.post("/logout", login, ctrl.logout);

router.patch("/avatars", login, upload.single("avatar"), ctrl.updateAvatar);

router.post("/verify", validation(userResendEmailJoiSchema), login, ctrl.resendEmail);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

module.exports = router
