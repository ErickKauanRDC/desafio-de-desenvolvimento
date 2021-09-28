import { Box, Alert, Snackbar, Modal,InputAdornment, Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

import './index.css'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    padding: "2rem",
    backgroundColor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    fontSize: 15
};

const inputStyle = {
    margin: "1rem 1rem 1rem 0"
}

const ModalEditProduct = ({updateProduct,open, handleOpen, handleClose,product}) => {
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [info, setInfo] = useState(product.info)
    const [openErro, setOpenErro] = useState(false)
    
        
    const formValidation = () => { 
        let erros = 0
        if (name.length < 0 || name == null || name == undefined) {
            setOpenErro(true)
            erros++
        }
        if (price <= 0 || price == null || price == undefined|| price==' ') {
            setOpenErro(true)
            erros++
        }
        else {
            setOpenErro(false)
        }
        return erros
    }
    const handleCloseSnack = () => {
        setOpenErro(false)
    }
    const handleProduct = async () => {
        let erros = await formValidation()
        if(erros==0){
             const newP = {
                 "id": product.id,
                "name":name,
                "price":price,
                "img":product.img,
                "info":info,
            }
            setName('')
            setPrice(0)
            setInfo("")
            handleClose()
            console.log(newP)
            updateProduct(newP)
        }
    }
    return (<>
        <Snackbar onClose={handleCloseSnack} open={openErro}>
            <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%', fontSize: 12 }}>
                Insira os dados válidos
            </Alert>
        </Snackbar>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <Box style={style}>
                <Typography variant="h4">Cadastrar Novo produto</Typography>
                <TextField onChange={(e) => setName(e.target.value)} style={inputStyle} inputProps={{ style: { fontSize: 15 } }} inputLabelProps={{ style: 15 }} label="Product Name" variant="outlined" autoFocus="true" defaultValue={product.name} fullWidth></TextField>
                <TextField  type="number" onChange={(e) => setPrice(e.target.value)} style={inputStyle} inputProps={{style: { fontSize: 15}}} inputLabelProps={{ style: 15 }} label="Product Price" variant="outlined" defaultValue={product.price}fullWidth ></TextField>
                <TextField multiline maxRows={4} onChange={(e) => setInfo(e.target.value)} style={inputStyle}inputProps={{style: { fontSize: 15 } }} inputLabelProps={{ style: 15 }} label="Product Info" variant="outlined" fullWidth defaultValue={product.info}></TextField>
                <Button onClick={handleProduct} sx={{ fontSize: 12 }} size="large" variant="contained" fullWidth>Salvar Produto</Button>
            </Box>

        </Modal>
    </>)
}

export default ModalEditProduct