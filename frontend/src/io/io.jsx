import Write from "./write";
import Read from "./read";
import ControlGroup from "../control group";
export default function IO({selectedControl, setter}){
    return <ControlGroup name="Input/Output"><Write  setter={setter}/><br/><Read setter={setter}/></ControlGroup>;
}