import {promises as fs} from 'fs'
import {productModel} from './models/products.model.js'


class ProductManagerMongo {
    constructor() {
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        
        try{
            return await productModel.find()  
        }catch(error) {
            console.log("No se pudo leer la base de Mongo: " + error)
            return "Error al tratar de obtener los productos"
        }
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) => {
        return await productModel.findOne({_id:id})
        
        // try{
        //     return await productModel.findById(id)
        // } catch {
        //     return undefined   
        // }
    }

    addProducts = async (product) => {
        
        //Controla que todos los valores contengan datos. 
        if(!(product.title && product.description && product.price && product.thumbail && product.code && product.stock)) 
        {return "ERROR: Todos los campos son requeridos"}

        //Controlar que el producto no este repetido
        
            let productoExiste = await productModel.findOne({code: product.code})
            
            if(productoExiste) return 'ERROR: Producto repetido' 

            console.log("productoExiste")
            console.log(productoExiste)
            
                 
            await productModel.create(product)
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

        await productModel.updateOne({_id:id}, product)

        return "Producto actualizado exitosamente" 
    }

    deleteProducts = async (id) => {
        
        let existeProducts = await this.exist(id)
        if (existeProducts) {
            await productModel.deleteOne({_id:id})
            return "Producto eliminado"
        }else{
            return 'Producto no existe'
        }
        
        // let products = await this.readProducts()
        // let existeProducts = products.some(prod => prod.id === id)
        // let existeProducts = await this.exist(id)

        // if (existeProducts) {
            // let filterProducts = products.filter(prod => prod.id != id)
            // await this.writeProducts(filterProducts)

            // await productModel.deleteOne({_id:id})
            // return "Producto eliminado"
        // } 
        // return "Producto a eliminar inexistente"
    }

}

export default ProductManagerMongo



