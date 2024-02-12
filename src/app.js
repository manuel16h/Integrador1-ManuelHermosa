//Express
import express from "express";

//Routes
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import ViewsRouter from "./router/views.routes.js";

//Handlebars
import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js";

//Mongoose
import mongoose from "mongoose";

//Web Socket
import {Server} from "socket.io"

//Manejador de productos
import ProductManager from "./controllers/ProductManager.js";
import { error } from "console";


const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor express puerto ${PORT}}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Mongoose connection
try {
    // mongoose.connect('mongodb+srv://juanpablo:Casa2010@manager.qrns1ra.mongodb.net/?retryWrites=true&w=majority')
    mongoose.connect("mongodb://localhost:27017/test");
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(); // Salir del proceso en caso de error
}


//Handlebars configuracion
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//static
app.use("/", express.static(__dirname +  "/public"))

//Routes
app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)
app.use("/", ViewsRouter)



//Web socket
const productAll = new ProductManager()

const socketServer = new Server(server)

socketServer.on('connection', async socket => {
    console.log('Nuevo cliente conectado')

    socket.on('crearProducto', async (product) => {
        await productAll.addProducts(product)
        socket.emit('upDateListProduct', await productAll.getProducts())
    })

    socket.on('borrarProducto', async(idProduct)=> {
        await productAll.deleteProducts(idProduct)
        socketServer.emit('upDateListProduct', await productAll.getProducts())
    })


    //Desconecta un cliente
    socket.on('disconnect', () => {console.log('Cliente desconectado')})
})