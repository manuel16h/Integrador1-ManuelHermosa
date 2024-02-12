import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router()
const carts = new CartManager

CartRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await carts.getCartsById(id))
})

CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCart())
})

CartRouter.post("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    res.send(await carts.addProductToCart(cid, pid))
})

//PUT
// CartRouter.put("/:id", async (req, res) => {
//     let id = req.params.id
//     let cart = req.body
//     res.send(await carts.updateCart(id, cart))
// })

//DELETE
// CartRouter.delete("/:id", async (req, res) => {
//     let id = req.params.id
//     res.send(await carts.deleteCart(id))
// })

export default CartRouter