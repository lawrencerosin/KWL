export default function Code({selectedControl, setter}){
    const CSS={
        backgroundColor:"white",
        width:"500px",
        height:"300px",
        border:"0.5px solid black"
    }
    function addControl(event){
        if(selectedControl!==undefined){
            event.target.appendChild(selectedControl.cloneNode(true));//Adds a copy
            setter(undefined);
        }
    }
    return <div id="code" style={CSS} onClick={addControl}></div>
}