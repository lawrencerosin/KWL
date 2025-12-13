import ControlGroup from "../control group";
import Variable from "./variable";
export default function Custom({setter}){
    return <ControlGroup name="Custom"><Variable setter={setter}/></ControlGroup>
}