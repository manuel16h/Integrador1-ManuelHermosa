import mongoose from "mongoose";

const productsCollection = 'products'

const productShema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbail: String,
    code: String,
    stock: Number
})

export const productModel = mongoose.model(productsCollection, productShema)