import { AppBar, Toolbar, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"

import React from "react";
const useStyles = makeStyles({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
    app:{
        display:"block",
        position:"static"
    }
});

const Header = ({handleLogout}) => {
    const classes = useStyles()
    return <><AppBar sx={{position:"static"}}className={classes.app}>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h4">
                CRUD Produtos
            </Typography>
            
            <div>
                <Button onClick={handleLogout} sx={{fontSize:15}}variant="filled">Log Out</Button>
            </div>
        </Toolbar>
    </AppBar>
    </>
}

export default Header