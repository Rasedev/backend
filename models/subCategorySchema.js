const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = new Schema({
       name: {
        type: String,
        required: true
       },
       description: {
        type: String,
        required: true
       },
       image:{
       type: String,
       //required: true
             }, 
       isActive: {
        type: Boolean,
        default: false  
       },
       status: {
        type:String,
        default:"waiting",
        enum:["waiting", "approved", "rejected"]
       },
       category: {
        type: Schema.Types.ObjectId,
        ref: "CategoryList",
          required: true,
    },
    
       created: {
        type: String,
        timestamps: true 
       },
       updated: {
        type:Date,

       } 
})

module.exports = mongoose.model('subCategoryList', subCategorySchema);