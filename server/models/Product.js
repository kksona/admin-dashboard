import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    descriptioin: String,
    category: String,
    rating: Number,
    supply: Number,
},
{timestamps: true}
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;