const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers/index');
const { contactSchema, contactPutSchema } = require('../../schemas/index');
const { validation } = require('../../middleware/index');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(contactSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validation(contactPutSchema), ctrl.updById);

module.exports = router
