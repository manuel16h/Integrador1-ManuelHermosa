const socket = io()

//Listar productos
const productsList = document.getElementById("productsList")

// Crear el producto
const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const priceInput = document.getElementById("price")
const thumbailInput = document.getElementById("thumbail")
const codeInput = document.getElementById("code")
const stockInput = document.getElementById("stock")

const crearButton = document.getElementById("buttonCrearProducto")

const infoCrearProd = document.getElementById("info-crearProducto")

//Eliminar Producto
const idInput = document.getElementById("idProduct")

const eliminarButton = document.getElementById("buttonDeleteProduct")

const infoBorrarProd = document.getElementById("info-eliminarProducto")

//EVENTOS
crearButton.addEventListener('click', (e) => {
    e.preventDefault()
    
    console.log('Se hizo clic en el boton')

    let newProduct = {
        "title": titleInput.value,
        "description": descriptionInput.value,
        "price": +priceInput.value,
        "thumbail": thumbailInput.value,
        "code": codeInput.value,
        "stock": +stockInput.value
    }
    
    socket.emit('crearProducto', newProduct)
    
    //Info al usuario
    infoBorrarProd.innerText = ''
    infoCrearProd.innerText = 'Producto agregado existosamente'

    //Limpia los input
    titleInput.value = ''
    descriptionInput.value = ''
    priceInput.value = ''
    thumbailInput.value = ''
    codeInput.value = ''
    stockInput.value = ''
})

//ELIMINAR PRODUCTO
eliminarButton.addEventListener('click', (e) => {
    e.preventDefault()
    let idProduct = idInput.value
    socket.emit('borrarProducto', idProduct)
    
    //Info al usuario
    infoCrearProd.innerText = ''
    infoBorrarProd.innerText = 'Producto ELIMINADO existosamente'
    
    //Limpieza de input
    idInput.value = ''
})

socket.on('upDateListProduct', (listProduct) => {
    let element = ''
    productsList.innerHTML = ''
    for(let clave in listProduct) {
        element = document.createElement('li') 
        element.textContent = `${listProduct[clave].title} - USD ${listProduct[clave].price} - Id: ${listProduct[clave].id}`
        productsList.appendChild(element)
    }    
})
