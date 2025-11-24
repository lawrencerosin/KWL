import { Link } from "react-router"
export default function ChartPageSignInLink(){
    const CSS={
      backgroundColor:"green",
      color:"white",
      width:"150px",
      height:"50px"
    }
    function signOut(){
        sessionStorage.removeItem("username");
        window.location.href="/signIn";
    }
    if(sessionStorage.getItem("email")===null)
      return <Link to="/signIn" style={CSS}>Sign In</Link>;
    else
      return <button onClick={signOut} style={CSS}>Sign Out</button>
}