const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;

    try {
        const avatar = await jimp.read(tempUpload);
        avatar.resize(250, 250);
        await avatar.write(tempUpload);

        const resultUpload = path.join(avatarsDir, originalname);
        await fs.rename(tempUpload, resultUpload);

        const { _id } = req.user._id;
        const [extention] = originalname.split(".").reverse();
        const avatarsName = `${_id}_${originalname}.${extention}`;
        const avatarURL = path.join("public", "avatars", avatarsName);
        await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

        res.json({
            avatarURL
        })
    }
    catch (error) {
        await fs.unlink(tempUpload);
        next(error);
    }
};

module.exports = updateAvatar;