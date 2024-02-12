import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ViewsRouter = Router()
const product = new ProductManager


ViewsRouter.get("/", async (req,res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "Product Manager",
        products: allProducts
    })
})

ViewsRouter.get("/realTimeProducts", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("realTimeProducts", {allProducts})
})

export default ViewsRouter