const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    brandName: { type: String },
    carModel: { type: String },
    releaseDate: { type: Date },
    buyingPrice: { type: Number },
    sellPrice: { type: Number },
    sets: { type: Number },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Car", schema);
