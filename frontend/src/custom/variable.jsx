export default function Variable({setter}){
    function setControl(event){
       
     setter(event.target);
       
     }
    return (<variable onClick={setControl}>
        Variable 
        <input type="text" placeholder="Name of Variable"/>
        Data Type:<select>
            <option>Boolean</option>
            <option>Character</option>
            <option>Integer</option>
            <option>Real Number</option>
            <option>String</option>
        </select>
        Changeable <input type="checkbox" checked/>
        </variable>);
}