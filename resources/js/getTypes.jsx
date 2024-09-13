import axios from "axios";
import appPath from "./appPath.js";

const getTypes = (setTypes, setIsLoading = null) => {
    let tempTypes = [];
    if(setIsLoading) 
        setIsLoading(true);
    axios
    .get(appPath('api/gettypes'))
    .then((response) => {
        if(setIsLoading) 
            setIsLoading(false);
        response.data.data.forEach((type) => {tempTypes.push(type.type)});
        setTypes(tempTypes);
    });
}

export default getTypes;