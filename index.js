const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;
const cryptoRouter = require("./routes/cryptoRoutes");

require("dotenv").config();
// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to the KoinX Backend Assignment!");
});
app.use("/crypto", cryptoRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
