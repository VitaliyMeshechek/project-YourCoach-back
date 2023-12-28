const { Schema, model } = require("mongoose");
const Joi = require("joi");
const nameFormat = /^([A-Za-z\-\']{1,20})|([А-Яа-я\-\']{1,20})$/;
// eslint-disable-next-line no-useless-escape
const textFormat = /^([A-Za-z\-\']{1,200})|([А-Яа-я\-\']{1,200})$/;

const { handleMongooseError } = require("../helpers");

const programSchema = new Schema(
  {
    name: {
      type: String,
      enum: [
        "Аеробні програми",
        "Силові програми",
        "Оздоровчі програми",
        "Функціональний фітнес",
      ],
      required: false,
    },
    fitnessWeigth: {
      type: String,
      enum: ["Аеробіка", "Аеробний фітнес"],
      required: false,
    },
    fitnessStrength: {
      type: String,
      enum: ["Body Up", "Body Low", "Body Pump", "Body Sculpt", "ABS"],
      required: false,
    },
    fitnessWellness: {
      type: String,
      enum: ["Yoga", "Pilates", "Stretching"],
      required: false,
    },
    aerobic: {
      type: String,
      enum: ["Step aerobics", "Fitball Aerobics", "Another"],
      required: false,
    },
    strong: {
      type: String,
      enum: ["Body up", "Body pump", "Тренування ABS"],
      required: false,
    },
    health: {
      type: String,
      enum: ["Йога", "Пілатес", "Ци-гун", "Стретчінг", "Калланетіка"],
      required: false,
    },
    functions: {
      type: String,
      enum: ["Zumba", "Dance Fitness", "Belly Dance", "Strip Dance", "Інше"],
      required: false,
    },
    step: {
      type: String,
      enum: ["Step-Intro", "Step-B", "Power-Step", "Strip Dance", "Інше"],
      required: false,
    },
    impact: {
      type: String,
      enum: ["Low-Impact Aerobics", "Low-A", "Middle-Impact", "High-Impact"],
      required: false,
    },
    special: {
      type: String,
      enum: [
        "Підбір раціонального харчування",
        "Консультація або порада дієтолога",
        "Можливість тренування старших груп",
      ],
      required: false,
    },
    food: {
      type: String,
      enum: [
        "Продукти тваринного походження",
        "Продукти рослинного походження",
      ],
      required: false,
    },
    description: {
      type: String,
      match: nameFormat,
      required: false,
    },
    duration: {
      type: String,
      enum: [
        "1-4 тижнів",
        "5-8 тижнів",
        "9-12 тижнів",
        "12-15 тижнів",
        "більше 15 тижнів",
      ],
      required: false,
    },
    training: {
      type: String,
      enum: ["Персональні тренування", "Групові тренування"],
      required: false,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
    },
    comments: {
      type: String,
      match: textFormat,
      required: false,
    },
    category: {
      type: String,
      enum: [
        "fitnes for women",
        "weigth",
        "strength fitness",
        "flexibility and wellness",
      ],
    },
    firstLogin: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

programSchema.post("save", handleMongooseError);

const programAddSchema = Joi.object({
  name: Joi.string(),
  fitnessWeigth: Joi.string(),
  fitnessStrength: Joi.string(),
  fitnessWellness: Joi.string(),
  aerobic: Joi.string(),
  strong: Joi.string(),
  health: Joi.string(),
  functions: Joi.string(),
  step: Joi.string(),
  impact: Joi.string(),
  special: Joi.string(),
  food: Joi.string(),
  description: Joi.string().min(10).max(420).pattern(nameFormat),
  duration: Joi.string(),
  training: Joi.string(),
  avatarUrl: Joi.string(),
  location: Joi.string(),
  price: Joi.number(),
  comments: Joi.string().min(10).max(120).pattern(textFormat),
  category: Joi.string().trim(true).min(8).max(120).optional(),
  firstLogin: Joi.boolean(),
});

const programSchemas = {
  programAddSchema,
};

const Program = model("program", programSchema);

module.exports = {
  Program,
  programSchemas,
};
