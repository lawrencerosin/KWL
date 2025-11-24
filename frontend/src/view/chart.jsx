
import Column from "./column";

export default function Chart(){
    const TITLES=["K", "W", "L"];
    const CSS={
        display:"flex",
        flexDirection:"row"
    };
    

    const columns=TITLES.map(function(title){
       
        return <Column title={title} key={title}/>;
    });
    return <nav style={CSS} id="kwl">{columns}</nav>;
}