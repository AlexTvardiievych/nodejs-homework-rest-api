const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers/index');
const { contactJoiSchema, favoritePatchJoiSchema } = require('../../models/contacts');
const { validation, login } = require('../../middleware/index');

router.get('/', login, ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', login, validation(contactJoiSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validation(contactJoiSchema), ctrl.updById);

router.patch('/:contactId/favorite', validation(favoritePatchJoiSchema), ctrl.updFavorite);

module.exports = router
