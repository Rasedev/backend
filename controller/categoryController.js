
const categoryList = require("../models/categorySchema");
const subCategoryList = require("../models/subCategorySchema");

//create category controller

async function createCategoryController(req,res){

   const{name, description, image,} = req.body;
   //console.log(name, description, image );
   
   const duplicateCategory =await categoryList.find({name});
   console.log(duplicateCategory)
   if(duplicateCategory.length > 0){
    return res.json({error: "This category already Exits"})
   }

   const category = new categoryList({ 
    name,
    description,
    image,

   })
   category.save();
   res.json({success: "category create succesfully done"})

}

//create categoryStatusController 

async function createCategoryStatusController(req, res){
  console.log('ami status')
  const {name,status} = req.body;
    console.log(name, status);
    if(status == 'waiting' || status == "rejected"){

      const updatedCategoryStatus = await categoryList.findOneAndUpdate(
          {name},
          {$set:{isActive:false, status:status}},
          {new:true} 
      )
      res.json({success: "Category status Updated"})
}else if(status == 'approved'){
  const updatedCategoryStatus = await categoryList.findOneAndUpdate(
      {name},
      {$set:{isActive:true, status:status}},
      {new:true} 
  )
  res.json({success: "Category status Updated"})
}
}

// //create sub-category controller

async function createSubCategoryController(req,res){
  
  console.log("Rase subCategory")
     const{ name, description, category,image } = req.body;
     //console.log(name, description, category, image);
     console.log("Rasel", req.file);
 
  //  const duplicateSubCategory =await subCategoryList.findOne({name});
  //  console.log(duplicateSubCategory);
  //  if(duplicateSubCategory.length > 0){
  //   return res.json({error: "This category already Exits"})
  //  }

   const subcategory = new subCategoryList({ 
    image: `http://localhost:3000/uploads/${req.file.filename}`,
    name,
    description,
    category
   })
   subcategory.save();
   console.log(subcategory.category)


   await categoryList.findOneAndUpdate(
     {_id: subcategory.category},
     {$push: {subcategory: subcategory._id}},
     {new: true}
   )
    res.json({success: "subcategory create succesfully done"}) 
}


//CREATE SUBCATEGORY STATUS CONTROLLER

async function createSubCategoryStatusController(req,res){
  //console.log('ami status');
  const {name,status} = req.body;
 // console.log(name, status);

  if(status == 'waiting' || status == "rejected"){

      const updatedSubCategoryStatus = await subCategoryList.findOneAndUpdate(
          {name},
          {$set:{isActive:false, status:status}},
          {new:true} 
      )
      res.json({success: "subCategory status Updated"})
  }else if(status == 'approved'){
      const updatedSubCategoryStatus = await subCategoryList.findOneAndUpdate(
          {name},
          {$set:{isActive:true, status:status}},
          {new:true} 
      )
      res.json({success: "subCategory status Updated"})
  }
  
}


async function getAllCategoryController(req,res){
  //console.log('ALL');
  const category = await categoryList.find({}).populate("subcategory");
  res.send(category);
} 
async function getAllSubCategoryController(req,res){
 // console.log('All SubCategory');
  const category = await subCategoryList.find({});
  res.send(category);
} 

async function getAllSubCategoryController(req, res) {
  //console.log('All SubCategory');
  const subCategories = await subCategoryList.find({}).populate("category");
  res.send(subCategories);
}


 async function deleteCategoryController(req, res) {
    //console.log('delete')
    const data = await categoryList.findByIdAndDelete(req.body.id)
    res.send({success: "category delete successfully"})
 }

 async function createCategoryUpdateController(req, res) {
  const { id, name, description } = req.body;

  // Validate input
  if (!id || !name || !description) {
    return res.status(400).json({ error: "ID, name, and description are required" });
  }

  try {
    // Check if the category exists
    const existingCategory = await categoryList.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check for duplicate category name (excluding the current category)
    const duplicateCategory = await categoryList.findOne({ name, _id: { $ne: id } });
    if (duplicateCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    // Update the category
    const updatedCategory = await categoryList.findByIdAndUpdate(
      id,
      { name, description },
      { new: true } // Return the updated document
    );

    // Send success response
    res.json({ success: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
}

async function deleteSubCategoryController(req, res) {
    try {
        const { id } = req.params; // Get id from URL parameters
        if (!id) return res.status(400).json({ error: "ID is required" });

        const data = await subCategoryList.findByIdAndDelete(id);
        if (!data) return res.status(404).json({ error: "subCategory not found" });

        res.status(200).json({ success: "subCategory deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }s
}




module.exports = {createCategoryController,createSubCategoryController,createCategoryStatusController, createSubCategoryStatusController,getAllCategoryController,
  getAllSubCategoryController,deleteCategoryController,createCategoryUpdateController,deleteSubCategoryController
} ;












