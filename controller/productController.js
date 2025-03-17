const userList = require("../models/userSchema");
const productSchema = require("../models/productSchema");
const variantSchema = require("../models/variantSchema");


async function secureProductUploadController(req, res, next){
    // console.log("ami secure");
    // console.log(req.headers);
   
    const userid = req.headers.authorization.split("@")[1];
    const password = req.headers.authorization.split("@")[2];
    
    if (!req.headers.authorization) {
        return res.json({ error: "Authorization Failed"});
     }
     const user = await userList.find({ _id: userid });
    //  console.log(user);
    
     if(user.length > 0 ) {
         if(password ==='(8LM^33}&kIU') {
             // console.log(user)
             if(user[0].role === "merchant") {
                 next();
             }else {
                 return res.json({ error: "You are not able to product upload"});
             }
         }else {
             return res.json({ error: "Password is not Match"});
         }
     }else {
         return res.json({ error: "User Not Found"});
     }
 
}    


function createProductController(req,res){
    const {name, description, image, store } = req.body;
    //console.log(name, description,image, store);
    
    const product = new productSchema ({
        name, 
        description,
        image,
        store,
    });
    product.save();
    // console.log('create product')
    res.json({ success: "Product create successful" });
}



async function createVariantController(req, res) {
    //console.log("Rase variant")
    const {image, storage, ram, color, size, price, quantity, product} = req.body;
    // console.log(price, quantity, product);
    //console.log("Rasel", req.file);

    const variant = new variantSchema({ 
        image: `http://localhost:3000/uploads/${req.file.filename}`,
        storage, 
        ram, 
        color, 
        size,    
        price, 
        quantity,  
        product, 
       
     })
    variant.save();
    // console.log(variant.product);
       

  await productSchema.findOneAndUpdate(
        { _id: variant.product },
        { $push: { variants: variant._id }},
        { new: true}
        );
    res.json({ success: "Variant create successful" });
 }

 async function getAllProductController(req, res) {
    const data = await productSchema.find({}).populate(["store", "variants"]);
    res.send(data); 
 }

 async function deleteProductController(req, res) {
    //console.log('delete')
    const data = await productSchema.findByIdAndDelete(req.body.id)
    res.send({success: "product delete successfully"})
 }

async function setAllVariantController (req, res) {
    // console.log('Varint')
    const data = await variantSchema.find({})
    res.send(data);
 }


async function deleteVariantController(req, res) {
    try {
        const { id } = req.params; // Get id from URL parameters
        if (!id) return res.status(400).json({ error: "ID is required" });

        const data = await variantSchema.findByIdAndDelete(id);
        if (!data) return res.status(404).json({ error: "Variant not found" });

        res.status(200).json({ success: "Variant deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}





module.exports = {createProductController,secureProductUploadController,createVariantController,getAllProductController, deleteProductController,setAllVariantController, deleteVariantController};