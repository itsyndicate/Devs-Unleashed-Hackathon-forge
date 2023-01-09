import '../css/generateTable.css';
import {requestJira} from "@forge/bridge";
import {useState} from "react";

const getUsers = async () => {
    const response = (await requestJira('/rest/api/3/users/search?')).json();
    const accountId = response[0].accountId;
    console.log(accountId);
}

const getTasks = async () => {
    const [tasks, setTasks] = useState([]);

    const response = await requestJira('/rest/api/2/search?jql=status+in+%28+done%29+order+by+status')
        .then(res => res.json())
        .then(res => setTasks(res['total']))
}

// const customize = async (image) => {
//     getUsers()
// };
//



const splitArray = (inputArray, perChunk = 4) => {
    return inputArray.items.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(item);

        return resultArray
    }, []);
}

export const GenerateItemsTable = (items = []) => {
    const rows = splitArray(items).map((row, index) => {
        return (<div className="arsenal-row" key={index}>{row.map(({src}, idx) => {
            return (<div className="arsenal-data" key={index.toString() + idx}>
                <button className="eqItemsButton" onClick={() => getUsers()}><img src={src} alt=""/></button>
            </div>);
        })}</div>);
    });

    return (
        <div className="arsenal">
            {rows}
        </div>
    );
}
