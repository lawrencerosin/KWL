import "./menu.css";
function find(emails, email){
    for(let position=0; position<emails.length; position++)
        if(emails[position]==email)
            return position;
    return -1;
}
export default function Shared({shared, setShared}){
    const CSS={
        display:"none"
    }
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
        return <div className="visibility-menu-option"><span>{email}</span><button onClick={removeShare} style={REMOVE_CSS}>Remove</button></div>;
    });
    return <div style={CSS}>{emails}<button onClick={shareChart} style={ADD_CSS}>Add</button></div>;
}