const { Schema, model } = require("mongoose");
const Joi = require("joi");
// eslint-disable-next-line no-useless-escape
// const textFormat = /^([A-Za-z\-\']{10,400})|([А-Яа-я\-\']{10,400})$/;
const nameFormat = /^[а-яА-ЯёЁa-zA-Z0-9]{1,20}$/;

const { handleMongooseError } = require("../helpers");

const noticeSchema = new Schema(
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
    kind: {
      type: String,
      enum: [
      'Step Aerobics',
      'Fitball Aerobics',
      'Body Up',
      'Body Pump',
      'Тренування ABS',
      'Йога',
      'Пілатес',
      'Ци-гун',
      'Стретчінг',
      'Калланетіка',
      'Zumba',
      'Dance Fitness',
      'Belly Dance',
      'Strip Dance',
      ],
      required: false,
    },
    fitnessWeigth: {
      type: String,
      enum: ["Аеробіка", "Аеробний фітнес"],
      required: false,
    },
    kindProgramWeigth: {
      type: String,
      enum: [
        'Step-Intro',
        'Step-B',
        'Power-Step',
        'Low-Impact Aerobics',
        'Low-A',
        'Middle-Impact',
        'High-Impact',
      ],
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
      enum: ["Step Aerobics", "Fitball Aerobics", "Another"],
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
      // match: textFormat,
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
    title: {
      type: String,
      minlength: 2,
    },
    avatar: {
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
      // match: textFormat,
      required: false,
    },
    category: {
      type: String,
      enum: [
        "your program",
        "fitnes for women",
        "weigth",
        "strength fitness",
        "flexibility and wellness",
      ],
    },
    nameYourProgram: {
      type: String,
      required: false,
    },
    typeYourProgram: {
      type: String,
      required: false,
    },
    firstLogin: {
      type: Boolean,
      default: false,
    },
    // favorite: [],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleMongooseError);

const addNoticeSchema = Joi.object({
  name: Joi.string().optional(),
  kind: Joi.string().optional(),
  fitnessWeigth: Joi.string().optional(),
  kindProgramWeigth: Joi.string().optional(),
  fitnessStrength: Joi.string().optional(),
  fitnessWellness: Joi.string().optional(),
  aerobic: Joi.string().optional(),
  strong: Joi.string().optional(),
  health: Joi.string().optional(),
  functions: Joi.string().optional(),
  step: Joi.string().optional(),
  impact: Joi.string().optional(),
  special: Joi.string().optional(),
  food: Joi.string().optional(),
  description: Joi.string()
  .min(10).max(400),
  // .regex(textFormat),
  duration: Joi.string().optional(),
  training: Joi.string().optional(),
  title: Joi.string().regex(nameFormat).trim().min(2),
  avatar: Joi.string(),
  location: Joi.string(),
  price: Joi.number(),
  comments: Joi.string().min(10).max(400),
  category: Joi.string().trim(true).min(8).max(120).optional(),
  nameYourProgram: Joi.string(),
  typeYourProgram: Joi.string(),
  firstLogin: Joi.boolean(),
});

const noticesSchema = {
  addNoticeSchema,
};

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  noticesSchema,
};
