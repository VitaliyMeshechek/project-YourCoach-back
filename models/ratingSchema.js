const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const ratingSchema = new Schema(
  {
    rating: [],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

ratingSchema.post("save", handleMongooseError);


const Rating = model("rating", ratingSchema);

module.exports = {
  Rating,
};
