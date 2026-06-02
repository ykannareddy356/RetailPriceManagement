const express = require("express");

const router = express.Router();

const {
  createPrice,
  getAllPrices,
  getPriceById,
  updatePrice,
  deletePrice,
  searchByItemCode
} = require("../controllers/priceController");

//create a new price entry
router.post("/", createPrice);

//search for a price entry by item code must come before all gets 
// otherwise search becomes id and search by item code will never be reached
router.get("/search/:itemCode", searchByItemCode);

//read all price entries
router.get("/", getAllPrices);

//read a single price entry by id
router.get("/:id", getPriceById);

//partial update a price entry by id
router.put("/:id", updatePrice);

//delete a price entry by id
router.delete("/:id", deletePrice);



module.exports = router;