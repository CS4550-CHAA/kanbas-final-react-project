import { FaBan } from "react-icons/fa";


const ConditionalPublished = () => {
    const published = false;
    if(published) {
        return (<span className={"btn"}>Published</span>);
    } else {
        return (<span style={{"color" : "grey"}} className={"btn"}>  <FaBan/> Not Published</span>);
    }
};
export default ConditionalPublished;