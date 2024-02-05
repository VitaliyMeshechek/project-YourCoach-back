const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");
const { noticesSchema } = require("../../models/noticeSchema");
const {
  getUserByCoaches,
  getCoachProgramByCategory,
  createNotice,
  addCoachFavorite,
  getCoachFavorite,
  deleteCoachFavorite,
  deleteCoachProgram,
  getAllCoaches,
  addCoachLike,
  addCoachDislike,
  getCounterRating,
} = require("../../controllers/notice/notice");
router.get("/", ctrlWrapper(getAllCoaches));
router.get("/own", authenticate, ctrlWrapper(getUserByCoaches));
router.get(
  "/favorite", 
  // authenticate, 
  ctrlWrapper(getCoachFavorite));
router.get("/:categoryName/:id?", ctrlWrapper(getCoachProgramByCategory));
router.post("/rating/:id", isValidId, ctrlWrapper(getCounterRating));

router.post(
  "/:categoryName",
  authenticate,
  upload.single("avatar"),
  validateBody(noticesSchema.addNoticeSchema),
  ctrlWrapper(createNotice)
);
router.post(
  "/favorite/:id",
  isValidId,
  // authenticate,
  ctrlWrapper(addCoachFavorite)
);

router.post(
  "/rating/like",
  ctrlWrapper(addCoachLike)
);

router.post(
  "/rating/dislike",
  ctrlWrapper(addCoachDislike)
);

router.delete(
  "/favorite/:id",
  isValidId,
  // authenticate,
  ctrlWrapper(deleteCoachFavorite)
);
router.delete("/:id", isValidId, authenticate, ctrlWrapper(deleteCoachProgram));

module.exports = router;
