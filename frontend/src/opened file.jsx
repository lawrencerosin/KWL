export default function OpenedFile(){
    if(sessionStorage.getItem("name")===null)
        return <h1>No File Opened</h1>;
    else
         return <h1>{sessionStorage.getItem("name")}</h1>
}