const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");
const { programUserSchema } = require("../../models/programSchema");
const {
  getUserByCoaches,
  getCoachProgramByCategory,
  createNotice,
  addCoachRating,
  getUserByRating,
  deleteCoachRating,
  deleteCoachProgram,
  getAllCoaches,
} = require("../../controllers/notice/notice");
router.get("/", ctrlWrapper(getAllCoaches));
router.get("/own", authenticate, ctrlWrapper(getUserByCoaches));
router.get("/rating", authenticate, ctrlWrapper(getUserByRating));
router.get("/:categoryName/:id?", ctrlWrapper(getCoachProgramByCategory));

router.post(
  "/:categoryName",
  authenticate,
  upload.single("avatar"),
  validateBody(programUserSchema.addProgramUserSchema),
  ctrlWrapper(createNotice)
);
router.post(
  "/rating/:id",
  isValidId,
  authenticate,
  ctrlWrapper(addCoachRating)
);

router.delete(
  "/rating/:id",
  isValidId,
  authenticate,
  ctrlWrapper(deleteCoachRating)
);
router.delete("/:id", isValidId, authenticate, ctrlWrapper(deleteCoachProgram));

module.exports = router;
