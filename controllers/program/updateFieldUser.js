// const { uploadCloudinary } = require("../../helpers/uploadCloudinary");
const { User } = require("../../models/userSchema");
// const gravatar = require("gravatar");

// const { HttpError } = require("../../helpers");

const updateFieldUser = async (req, res) => {
  const { name, email, phone, city, experience, firstLogin, image, avatarUrl } =
    req.body;
  const { _id } = req.user;
  //   const { id } = req.params;
  if (!req.file) {
    const user = await User.findByIdAndUpdate(
      _id,
      { ...name, email, phone, city, experience, firstLogin, image, avatarUrl },
      {
        new: true,
      }
    );
    res.status(200).json({
      user: {
        avatarUrl: req.file.path,
        userCurrent: {
          name: user.name,
          email: user.email,
          city: user.city,
          phone: user.phone,
          experience: user.experience,
          firstLogin: user.firstLogin,
        },
      },
    });
  } else {
    const user = await User.findOneAndUpdate(
      _id,
      {
        ...name,
        email,
        phone,
        city,
        experience,
        firstLogin,
        image,
        avatarUrl: req.file.path,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      user: {
        avatarUrl: req.file.path,
        userCurrent: {
          name: user.name,
          email: user.email,
          city: user.city,
          phone: user.phone,
          experience: user.experience,
          firstLogin: user.firstLogin,
        },
      },
    });
  }
};

module.exports = updateFieldUser;
