const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarDir, filename);

    await Jimp.read(tempUpload)
      .then((img) => img.resize(250, 250).write(resultUpload))
      .catch((err) => {
        console.error(err);
      });

    await fs.unlink(tempUpload);
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
