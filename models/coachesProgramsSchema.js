const { Schema, model } = require("mongoose");
const Joi = require("joi");
const nameFormat = /^[а-яА-ЯёЁa-zA-Z0-9]{1,20}$/;
// eslint-disable-next-line no-useless-escape
const textFormat = /^([A-Za-z\-\']{1,400})|([А-Яа-я\-\']{1,400})$/;

const coachProgramSchema = new Schema(
  {
    name: {
      type: String,
      enum: [
        "Аеробні програми",
        "Силові програми",
        "Оздоровчі програми",
        "Функціональний фітнес",
      ],
    },
    fitnessWeigth: {
      type: String,
      enum: ["Аеробіка", "Аеробний фітнес"],
    },
    fitnessStrength: {
      type: String,
      enum: ["Body Up", "Body Low", "Body Pump", "Body Sculpt", "ABS"],
    },
    fitnessWellness: {
      type: String,
      enum: ["Yoga", "Pilates", "Stretching"],
    },
    aerobic: {
      type: String,
      enum: ["Step aerobics", "Fitball Aerobics", "Another"],
    },
    strong: {
      type: String,
      enum: ["Body up", "Body pump", "Тренування ABS"],
    },
    health: {
      type: String,
      enum: ["Йога", "Пілатес", "Ци-гун", "Стретчінг", "Калланетіка"],
    },
    functions: {
      type: String,
      enum: ["Zumba", "Dance Fitness", "Belly Dance", "Strip Dance", "Інше"],
    },
    step: {
      type: String,
      enum: ["Step-Intro", "Step-B", "Power-Step", "Strip Dance", "Інше"],
    },
    impact: {
      type: String,
      enum: ["Low-Impact Aerobics", "Low-A", "Middle-Impact", "High-Impact"],
    },
    special: {
      type: String,
      enum: [
        "Підбір раціонального харчування",
        "Консультація або порада дієтолога",
        "Можливість тренування старших груп",
      ],
    },
    food: {
      type: String,
      enum: [
        "Продукти тваринного походження",
        "Продукти рослинного походження",
      ],
    },
    description: {
      type: String,
      match: textFormat,
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
    },
    training: {
      type: String,
      enum: ["Персональні тренування", "Групові тренування"],
    },
    title: {
      type: String,
      minlength: 2,
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
    location: {
      type: String,
      required: [true, "City/region is required"],
    },
    comments: {
      type: String,
      match: textFormat,
    },
    price: {
      type: Number,
    },
    avatarUrl: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },

  {
    versionKey: false,
  }
);

const coachesProgramsSchema = Joi.object({
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
  description: Joi.string(),
  duration: Joi.string(),
  training: Joi.string(),
  title: Joi.string().regex(nameFormat).trim().min(2).required(),
  category: Joi.string(),
  location: Joi.string().regex(nameFormat).required(),
  comments: Joi.string().min(2).max(200).required(),
  price: Joi.string().regex(/^(?!0\d)\d+(?:\.\d{1,2})?$/),
  avatarUrl: Joi.string(),
});

const Coach = model("coach", coachProgramSchema);

module.exports = {
  Coach,
  coachesProgramsSchema,
};
