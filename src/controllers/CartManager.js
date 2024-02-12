import {promises as fs} from 'fs'
import {nanoid} from 'nanoid'
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager()

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    addCart = async () => {
        let allCarts = await this.readCarts()
        let cartsConcat = [{id: nanoid(), products: []}, ...allCarts]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }

    addProductToCart = async (cid, pid) => {
        let cartById = await this.exist(cid)
        if (!cartById) return "El carrito no existe"

        let productById = await productAll.exist(pid)
        if (!productById) return "El producto no existe"

        let productExist = cartById.products.find(data => data.product == productById.id)

        if(productExist) {
            productExist.quantity++
            let cartFilter = cartById.products.filter(data => data.product != productById.id)

            cartFilter.push(productExist)
            cartById.products = cartFilter
        } else {
            cartById.products.push({product: productById.id, quantity: 1})
        }

        await this.deleteCart(cid)

        let allCarts = await this.readCarts()

        allCarts.push(cartById)

        console.log("allCarts: ")
        console.log(allCarts)

        await this.writeCarts(allCarts)

        return "Producto agregado al carrito"

    }

    getCarts = async () => {
        return await this.readCarts()
    }

    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if (!cartById) return "El carrito no existe"
        return cartById.products
    }

    deleteCart = async (id) => {
        let cartById = await this.exist(id)
        if (!cartById) return "El carrito no existe"

        let oldCarts = await this.readCarts()
        let newCarts = oldCarts.filter(res => res.id != id)

        await this.writeCarts(newCarts)

        return "Carrito eliminado"
    }
}

export default CartManager