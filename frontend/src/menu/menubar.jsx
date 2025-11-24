import File from "./file";
import Visibilities  from "./visibility";
import Shared from "./shared";
import { useState, createContext } from "react";
export const HoldShared=createContext([]);
export default function Menubar(){
    const CSS={
        display:"flex",
        flexDirection:"row"
    }
      const [shared, setShared]=useState([]);
    const holdInfo={shared, setShared};
    return <HoldShared.Provider value={holdInfo}><nav style={CSS} ><File/><Visibilities/><Shared shared={shared} setShared={setShared}/></nav></HoldShared.Provider>;
}