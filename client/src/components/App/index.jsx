import Main from '../Main';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import SignUp from '../SignUp'
import { useEffect, useState } from 'react';
import {onAuthStateChanged,signOut,signInWithEmailAndPassword,createUserWithEmailAndPassword,getAuth} from 'firebase/auth'
import { Button } from '@material-ui/core';
import SignIn from '../SignIn'
import "../../firebase"
const App = () =>{
    const [user,setUser] = useState(null)
    const auth = getAuth()

    const handleLogin = (email,password) =>{
        signInWithEmailAndPassword(auth,email,password)
        .then(console.log("Sucess"))
        .catch((err)=>{
            return alert("User not found: " + err.message)
        })      
    }
    const handleRegister = (email,password)=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(console.log("Sucess"))
        .catch((err)=>{
            return alert("Can't create the user: "+ err.message)
        })
    }
    const handleLogout = ()=>{
        signOut(auth)
    }
    const authListerner = ()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user)
            }
            else{
                setUser(null)
            }
        })
    }
    useEffect(()=>{
        authListerner()
    },[])
    const debug = ()=>{
        console.log(user)
    }
    return (<>
        <Router>
            <Switch>
                <Route exact path="/">
                   {user? (
                       <>
                       <Main handleLogout={handleLogout}/>
                       </>
                   ):(
                        <SignIn handleLogin={handleLogin}/>
                   )}
                    
                </Route>
                <Route exact path="/login">
                {user? (
                       <>
                        <Main handleLogout={handleLogout}/>
                       </>
                   ):(
                       <SignIn handleLogin={handleLogin}/>
                   )}
                </Route>
                <Route exact path="/signup">
                {user? (
                       <>
                        <Main handleLogout={handleLogout}/>
                       </>
                   ):(
                       <SignUp handleRegister={handleRegister}/>
                   )}
                </Route>
                
            </Switch>
        </Router>
    </>)
}

export default App