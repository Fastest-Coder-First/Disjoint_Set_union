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
//?category=food ||?category =salary
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.status;
    const qCategoryType = req.query.category;
   
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(5);
      } else if (qCategory) {
        products = await Product.find({
          status:qCategory
        });
      } else if(qCategoryType){
        products = await Product.find({
          category:qCategoryType
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
router.get('/sumexin/',async(req,res)=>{
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

router.get('/sumcat/',async(req,res)=>{
  const qCategory = req.query.category;
 const sum= await Product.aggregate([
    {
      $match: {
        category: qCategory
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


router.get("/aggregate",(req,res)=>{
   // Assuming the Order model is defined in a separate file

async function aggregateAmounts() {
  try {
    const aggregatedData = await Product.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            status: "$status"
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.status",
          categories: {
            $push: {
              category: "$_id.category",
              totalAmount: "$totalAmount"
            }
          }
        }
      }
    ]);

    const result = aggregatedData.reduce((acc, { _id, categories }) => {
      acc[_id] = categories;
      return acc;
    }, {});

    console.log(result);
    res.status(200).json(result)
  } catch (error) {
    console.error("Error:", error);
  }
}

aggregateAmounts();

})

module.exports = router;