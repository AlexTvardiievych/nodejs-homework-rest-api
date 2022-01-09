const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        res.json({
            status: "Success",
            code: 200,
            data: {
                email,
                subscription
            }
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports = getCurrent;