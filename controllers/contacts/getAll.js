const contactsOperations = require('../../model/index');

const getAll = async (req, res, next) => {
    try {
        const contacts = await contactsOperations.listContacts();
        res.json({
            message: 'success',
            code: 200,
            data: {
                contacts
            }
        })
    }
    catch (error) {
        next(error);
    }

}

module.exports = getAll;