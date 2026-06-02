const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const priceRoutes = require("./routes/priceRoute");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err.message));



// test route
app.get("/", (req, res) => {
  res.send("RPM Backend Running 🚀");
});

// POST route for creating a new price
app.use("/api/prices", priceRoutes);

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});