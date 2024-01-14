import './App.css';
import { useState } from 'react';
import Axios from 'axios';
function App() {

  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [websitePW, fetchWebsite] = useState('');
  const [usernamePW, fetchUsername] = useState('');
  const addpassword = () => {
    Axios.post("http://localhost:3001/addpassword", { password: password, website: website, username: username }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
        alert("Error occurred in adding password.");
      });;
  };
  const getpassword = () => {
    Axios.post("http://localhost:3001/getpassword", { website: websitePW, username: usernamePW }).then(function (response) {
      const results = JSON.parse(JSON.stringify(response)).data[0].password;
      console.log(results);
      document.getElementById("password").innerHTML = results;
    }).catch(function (error) {
      console.log(error);
      document.getElementById("password").innerHTML = "Your Password";
      alert("Error has occurred. Website name or username may not be valid. Please check again and make sure it is case-sensitive.");
    });;
  };
  return (
    <div className="App" >
      <div className="AddPassword">
        <input type="text" placeholder='Enter Website Name' onChange={(event) => { setWebsite(event.target.value) }} />
        <input type="text" placeholder='Enter Username/Email' onChange={(event) => { setUsername(event.target.value) }} />
        <input type="text" placeholder='Enter Password' onChange={(event) => { setPassword(event.target.value) }} />
        <button onClick={addpassword}>Add Information</button>
      </div>
      <div className="GetPassword ">
        <input type="text" placeholder='Enter Website Name' onChange={(event) => { fetchWebsite(event.target.value) }} />
        <input type="text" placeholder='Enter Username/Email' onChange={(event) => { fetchUsername(event.target.value) }} />
        <h2 className="GetPasswordResult" id="password">Your Password</h2>
        <button onClick={getpassword}>Fetch Password</button>
      </div>
    </div>
  );
}

export default App;
