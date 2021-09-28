import {Tooltip,Card,Typography,Button} from '@material-ui/core'
import {Delete,Edit} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import ModalEditProduct from '../ModalEditProduct'
import { useState } from "react";
import { fontSize } from '@material-ui/system';
const useStyles = makeStyles({
    productcard: {
        width: "5em",
        height: "5em",
        border: "solid black 1px",
        borderRadius: "50%"
    },
    card: {
        textAlign: "center",
        margin: "0.4rem 0.4rem 0.4rem 0.4rem"
    },
    productcardImg: {
        width: "10em",
        height: "10em",
        border: "solid black 1px",
        borderRadius: "50%"
    },
    tolltip: {
        fontSize: '1em',
    }
})
const ProductCard = ({ product, onDelete,updateProduct }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const formatPrice = ()=>{
        let numPrice = Number(product.price)
        let formatedPrice = numPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        return formatedPrice
    }
    const handleOpen = () => {
        setOpen(true)
        formatPrice()
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (<Tooltip  title={<h1>{product.info}</h1>}>
        <Card className={classes.card} sx={{ maxWidth: 250 }}>
            <ModalEditProduct open={open} handleClose={handleClose} handleOpen={handleOpen} updateProduct={updateProduct} product={product}/>
            <Typography variant="h4">{product.name}</Typography>
            <img className={classes.productcardImg} src={product.img} alt="" />
            <Typography variant="h5">{formatPrice()}</Typography>
            <div >
                <Button onClick={() => onDelete(product.id)}><Delete ></Delete></Button>
                <Button onClick={()=> handleOpen()}><Edit></Edit></Button>
                
            </div>
        </Card>
    </Tooltip>
    )
}
export default ProductCard