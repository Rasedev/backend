const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
       name:{
        type: String,
        require: true
       },
       description:{
        type: String,
        required: true
       },
       image:{
         type: String,
         //required: true
        }, 
       isActive:{
        type: Boolean,
        default: false  
       },
       status:{
        type:String,
        default:"waiting",
        enum:["waiting", "approved", "rejected"]
       },
       subcategory: [{
        type: Schema.Types.ObjectId,
        ref: "subCategoryList"
    }],
       created:{
        type: String,
        default: Date.now
       },
       updated:{
        type:Date,

       } 
})

module.exports = mongoose.model('CategoryList', categorySchema);       