import { useRef, useContext } from "react";  
export default function Write({ setter}){
    const text=useRef("");
     function setControl(event){
       
     setter(event.target);
       
     }
   
    return <write onClick={setControl}>write <input type="text" placeholder="Text to Display" ref={text}/></write>
}