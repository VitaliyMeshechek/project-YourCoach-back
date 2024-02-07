const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const {
  isValidId,
} = require("../../middlewares");

const {
  getCoachRating,
  addCoachRating,
} = require("../../controllers/notice/notice");

router.get("/", ctrlWrapper(getCoachRating));

router.post("/rating/:id", isValidId, ctrlWrapper(addCoachRating));

module.exports = router;