 import Chart from "../view/chart";
 import {useState} from "react";
 import { Link } from "react-router";
 import { reset } from "../menu/file";
export default function SharedFiles(){
    let sharedFiles;
    let sharedFileParts=[];
     const[sharedFileList, setSharedFileList]=useState([]);
   
    async function getShared(){
        sharedFiles=await fetch("http://localhost:9000/sharedCharts/"+sessionStorage.getItem("email"));
        
        sharedFileParts=await sharedFiles.json();
         const fileList=sharedFileParts.map(function(part, position){
            const name="file"+position;
            const ID_CSS={display:"none"};
            const LIST_CSS={
               listStyleType:"none",
               backgroundColor:"yellow",
               border:"1px solid black",
               textAlign:"center"
            };
            async function viewFile(){
                reset();
                 const chart=await fetch("http://localhost:9000/viewChart/"+part._id);
                 const chartParts=await chart.json();
                 
                 for(let position1=0; position1<chartParts["content"].length; position1++){
                   for(let position2=0; position2<chartParts["content"][position1].length; position2++){
                        
                        const item=document.createElement("li");
                        item.style.border="1px solid black";
                        item.textContent=chartParts["content"][position1][position2];
                        const kwlColumn=document.getElementById("kwl").children[position1].children[1];
                        kwlColumn.appendChild(item);
                   }
                 }
                
                
             }
            return <li key={name} style={LIST_CSS}><span style={ID_CSS}>{part._id}</span><span onClick={viewFile}>{part.name}</span></li>
        });
        setSharedFileList(fileList);
    }
   
    getShared();
    return <><Link to="/">Back</Link><ul>{sharedFileList}</ul><Chart/></>;
}
