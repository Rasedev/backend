const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
       name:{
        type: String,
        required: true
       },
       description:{
        type: String,
        required: true
       },
       image:{
        type: String,
        //required: true
       },     
       variants: [
        {
        type: Schema.Types.ObjectId,
        ref: "Variant", 
        }
    ], 
    store: {
        type: Schema.Types.ObjectId,
        ref: "Store" 
    },
       created:{
        type: String,
        default: Date.now
       },
       updated:{
        type:Date,

       } 
})

module.exports = mongoose.model('Product', productSchema);