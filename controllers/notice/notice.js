const { Notice } = require("../../models/noticeSchema");

const { HttpError } = require("../../helpers/HttpError");

const { User } = require("../../models/userSchema");


const createNotice = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { categoryName } = req.params; // Get the category from req.query instead of req.body

  if (!categoryName) {
    return res.status(400).json({ error: "Category is required" });
  }

  const programNotice = await Notice.create([
    {
      ...req.body,
      avatar: req.file.path,
      owner,
      category: categoryName, // Include the category in the notice object
    },
  ]);

  res.status(200).json({ programNotice, message: "Successfully" });
};

// const addCoachFavorite = async (req, res) => {
//   const { _id: userId } = req.user;
//   const { id } = req.params;

//   const coach = await Notice.findOne({ _id: id });
//   console.log('addCoachFavorite', coach)

//   if (!coach) {
//     return res.status(404).json({ message: "Coach program not found" });
//   }

//   const favorite = coach.favorite || [];
//   console.log('favorite', favorite)
//   if (favorite.includes(userId)) {
//     throw new Error("Coach already added to ratings");
//   }

//   const findFavorite = await User.findByIdAndUpdate(userId, {
//     $push: { favorite: { ...coach._doc, id } },
//   });

//   console.log('findFavorite', findFavorite)

//   res.status(200).json({
//     favorite: favorite.concat({ userId, ...coach._doc }),
//     message: "Success",
//   });
// };


const addCoachFavorite = async (req, res) => {
  const { id } = req.params;

  const coach = await Notice.findOne({_id: id});
  console.log('coach', coach)

  if (!coach) {
    return res.status(404).json({ message: "Coach program not found" });
  }

  // if (rating.includes(id)) {
  //   throw new Error("Coach already added to ratings");
  // }
  //   const favorite = coach.favorite || [];
  // console.log('favorite', favorite)


  const updateFavorite = await User.findOneAndUpdate(id, {$push: { favorite: { ...coach._doc, id}}})
  console.log('updateFavorite', updateFavorite)
  

  res.status(200).json({
    favorite: { coachId: coach.owner, ...coach._doc },
    message: "Favorite coach added successfully",
  });
};


// const deleteCoachFavorite = async (req, res, next) => {
//   const { _id: userId, favorite } = req.user;
//   const { id } = req.params;

//   const existingCoach = favorite.find((item) => item.id === id);

//   if (!existingCoach) {
//     return res.status(409).json({
//       message: "The coach is not in the favorite",
//     });
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     userId,
//     { $pull: { favorite: { id } } },
//     { new: true }
//   );

//   if (!updatedUser) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.status(200).json({
//     favorite: updatedUser.favorite,
//     id,
//     message: "Successfully removed from favorite",
//   });
// };

const deleteCoachFavorite = async (req, res) => {
  const { id } = req.params;

  // if (!existingCoach) {
  //   return res.status(409).json({
  //     message: "The coach is not in the rating",
  //   });
  // }
  const updateUserFavorite = await User.findOneAndUpdate(
    id,
    { $pull: { favorite: { id }}},
    { new: true }
  );

  console.log('updatedFavorite', updateUserFavorite)
  if (!updateUserFavorite) {
    return res.status(404).json({ message: "Coach not found" });
  }

  res.status(200).json({
    favorite: updateUserFavorite.favorite,
    id,
    message: "Coach successfully removed from favorite",
  });
};


const deleteCoachProgram = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id } = req.params;

  const deleteCoachProgram = await Notice.findOne({ _id: id });

  if (!deleteCoachProgram) {
    throw HttpError(404, "Coach program does not exist");
  }

  await Notice.findOneAndRemove({ _id: id, owner: userId });

  res.status(200).json({ message: "Coach program successfully deleted" });
};

const getCoachProgramByCategory = async (req, res) => {
  const { categoryName: category, id } = req.params;
  const { query: title, page, limit } = req.query;
  const skip = (page - 1) * limit;
  if (!title && !category) {
    const allCoachesPrograms = await Notice.find(
      {},
      "-createdAt -updatedAt -idCloudAvatar",
      {
        skip,
        limit,
      }
    );
    res.status(200).json(allCoachesPrograms);
  } else if (category && !title && !id) {
    const coachesProgramsByCategory = await Notice.find(
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
    const coaches = await Notice.find(
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
    const coaches = await Notice.find(
      { category, title: { $regex: regex }, _id: id },
      "-createdAt -updatedAt -idCloudAvatar",
      {
        skip,
        limit,
      }
    );
    res.status(200).json(coaches);
  } else if (id) {
    const coach = await Notice.findById(
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
 
// const getCoachFavorite = async (req, res) => {
//   const { _id: userId } = req.user;
//   const coaches = await User.findById(userId)
//     .populate("favorite")
//     .select("favorite");
// console.log('getCoachFavorite', coaches)
//   res.status(200).json(coaches.favorite);
// };

const getCoachFavorite = async (req, res) => {
  const {coachId} = req.body;
  const coaches = await User.findOne({coachId})
    .populate("favorite")
    .select("favorite");
    console.log('coaches', coaches)
console.log('getCoachFavorite', coaches)
  res.status(200).json(coaches.favorite)
};

const getUserByCoaches = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const coaches = await Notice.find(
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
  const coaches = await Notice.find();
  res.status(200).json(coaches);
};

module.exports = {
  getUserByCoaches,
  getCoachProgramByCategory,
  createNotice,
  addCoachFavorite,
  getCoachFavorite,
  deleteCoachFavorite,
  deleteCoachProgram,
  getAllCoaches,
};
