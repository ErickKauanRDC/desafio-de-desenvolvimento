const products = require('../models/Product')

const registerNewProduct = (name,price,img,info) =>{
    const NewProduct = {name:name,price:price,img:img,info:info}  
    return products.setProduct(NewProduct)
}
const updateProduct = (id,name,price,img,info) =>{
    const newInfos = {name:name,price:price,img:img,info:info}   
    return products.updateProduct(id,newInfos)
}
const getAllProducts = async() =>{
    const productsArray = await products.getProducts()
    return productsArray
}
const deleteProduct = async (id) => {
    await products.deleteProduct(id)
}
module.exports = { registerNewProduct,getAllProducts,updateProduct,deleteProduct}