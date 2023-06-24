const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
  
    name:{type:String,required:true},
    amount: { type: Number, required: true },
    category:{type:String,required:true},

    //status : "income" || "expense"
    status: { type: String,required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);