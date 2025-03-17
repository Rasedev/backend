const mongoose = require('mongoose');
const { Schema } = mongoose;

const discountSchema = new Schema({
    cash: {
        type: Number
    },
    parcent: {
       type:Number ,
         
    },
    flat: {
        type: Boolean,
        default: false
    }, 
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "CategoryList"
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: "subCategoryList"
    },
     created: {
      type: Date,
      default: Date.now
  },
  updated: {  
      type: Date
  }

})

module.exports = mongoose.model('Discount', discountSchema);   