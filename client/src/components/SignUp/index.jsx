import { Button,Alert,Snackbar, FormControl,Container,Typography, TextField } from "@material-ui/core";
import { useRef, useState } from "react";
import { Box, fontSize } from "@material-ui/system";

const SignUp = ({handleRegister}) =>{
    const emailRef = useRef()
    const passRef = useRef()
    const [openErro,setOpenErro] = useState(false)

    return <Container width="auto" height="auto">
        <Snackbar onClose={()=>setOpenErro(false)} open={openErro}>
            <Alert onClose={()=>setOpenErro(false)} severity="error" sx={{ width: '100%', fontSize: 12 }}>
                Insira os dados válidos
            </Alert>
        </Snackbar>
    <Box sx={{margin:'25rem auto',width:500,height:280,p: 2, border: '1px solid grey', borderRadius:"0.5rem" }}>
        <FormControl sx={{padding:"1rem"}}fullWidth>
            <Typography align="center" variant="h3" gutterBottom>Sign Up</Typography>
            <TextField placeholder="Email"  sx={{marginTop:"1rem"}}inputProps={{style: { fontSize: 15} }} inputRef={emailRef} ></TextField>
            <TextField type="password" placeholder="Password" sx={{marginTop:"1rem"}}inputProps={{style: { fontSize: 15} }} inputRef={passRef} ></TextField>
            <Button onClick={()=>handleRegister(emailRef.current.value,passRef.current.value)}size="large" sx={{ fontSize: 15, marginTop:"1rem" }} variant="contained" type="Submit">Sign In</Button>
            <a style={{fontSize:16,textAlign:"center",textDecoration:"none"}}href="/login">Already have an account? Sign In</a>
        </FormControl>
    </Box>
    </Container>
}

export default SignUp