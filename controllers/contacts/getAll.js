const { Contact } = require('../../models');
const { BadRequest } = require('http-errors');

const getAll = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { page = 1, limit = 10 } = req.query;

        if (isNaN(page) || isNaN(limit)) {
            throw BadRequest("Parameters are invalid!");
        }

        const skip = (page - 1) * limit;

        const contacts = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate("owner", "_id, email");
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