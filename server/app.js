const express = require('express')
const app = express()
const productController = require('./controllers/productController')
const cors = require('cors')
const {upLoadImage} = require('./controllers/imageController')
const multer = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
const textMulter = multer({})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
let products

app.get('/products', async (req,res)=>{
    products = await productController.getAllProducts()
    res.send(products)
})

app.post('/register-product',upload.single('image'),async (req,res)=>{
   const data = await req.body
   const auxImg = req.file
   data.img = await upLoadImage(req.file.path,req.file.originalname)
   const id = await productController.registerNewProduct(data.name,data.price,data.img,data.info,data.img,auxImg)
   res.send(id)
})
app.post('/update-product/:id',async (req,res)=>{
    const data = await req.body
    const id = await productController.updateProduct(req.params['id'],data.name,data.price,data.img,data.info)
    res.send(id)
})
app.post('/delete-product/:id', async(req,res)=>{
    productController.deleteProduct(req.params['id'])
    res.send("Produto deletado")
})

module.exports = app