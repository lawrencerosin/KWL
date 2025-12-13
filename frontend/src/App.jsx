import { useState } from "react";
import Controls from "./controls";
import Code from "./code";
 
function App() {
   const [selectedControl, setSelectedControl]=useState(undefined);
   return (
       <>
         <Controls setter={setSelectedControl}/>
         <Code selectedControl={selectedControl} setter={setSelectedControl}/>
       </>
   );
}

export default App
