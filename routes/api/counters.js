const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const {
  isValidId,
} = require("../../middlewares");

const {
  getCounterRating,
} = require("../../controllers/notice/notice");

router.post("/rating/:id", isValidId, ctrlWrapper(getCounterRating));


module.exports = router;