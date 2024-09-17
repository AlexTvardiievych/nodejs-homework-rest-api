const getAll = require('./getAll');
const getById = require('./getById');
const addContact = require('./addContact');
const deleteById = require('./deleteById');
const updById = require('./updById');
const updFavorite = require('./updFavorite');

module.exports = {
    getAll,
    getById,
    addContact,
    deleteById,
    updById,
    updFavorite,
}