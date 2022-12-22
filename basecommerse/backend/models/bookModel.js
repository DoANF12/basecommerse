import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {type:String,required:true,unique:true},
        subtitle: {type:String,required:true},
        isbn13: {type:String,required:true,unique:true},
        price: {type:Number,required:true},
        image: {type:String,required:true},
        descripcion: {type:String,require:true},
        url: {type:String,required:false},
        rating: {type:String,required:true}, 
        numReviews: {type:String,required:true},
        counInstock: {type:Number,required:true},
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;