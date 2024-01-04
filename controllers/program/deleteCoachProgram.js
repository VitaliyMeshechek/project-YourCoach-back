const { Program } = require("../../models/programSchema");
const { HttpError } = require("../../helpers");

const deleteCoachProgram = async (req, res) => {
  const { id } = req.params;

  const deleteCoachProgramById = await Program.findByIdAndDelete(id);
  if (!deleteCoachProgramById) {
    throw HttpError(
      404,
      `No such trainer program has been found. Check the data`
    );
  }
  res.status(200).json({
    message: `program with name ${deleteCoachProgramById.name} has been deleted`,
    id,
  });
};

module.exports = deleteCoachProgram;
