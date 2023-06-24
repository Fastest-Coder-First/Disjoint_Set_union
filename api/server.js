const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Transaction = require("./routes/Transaction");
mongoose
  .connect("mongodb+srv://maitisattwik:C7qbL1kz65GwofxJ@cluster0.tapa4nd.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/Transactions", Transaction);
app.listen(8000 || 5000, () => {
    console.log("Backend server is running!");
  });