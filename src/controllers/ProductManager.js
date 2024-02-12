import {promises as fs} from 'fs'
import {nanoid} from 'nanoid'

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) => {
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }

    addProducts = async (product) => {
        
        //Controla que todos los valores contengan datos. 
        if(!(product.title && product.description && product.price && product.thumbail && product.code && product.stock)) 
        {return "ERROR: Todos los campos son requeridos"}

        let productsOld = await this.readProducts()
        
        //Controlar que el producto no este repetido
        if (productsOld.find(n => n.code === product.code)) return 'ERROR: Producto repetido'
        
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agregado exitosamente"
    }

    getProducts = async (limitProduct) => {
        if (limitProduct == undefined) {
            return await this.readProducts()
        } else {
            let limiteProductos = []
            let productos = await this.readProducts()

            for (let i = 0; i < productos.length; i++ ) {

                limiteProductos.push(productos[i])
                if (i == limitProduct-1) break
            }

            return limiteProductos
        }
    }

    getProductsById = async (id) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"
        return productById
    }

    updateProducts = async (id, product) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto no encontrado"

        let newProduct = {...productById, ...product, id:id}
        
        await this.deleteProducts(id)
        let products = await this.readProducts()

        products.push(newProduct)
        
        await this.writeProducts(products)
        return "Producto actualizado exitosamente" 
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existeProducts = products.some(prod => prod.id === id)

        if (existeProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado"
        } 
        return "Producto a eliminar inexistente"
    }

}

export default ProductManager


