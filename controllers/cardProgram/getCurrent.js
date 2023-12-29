const { Program } = require("../../models/programSchema");

const getCurrent = async (req, res) => {
  const {
    name,
    fitnessWeigth,
    fitnessStrength,
    fitnessWellness,
    aerobic,
    strong,
    health,
    functions,
    step,
    impact,
    special,
    food,
    description,
    duration,
    training,
    email,
    phone,
    city,
    avatarUrl,
    category,
    _id: owner,
  } = req.user;

  const programs = await Program.find({ owner });

  res.status(201).json({
    user: {
      _id: owner,
      avatarUrl,
      programs: [...programs],
      userCurrent: {
        name,
        fitnessWeigth,
        fitnessStrength,
        fitnessWellness,
        aerobic,
        strong,
        health,
        functions,
        step,
        impact,
        special,
        food,
        description,
        duration,
        training,
        email,
        city,
        phone,
        category,
      },
    },
    message: "Your request has been successfully completed",
  });
};

module.exports = getCurrent;
