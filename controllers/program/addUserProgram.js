const { Program } = require("../../models/programSchema");

const { HttpError } = require("../../helpers");

const addUserProgram = async (req, res) => {
  const {
    photo,
    category,
    nameYourProgram,
    typeYourProgram,
    description,
    duration,
    training,
    comments,
  } = req.body;
  const { _id: ownerId } = req.user;
  if (!req.body) {
    throw HttpError(400, "Not all fields are filled");
  }

  const checkName = await Program.findOne({ name: nameYourProgram });
  if (checkName) {
    throw HttpError(400, "This name is already in use");
  }

  if (!req.file) {
    const result = await Program.create({
      ...photo,
      category,
      nameYourProgram,
      typeYourProgram,
      description,
      duration,
      training,
      comments,
      owner: ownerId,
    });

    res.status(201).json(result);
  } else {
    const userProgramAvatar = await Program.create({
      ...photo,
      category,
      nameYourProgram,
      typeYourProgram,
      description,
      duration,
      training,
      comments,
      avatarUrl: req.file.path,
      owner: ownerId,
    });

    res.status(201).json({ userProgramAvatar });
  }
};

module.exports = addUserProgram;
