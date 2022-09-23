import React, {useEffect,useState} from 'react'
import axios from 'axios';

export default function Message (){
const [result, setResult] = useState([]);
const message =async () => {
    try{
    let res = await axios.get('http://127.0.0.1:8000');
    let result = res.data;
    console.log(result)
    setResult(result)
    }catch (e) {
        console.log(e);
    }
};
useEffect (() => {
message ()
console.log(typeof(result))
},[])

return(
    <div>
        <p>
        {result.map(home => <div>
            {home.curtosis}
            </div>)}
        </p>
    </div>
)
}