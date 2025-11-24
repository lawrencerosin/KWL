 
export default function FileList(){
    function close(event){
         
        
        event.target.parentElement.style.display="none";
        event.target.nextElementSibling.innerHTML="";
    }
    const CLOSE_CSS={
        backgroundColor:"red",
        color:"yellow",
        position:"absolute", 
        left:"300px"
        
    }
    const FILE_BOX_CSS={
        display:"none",
        backgroundColor:"lightgray"
    }
    const FILE_CSS={
        backgroundColor:"white",
        borderRadius:"5px",
        marginBottom:"2px"
    }
    const FILE_LIST_CSS={
        listStyleType:"none"
    }
   return <form id="fileBox" style={FILE_BOX_CSS}><button type="button" align="right" style={CLOSE_CSS} onClick={close}>X</button><br/><ul id="files" style={FILE_LIST_CSS}></ul></form>;
}