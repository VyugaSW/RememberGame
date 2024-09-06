import axios from "axios";
import appPath from "../appPath.js";

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

export const saveResult = (usid, typeid, mins, secs, scor, setMessage = null) => {
    console.log(usid,typeid,mins,secs,scor);
    axios
    .post(appPath('api/saverecord'), 
        {
        userid: usid, 
        typegameid: typeid,
        minutes: mins, 
        seconds: secs, 
        scores: scor
        })
    .then((response) => {
        if(setMessage != null)
        setMessage(response.data.message)
        return response.data.status;
    });
}

export default getTypes;