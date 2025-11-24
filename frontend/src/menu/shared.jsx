import "./menu.css";
import Menu from "./menu";
function find(emails, email){
    for(let position=0; position<emails.length; position++)
        if(emails[position]==email)
            return position;
    return -1;
}
export default function Shared({shared, setShared}){
     
    function shareChart(){
        const sharee=prompt("Enter the email address you want to share with.");
        const shareCopy=[...shared];
        shareCopy.push(sharee);
        setShared(shareCopy);
    }
    
    const ADD_CSS={
        backgroundColor:"yellow"
    }
    const REMOVE_CSS={
        backgroundColor:"red"
    }
    const emails=shared.map(function(email){
        function removeShare(){
          
           const copiedShared=[...shared];
            const emailLoc=find(copiedShared, email);
           copiedShared.splice(emailLoc, 1);
           setShared(copiedShared);
        }
        return <div className="shared-menu-option"><span>{email}</span><button onClick={removeShare} style={REMOVE_CSS}>Remove</button></div>;
    });
    return <Menu menuClass="shared-menu-option" name="Shared With">{emails}<button style={ADD_CSS} onClick={shareChart}>Add</button></Menu>;
}