const router = require("express").Router();
const Product = require("../models/Transaction");

router.post("/",  async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.delete("/:id",  async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//recent new products of 5  ?new=true 
//?status=income ||?status =expense
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.status;
   
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(5);
      } else if (qCategory) {
        products = await Product.find({
          status:qCategory
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //?status=income ||?status =expense
router.get('/sum/',async(req,res)=>{
  const qCategory = req.query.status;
 const sum= await Product.aggregate([
    {
      $match: {
        status: qCategory
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }
      }
    }
  ])
  res.status(200).json(sum);
})

module.exports = router;