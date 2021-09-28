import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import ModalProduct from '../ModalAddProduct'
import { useState } from 'react'
const AddButton = ({registerProduct}) => {
    
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    

    return (<>
            
            <Fab onClick={handleOpen}  sx={{ position: "fixed", right: 5, bottom: 5 }} color="primary" aria-label="add">
                <Add />
            </Fab>
            <ModalProduct registerProduct={registerProduct} open={open} handleClose={handleClose} handleOpen={handleOpen}/>
        </>)
}
export default AddButton