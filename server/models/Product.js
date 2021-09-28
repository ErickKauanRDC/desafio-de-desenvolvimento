const db = require('../firebase/firebase-connect')

const setProduct = async (obj) => {

    const newProduct = await db.firestore().collection('products').add({
        name: obj.name,
        price: obj.price,
        img: obj.img,
        info: obj.info,
    })
    console.log("New product with id: " + newProduct.id)
    updateProduct(newProduct.id, obj)
    return newProduct.id
}
const updateProduct = async (id, obj) => {
    const updatedProduct = await db.firestore().collection('products').doc(id).set({
        "id": id,
        "name": obj.name,
        "price": obj.price,
        "img": obj.img,
        "info": obj.info
    })
    console.log("Update the product with id: " + id)
    return updatedProduct.id
}
const deleteProduct = async (id) => {
    await db.firestore().collection('products').doc(id).delete()
    console.log("Deleted item with id : " + id)
}
const getProducts = async () => {
    let productsArray = []
    const products = await db.firestore().collection('products').get()
    products.forEach((product) => {
        const objProduct = {
            id: product.data().id,
            name: product.data().name,
            price: product.data().price,
            img: product.data().img,
            info: product.data().info
        }
        productsArray.push(objProduct)
    })
    return productsArray
}

module.exports = { setProduct, getProducts, updateProduct, deleteProduct }
