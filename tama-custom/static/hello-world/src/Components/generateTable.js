
// const getUsers = async () => {
//     const response = (await requestJira('/rest/api/3/users/search?'));
//     const data = await response.json();
//     console.log(data[0].accountId);
// }


// curl -X 'POST'   'http://18.197.127.216/api/v1/register-player'   -H 'accept: application/json'   -H 'Content-Type: application/json'   -d '{
//   "player_name": "test-cron",
//   "account_id": "635fbb7bf7ad721e784f0156",
//   "project_id": "test-cront",
//   "project_name": "tama"
// }'

//curl -X 'GET'   'http://18.197.127.216/api/v1/taskogotchi?account_id=635fbb7bf7ad721e784f0156&project_id=test-cront'   -H 'accept: application/json'


// const getTasks = async () => {
//     const [tasks, setTasks] = useState([]);
//
//     const response = await requestJira('/rest/api/2/search?jql=status+in+%28+done%29+order+by+status')
//         .then(res => res.json())
//         .then(res => setTasks(res['total']))
// }

// const customize = async (image) => {
//     getUsers()
// };
//
