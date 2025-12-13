import Type from "./type";

export default function Variable({setter}){
    function setControl(event){
       
     setter(event.target);
       
     }
    return (<variable onClick={setControl}>
        Variable 
        <input type="text" placeholder="Name of Variable"/>
        <Type/>
        Changeable <input type="checkbox" checked/>
        </variable>);
}