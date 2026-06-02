const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    itemCode: {
      type: String,
      required: true,
      unique: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    oldPrice: {
      type: Number,
      required: true,
    },

    newPrice: {
      type: Number,
      required: true,
    },

    effectiveDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    updatedBy: {
      type: String,
      default: "Price Analyst",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Price", priceSchema);