import File from "./file";
import Visibilities  from "./visibility";

export default function Menubar(){
    const CSS={
        display:"flex",
        flexDirection:"row"
    }
    
    return <nav style={CSS}><File/><Visibilities/></nav>;
}