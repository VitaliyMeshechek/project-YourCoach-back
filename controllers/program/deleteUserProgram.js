const { Program } = require("../../models/programSchema");
const { HttpError } = require("../../helpers");

const deletUserProgram = async (req, res) => {
  const { id } = req.params;

  const deleteUserProgramById = await Program.findByIdAndDelete(id);
  if (!deleteUserProgramById) {
    throw HttpError(
      404,
      `No such trainer program has been found. Check the data`
    );
  }
  res.status(200).json({
    message: `program with name ${deleteUserProgramById.name} has been deleted`,
    id,
  });
};

module.exports = deletUserProgram;
