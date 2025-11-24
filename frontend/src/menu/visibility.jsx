 import { useContext, useState } from "react";
 import Menu from "./menu";
import { Info } from "../pages/kwl";
import Shared from "./shared";
export let holdVisibility;
export default function Visibilities(){
   const {visibility, setVisibility}=useContext(Info);
   const [shared, setShared]=useState([]);
   function changeVisibility(event){
      setVisibility(event.target.textContent);
      event.target.style.backgroundColor="white";
      for(let current=event.target.previousElementSibling; current!==null; current=current.previousElementSibling)
        current.style.backgroundColor="lightgreen";
      for(let current=event.target.nextElementSibling; current!==null; current=current.nextElementSibling)
        current.style.backgroundColor="lightgreen";
      
   }
   function showSubmenu(event){
    event.target.nextElementSibling.style.display="block";
     
   }
   const VISIBILITIES=["Private", "Shared", "Public"];
   const VISIBILITY_CSS={
     color:"white"
   }
   const choices=VISIBILITIES.map(function(choice, position){
        const SELECTED={
          backgroundColor:"white"
        };
        const NOT_SELECTED={
          backgroundColor:"lightgreen"
        };
        const SHARED_CSS={
          display:"flex",
          flexDirection:"row"
        };
         
        if(position==0)
          return <div className="visibility-menu-option menu-option" onClick={changeVisibility} style={SELECTED}>{choice}</div>;
        else if(position==1)
          return <nav style={SHARED_CSS}><div className="visibility-menu-option menu-option" onClick={changeVisibility} onMouseEnter={showSubmenu} style={NOT_SELECTED}>{choice}</div><Shared shared={shared} setShared={setShared}/></nav>
        else  
          return <div className="visibility-menu-option menu-option" onClick={changeVisibility} style={NOT_SELECTED}>{choice}</div>
   });
   return <><Menu name="Visibility" menuClass="visibility-menu-option">{choices}</Menu><h1 style={VISIBILITY_CSS}>{visibility}</h1></>;
}