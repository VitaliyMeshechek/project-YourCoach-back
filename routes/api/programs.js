const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/program");

const { ctrlWrapper } = require("../../helpers");

const { programsSchemas } = require("../../models/programSchema");
const { schemas } = require("../../models/userSchema");

const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../../middlewares");

router.post(
  "/program",
  authenticate,
  validateBody(programsSchemas.programAddSchema),
  upload.single("avatar"),
  ctrlWrapper(ctrl.addCoachProgram)
);

router.delete(
  "/program/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteCoachProgram)
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
