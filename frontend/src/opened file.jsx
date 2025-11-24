export default function OpenedFile(){
    const CSS={
        color:"white"
    }
    if(sessionStorage.getItem("name")===null)
        return <h1 style={CSS}>No File Opened</h1>;
    else
         return <h1 style={CSS}>{sessionStorage.getItem("name")}</h1>
}