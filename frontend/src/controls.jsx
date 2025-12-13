import Custom from "./custom/custom"; 
import IO from "./io/io";
export default function Controls({setter}){
    return <div><IO setter={setter}/><Custom setter={setter}/></div>
}