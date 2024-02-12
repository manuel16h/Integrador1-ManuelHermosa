import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";
import ProductManagerMongo from "../dao/ProductManager.js"


const ProductRouter = Router()
const product = new ProductManager()
const productMg = new ProductManagerMongo()


//Controlar que el servidor esta funcionando correctamente
ProductRouter.get("/ping", (req, res) => {
    res.send("pong")
})

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await productMg.getProductsById(id))
    // res.send(await product.getProductsById(id))
})

ProductRouter.get("/", async (req, res) => {
    let limitProduct = req.query.limit
    res.send(await productMg.getProducts(limitProduct))
    // res.send(await product.getProducts(limitProduct))
})

ProductRouter.post("/", async(req, res) => {
    let newProduct = req.body
    res.send(await productMg.addProducts(newProduct))
    // res.send(await product.addProducts(newProduct))
})

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProduct = req.body
    res.send(await productMg.updateProducts(id, updateProduct))
})

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await productMg.deleteProducts(id))
})

export default ProductRouter