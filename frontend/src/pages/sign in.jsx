import { Link } from "react-router"
import { useRef } from "react";
import {setBodyColor} from "../../body color";
export default function SignIn(){
     
    const email=useRef("");
    const password=useRef("");
    async function signIn(event){
        event.preventDefault();
         
        const signInStatus=await fetch(`http://localhost:9000/signIn?email=${email.current.value.toLowerCase()}&password=${password.current.value}`,{
            method:"GET"
        });
       const parts=await signInStatus.json();
         
        if(parts!==null){
            sessionStorage.setItem("email", email.current.value);
            window.location.href="/";
        }
        else{
            alert("You've put in the wrong log in info.");
        }
        
       
    }
    const BUTTON_CSS={
        backgroundColor:"yellow"
    }
    setBodyColor("lightgreen");
    return (
      <form>
        <h3>Sign In</h3>
        <input placeholder="E-mail Address" ref={email}/><br/>
        <input type="password" placeholder="Password" ref={password}/><br/>
        <button style={BUTTON_CSS} onClick={signIn}>Sign In</button>
        <Link to="/createAccount">Create an Account If You Don't Have One Yet</Link>
    </form>);
}