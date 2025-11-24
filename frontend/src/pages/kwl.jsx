import Chart from "../chart/chart";
import ChartPageSignInLink from "../links/chart page sign in link";
import Menubar from "../menu/menubar";
import OpenedFile from "../opened file";
import FileList from "../file list";
import {setBodyColor} from "../../body color";
import { useState, createContext} from "react";
import CurrentVisibility from "../current visibility";
export const Info=createContext("Private")
export default function KWL(){
    setBodyColor("orange");
    const [visibility, setVisibility]=useState("Private");
    const holdInfo={visibility, setVisibility};
    return <Info.Provider value={holdInfo}><div style={CSS}><Menubar/><CurrentVisibility visibility={visibility}/><OpenedFile/><ChartPageSignInLink/><Chart/><FileList/></div></Info.Provider>;
}