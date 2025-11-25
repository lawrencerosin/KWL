import { Link } from "react-router";
import { useRef } from "react";
import {setBodyColor} from "../../body color";
export default function CreateAccount(){
     const firstName=useRef("");
    const lastName=useRef("");
    const email=useRef("");
    const password=useRef("");
    const confirmPassword=useRef("");
    setBodyColor("gold");
    const BUTTON_CSS={
        backgroundColor:"yellow"
    }
    const PAGE_CSS={
        
       display:"flex",
       alignItems:"center",
       flexDirection:"column"
    }
    const TITLE_CSS={
        color:"white",
        textAlign:"center"
    }
    async function addAccount(event){
        event.preventDefault();
        const matchingEmails=await fetch(`http://localhost:9000/matchingEmails/${email.current.value.toLowerCase()}`);
        const matchingParts=await matchingEmails.json();
        if(password.current.value!=confirmPassword.current.value){
            alert("Your passwords aren't the same.");
        }
        else if(matchingParts.length==0){
              const result=await fetch(`http://localhost:9000/createAccount?firstName=${firstName.current.value}&lastName=${lastName.current.value}&email=${email.current.value.toLowerCase()}&firstPassword=${password.current.value}&secondPassword=${confirmPassword.current.value}`, 
                    {
                        method:"POST"
                    }
                );
                const parts=await result.json();
                
            if(result!="Fail"){
                alert("You have successfully created your account.");
                sessionStorage.setItem("email", email.current.value);
                window.location.href="/";
            }
        }
        else{
            alert("There is already an account with the email "+email.current.value+". Please pick a different email.");
        }
    }
   
    return (
     <form style={PAGE_CSS}>
        <h3 style={TITLE_CSS}>Create Account</h3>
        <input placeholder="First Name" required ref={firstName}></input><br/>
        <input placeholder="Last Name" required ref={lastName}></input><br/>
        <input type="email" placeholder="E-mail Address" required ref={email}></input><br/>
        <input type="password" placeholder="Password" required ref={password}></input><br/>
        <input type="password" placeholder="Confirm Password" required ref={confirmPassword}></input><br/>
        <span>
            <button style={BUTTON_CSS} onClick={addAccount}>Create Account</button>
            <Link to="/signIn">Sign In If You Already Have an Account</Link>
         </span>
    </form>);
}