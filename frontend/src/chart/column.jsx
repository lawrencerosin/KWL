import { useRef, useEffect } from "react";
export let items=[];

export default function Column({title}){
    
    const ADD_CSS={
        backgroundColor:"yellow"
    }
     
    const TITLE_CSS={
      
        borderRight:"1px solid black"
    }
    const LIST_CSS={
        border:"1px solid black"
        
    }
  
    function add(event){
        event.preventDefault();
        const item=document.createElement("li");
        const box=document.createElement("input");
     
        box.style.width="100px";
        item.style.border="1px solid black";
        const remove=document.createElement("button");
        remove.textContent="Remove";
        remove.style.backgroundColor="red";
        remove.addEventListener("click", function(){
            item.parentElement.removeChild(item);
           
        });
        item.appendChild(box);
        item.appendChild(remove);
        event.target.parentElement.insertBefore(item, event.target);
    }
    return <div><h1 style={TITLE_CSS}>{title}</h1><ol style={LIST_CSS}><br/><button style={ADD_CSS} onClick={add}>Add</button></ol></div>;
}