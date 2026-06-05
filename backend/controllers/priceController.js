const Price = require("../models/Price");

const createPrice = async (req, res) => {
  try {
    const price = await Price.create(req.body);

    res.status(201).json({
      success: true,
      data: price,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find();

    res.status(200).json({
      success: true,
      count: prices.length,
      data: prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPriceById = async (req, res) => {
  try {
    const price = await Price.findById(req.params.id);

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Price not found",
      });
    }

    res.status(200).json({
      success: true,
      data: price,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePrice = async (req, res) => {
  try {
    const price = await Price.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Price not found",
      });
    }

    res.status(200).json({
      success: true,
      data: price,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePrice = async (req, res) => {
  try {
    const price = await Price.findByIdAndDelete(req.params.id);

    if (!price) {
      return res.status(404).json({
        success: false,
        message: "Price not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Price deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search item by item code
const searchByItemCode = async (req, res) => {
  try {
    const item = await Price.findOne({
      itemCode: req.params.itemCode
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createPrice,
  getAllPrices,
  getPriceById,
  updatePrice,
  deletePrice,
  searchByItemCode,
};