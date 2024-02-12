import mongoose from "mongoose";

const cartsCollection = 'products'

const cartShema = new mongoose.Schema({
    products: []
})

export const cartModel = mongoose.model(cartsCollection, cartShema)