import {useContext} from "react"
import { holdVisibility } from "./visibility";
import MenuOption from "./menu option";
import "./menu.css"; 
import "../file.css";
import Menu from "./menu"; 
import { Info } from "../pages/kwl";
import { HoldShared } from "./menubar";
let kwl;
export function reset(){
    kwl=document.getElementById("kwl");
    for(let position=0; position<kwl.children.length; position++){
         const list=kwl.children[position].children[1];
         while(list.children.length>1)
            list.removeChild(list.children[0]);
    }
  }


function add(column, content){
    
        const item=document.createElement("li");
        const box=document.createElement("input");
        box.style.width="100px";
        
        box.value=content;
        item.style.border="1px solid black";
        const remove=document.createElement("button");
        remove.textContent="Remove";
        remove.style.backgroundColor="red";
        remove.style.marginLeft="100px";
        remove.addEventListener("click", function(){
            item.parentElement.removeChild(item);
        
        });
        item.appendChild(box);
        item.appendChild(remove);
        const buttons=column.getElementsByTagName("button");
        
        const addButton=buttons[buttons.length-1];//Is the last button
        column.insertBefore( item, addButton);
    }
    function getSharees(shared){
      if(shared.length==0)
        return "";
      else{
        let sharees=shared[0];
        for(let position=1; position<shared.length; position++){
            sharees+=","+shared[position];
        }
        return sharees;
      }
    }
    function getChartContent(){ 
        let chart="";
        for(let position1=0; position1<kwl.children.length; position1++){
        
        const list=kwl.children[position1].children[1].children;
        
        
        for(let position2=0; position2<list.length; position2++){ 
                if(list[position2].tagName=="LI")
                chart+=list[position2].children[0].value+";";
            
        }
        chart+="\n";
    }
    return chart;
    }
    function read(parts, name){
        //To be put back
        // const oldFile=getChartContent();
            
        const addItem=new Promise(function(success, fail){
            for(let position1=0; position1<parts.length; position1++){
                for(let position2=0; position2<parts[position1].length; position2++){
                   
                   add(kwl.children[position1].children[1], parts[position1][position2]);
                }
            }
            success();
            fail();
            });
            addItem.then(function(){
                sessionStorage.setItem("name", name);
               
            },
        function(){
            alert("Unable to open file.");
        });
        
        
    }
    function goToSignInPage(callback){
        if(sessionStorage.getItem("email")===null)
            window.location.href="/signIn";
        else
            callback();
    }
export default function File(){

    const {visibility, setVisibility}=useContext(Info);
    const {shared, setShared}=useContext(HoldShared);
    function newFile(){
        kwl=document.getElementById("kwl");
        sessionStorage.removeItem("name");
        setShared([]);
        setVisibility("Private");
        reset();
    }
    function open(){
        goToSignInPage(
         async function(){
            kwl=document.getElementById("kwl");
            const name=prompt("What file do you want to open?");
            const file=await fetch(`http://localhost:9000/open?name=${name}&email=${sessionStorage.getItem("email")}`);
            const fileContent=await file.json();
            
            if(fileContent===null)
                alert("You do not have a file named "+name+".");
            else{
                reset();
                setShared(fileContent["shared"]);
                setVisibility(fileContent["visibility"]);
                read(fileContent["content"], name);
            }
       });
    }
    function viewFiles(){
        goToSignInPage(async function(){
            const files=await fetch("http://localhost:9000/viewFiles/"+sessionStorage.getItem("email"));
            const fileList=await files.json();
            const fileHolder=document.getElementById("files");
            fileHolder.innerHTML="";
            document.getElementById("fileBox").style.display="block";
            for(let position=0; position<fileList.length; position++){
                const item=document.createElement("li");
                item.className="file-name";
                item.textContent=fileList[position]["name"];
                fileHolder.appendChild(item);
            }
        });
    }
    function viewSharedFiles(){
        window.location.href="/sharedFiles";
    }
    function save(){
        goToSignInPage(async function(){
            
            kwl=document.getElementById("kwl");
                if(sessionStorage.getItem("name")===null)
                    saveAs();
                else{
                     
                    await fetch(`http://localhost:9000/save?email=${sessionStorage.getItem("email")}&name=${sessionStorage.getItem("name")}&content=${getChartContent()}&visibility=${visibility}&shared=${getSharees(shared)}`,
                    {  method:"PUT"}
                    );

                    alert("Successfully saved "+sessionStorage.getItem("name")+".");
                }
        
        });
        
    }
    function saveAs(){ 
        kwl=document.getElementById("kwl");
        goToSignInPage(async function(){
            
                const name=prompt("What would you like to name the chart?");
                const matchingFiles=await fetch(`http://localhost:9000/open?name=${name}&email=${sessionStorage.getItem("email")}`);
                const matchingParts=await matchingFiles.json();
            
                if(matchingParts===null){
                    if(name.length>0){
                        await fetch(`http://localhost:9000/saveAs?owner=${sessionStorage.getItem("email")}&name=${name}&content=${getChartContent()}&visibility=${visibility}&shared=${getSharees(shared)}`,
                        {  method:"POST"}
                        );
                    }
                    else
                        alert("You must put in a file name.");
            }
            else{
                alert("You already have a file named "+name+". To overwrite it please open the file, and click \"Save\" in the File menu.");
            }
        }
        );
    }
    async function removeFile(){
        const name=prompt("What file do you want to delete?");
        
        try{
            const file=await fetch(`http://localhost:9000/open?name=${name}&email=${sessionStorage.getItem("email")}`);
            const parts=await file.json();
            if(parts!==null){
            await fetch(`http://localhost:9000/delete?email=${sessionStorage.getItem("email")}&name=${name}`, {
                method:"DELETE"
            }); 
            alert("Successfully deleted "+name+".");
            }
            else{
                alert("You don't have a file named "+name+".");
            }
        }
        catch(ex){
            alert("Unable to delete "+name+".");
        }
    }
        const OPTIONS=[new MenuOption("New", newFile), new MenuOption("Open", open), new MenuOption("View Files", viewFiles), new MenuOption("View Shared Files", viewSharedFiles), new MenuOption("Save", save), new MenuOption("Save As", saveAs), new MenuOption("Delete", removeFile)];
        const choices=OPTIONS.map(function(choice){
            return <div onClick={choice.action} className="menu-option file-menu-option" key={choice.name}>{choice.name}</div>;
        });
        return <Menu name="File"  menuClass="file-menu-option">{choices}</Menu>
    }
