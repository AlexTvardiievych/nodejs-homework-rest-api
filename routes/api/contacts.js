const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers/index');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', ctrl.updById);

module.exports = router
