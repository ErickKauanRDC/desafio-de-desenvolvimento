import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { TextField, Fab, Button } from '@material-ui/core'
import { Search, Add } from '@material-ui/icons'
import './index.css'
import api from '../../api'
import { makeStyles } from '@material-ui/styles'
import AddButton from '../AddButton'
import ProductCard from '../ProductCard'
import Header from '../Header'
const useStyles = makeStyles({
    productcard: {
        width: "5em",
        height: "5em",
        border: "solid black 1px",
        borderRadius: "50%"
    },
    search: {
        width: "100%",

    },
    addButton: {
        position: "absolute",
        bot: "0",
        left: "0"
    }
})
const Main = ({handleLogout}) => {
    const classes = useStyles()
    const [busca,setBusca] = useState('')
    const [products, setProducts] = useState([{name:""}])
    const [product,setProduct] = useState({
        'name':'',
        'price':0,
        'img':'',
        'info':''
    })
    
    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id))
        api.post('/delete-product/' + id)
    }
    const handleProducts = async () =>{
        await api.get('/products').then((response) => setProducts(response.data))
    }
    const registerProduct = async(product) => {
        let formData = new FormData()
        formData.append('name',product.name)
        formData.append('price',product.price)
        formData.append('img',"")
        formData.append('info',product.info)
        formData.append('image',product.img)
        await api({
            url: '/register-product',
            method:'POST',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
              }
        }).then((response)=>{
            product.id = response.data 
        })
        setProducts(products => [...products, product])
        handleProducts()
    }
    const updateProduct = async(product) =>{
        setProducts(products.filter(prodItem => prodItem.id !== product.id))
        await api({
            url:'/update-product/'+product.id,
            method: 'Post',
            headers: {},
            data:{
                "name":product.name,
                "price": product.price,
                "img": product.img,
                "info": product.info
            }
        }).then(()=>{
            setProducts(products => [...products, product])
        })
    }
    
    useEffect(() => {
        handleProducts()
    }, [])
    let produtosFiltrados = products.filter(prod => String(prod.name.toLowerCase()).includes(busca.toLowerCase()))
    const handleBusca = (textoBusca) =>{
        setBusca(textoBusca)
    }
    return (<>
        <Header handleLogout={handleLogout}/>
        <Container class="cont">
            <TextField inputProps={{ style: { fontSize: 20 } }} className={classes.search} InputProps={{
                startAdornment: <Search/>
            }} onChange={(e)=>{handleBusca(e.target.value)}}></TextField>

            {produtosFiltrados.map((product) => (
                <ProductCard product={product} key={product.id} onDelete={deleteProduct} updateProduct={updateProduct}/>
            ))}

        </Container>

        <AddButton registerProduct={registerProduct}/>
    </>
    )
}
export default Main
