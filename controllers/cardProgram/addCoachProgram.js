const { Program } = require("../../models/programSchema");

const { HttpError } = require("../../helpers");

const addCoachProgram = async (req, res) => {
  const { name } = req.body;
  const { _id: ownerId } = req.user;
  if (!req.body) {
    throw HttpError(400, "Not all fields are filled");
  }

  const checkName = await Program.findOne({ name: name });
  if (checkName) {
    throw HttpError(400, "This name is already in use");
  }

  if (!req.file) {
    const result = await Program.create({ ...req.body, owner: ownerId });

    res.status(201).json(result);
  } else {
    const coachProgramAvatar = await Program.create({
      ...req.body,
      avatarUrl: req.file.path,
      owner: ownerId,
    });

    res.status(201).json({ coachProgramAvatar });
  }
};

module.exports = addCoachProgram;
