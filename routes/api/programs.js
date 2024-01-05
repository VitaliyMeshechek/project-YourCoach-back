const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/program");

const { ctrlWrapper } = require("../../helpers");

const { programUserSchema } = require("../../models/programSchema");
const { schemas } = require("../../models/userSchema");

const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../../middlewares");

router.post(
  "/programs",
  authenticate,
  validateBody(programUserSchema.addProgramUserSchema),
  upload.single("avatar"),
  ctrlWrapper(ctrl.addUserProgram)
);

router.delete(
  "/programs/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteUserProgram)
);

router.get("/", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.updateUserSchema),
  ctrlWrapper(ctrl.updateFieldUser)
);

module.exports = router;
