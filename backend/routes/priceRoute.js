const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


const router = express.Router();

const {
  createPrice,
  getAllPrices,
  getPriceById,
  updatePrice,
  deletePrice,
  searchByItemCode
} = require("../controllers/priceController");

console.log("🟡 PRICE ROUTE FILE LOADED");

//create a new price entry
router.post("/", protect, authorizeRoles("admin"),createPrice);

//search for a price entry by item code must come before all gets 
// otherwise search becomes id and search by item code will never be reached
router.get("/search/:itemCode",protect,  authorizeRoles("admin", "user"),searchByItemCode);

//read a single price entry by id
router.get("/:id", protect,  authorizeRoles("admin", "user"),getPriceById);

//read all price entries
router.get("/", protect, authorizeRoles("admin", "user"), getAllPrices);



//partial update a price entry by id
router.put("/:id", protect, authorizeRoles("admin"), updatePrice);

//delete a price entry by id
router.delete("/:id", protect, authorizeRoles("admin"), deletePrice);



module.exports = router;