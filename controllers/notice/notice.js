const { Program } = require("../../models/programSchema");

const { HttpError } = require("../../helpers/HttpError");
// const gravatar = require("gravatar");
const { User } = require("../../models/userSchema");

const createNotice = async (req, res, next) => {
  // const { email } = req.user;
  const { _id: owner } = req.user;
  const { categoryName } = req.params; // Get the category from req.query instead of req.body

  if (!categoryName) {
    return res.status(400).json({ error: "Category is required" });
  }

  const programNotice = await Program.create([
    {
      ...req.body,
      avatarUrl: req.file.path,
      owner,
      category: categoryName, // Include the category in the notice object
    },
  ]);

  res.status(200).json({ programNotice, message: "Successfully" });
};

const addCoachRating = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const coach = await Program.findOne({ _id: id });

  if (!coach) {
    return res.status(404).json({ message: "Coach not found" });
  }

  const rating = coach.rating || [];

  if (rating.includes(userId)) {
    throw new Error("Coach already added to ratings");
  }

  await User.findByIdAndUpdate(userId, {
    $push: { rating: { ...coach._doc, id } },
  });

  res.status(200).json({
    rating: rating.concat({ userId, ...coach._doc }),
    message: "Success",
  });
};

const deleteCoachRating = async (req, res, next) => {
  const { _id: userId, rating } = req.user;
  const { id } = req.params;

  const existingCoach = rating.find((item) => item.id === id);

  if (!existingCoach) {
    return res.status(409).json({
      message: "The coach is not in the rating",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { rating: { id } } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    rating: updatedUser.rating,
    id,
    message: "Successfully removed from rating",
  });
};

const deleteCoachProgram = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id } = req.params;

  const deleteCoachProgram = await Program.findOne({ _id: id });

  if (!deleteCoachProgram) {
    throw HttpError(404, "Coach program does not exist");
  }

  await Program.findOneAndRemove({ _id: id, owner: userId });

  res.status(200).json({ message: "Coach program successfully deleted" });
};

const getCoachProgramByCategory = async (req, res) => {
  const { categoryName: category, id } = req.params;
  const { query: title, page, limit } = req.query;
  const skip = (page - 1) * limit;
  if (!title && !category) {
    const allCoachesPrograms = await Program.find(
      {},
      "-createdAt -updatedAt -idCloudAvatar",
      {
        skip,
        limit,
      }
    );
    res.status(200).json(allCoachesPrograms);
  } else if (category && !title && !id) {
    const coachesProgramsByCategory = await Program.find(
      { category },
      "-createdAt -updatedAt -idCloudAvatar",
      {
        skip,
        limit,
      }
    );
    res.status(200).json(coachesProgramsByCategory);
  } else if (category && title && !id) {
    const regex = new RegExp(title, "i");
    const coaches = await Program.find(
      { category, title: { $regex: regex } },
      "-createdAt -updatedAt -idCloudAvatar",
      {
        skip,
        limit,
      }
    );
    res.status(200).json(coaches);
  } else if (category && title && id) {
    const regex = new RegExp(title, "i");
    const coaches = await Program.find(
      { category, title: { $regex: regex }, _id: id },
      "-createdAt -updatedAt -idCloudAvatar",
      {
        skip,
        limit,
      }
    );
    res.status(200).json(coaches);
  } else if (id) {
    const coach = await Program.findById(
      id,
      "-createdAt -updatedAt -idCloudAvatar",
      {
        skip,
        limit,
      }
    );
    if (coach) {
      res.status(200).json([coach]);
    } else {
      res.status(404).json({ error: "Coach program not found" });
    }
  } else {
    res.status(400).json({ error: "No search parameters provided" });
  }
};

const getUserByRating = async (req, res) => {
  const { _id: userId } = req.user;
  const coaches = await User.findById(userId)
    .populate("rating")
    .select("rating");

  res.status(200).json(coaches.rating);
};

const getUserByCoaches = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const coaches = await Program.find(
    { owner: userId },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );

  res.status(200).json(coaches);
};

const getAllCoaches = async (req, res) => {
  const coaches = await Program.find();
  res.status(200).json(coaches);
};

module.exports = {
  getUserByCoaches,
  getCoachProgramByCategory,
  createNotice,
  addCoachRating,
  getUserByRating,
  deleteCoachRating,
  deleteCoachProgram,
  getAllCoaches,
};
