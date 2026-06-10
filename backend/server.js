
console.log("🔥 SERVER FILE EXECUTED");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const priceRoutes = require("./routes/priceRoute");


// middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err.message));

  app.use((req, res, next) => 
    {
      console.log("🟢 REQUEST HIT:", req.method, req.url);
      next();
   });
// test route  deployment check
app.get("/", (req, res) => {
  res.send("RPM Backend Running 🚀");
});

// POST route for creating a new price
app.use("/api/prices", priceRoutes);

// auth routes
app.use("/api/auth", authRoutes);

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});