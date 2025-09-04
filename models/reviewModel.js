const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please provide your Review! "],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Review must belong to a Tour !"],
      ref: "Tour",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Review must belong to a User"],
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });
  next();
});
module.exports = mongoose.model("Review", reviewSchema);
