import { Box, Alert, Snackbar, Modal, Button, TextField, Typography } from "@material-ui/core";
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

const ModalAddProduct = ({ open, handleOpen, handleClose, registerProduct }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [info, setInfo] = useState('')
    const [image,setImage] = useState()
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
                "name":name,
                "price":price,
                "img":image,
                "info":info,
            }
            setName('')
            setPrice(0)
            setInfo("")
            setImage()
            handleClose()
            console.log(newP)
            registerProduct(newP)
        }
    }
    const handleImage = async (e) =>{
        await setImage(e.target.files[0])
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
                <TextField onChange={(e) => setName(e.target.value)} style={inputStyle} inputProps={{ style: { fontSize: 15 } }} inputLabelProps={{ style: 15 }} label="Product Name" variant="outlined" autoFocus="true" fullWidth></TextField>
                <TextField  type="number" onChange={(e) => setPrice(e.target.value)} style={inputStyle} inputProps={{style: { fontSize: 15}}} inputLabelProps={{ style: 15 }} label="Product Price" variant="outlined" fullWidth ></TextField>
                <TextField multiline maxRows={4} onChange={(e) => setInfo(e.target.value)} style={inputStyle}inputProps={{style: { fontSize: 15 } }} inputLabelProps={{ style: 15 }} label="Product Info" variant="outlined" fullWidth></TextField>
                <input onChange={handleImage}type="file" name="image" id="image" />
                <Button onClick={handleProduct} sx={{ fontSize: 12 }} size="large" variant="contained" fullWidth>Salvar Produto</Button>
            </Box>

        </Modal>
    </>)
}

export default ModalAddProduct