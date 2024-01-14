const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const mysql = require('mysql2');
const { encrypt, decrypt } = require("./encrypt");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'PasswordDB'
});
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("Connected to MySQL Server!");
});
app.post("/addpassword", (req, res) => {
    const { password, website, username } = req.body;

    db.query("INSERT INTO passwords (password, website, username) VALUES (?,?,?)", [password, website, username], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send("Successfully Added!")
        }
    });
});
app.post("/getpassword", (req, res) => {
    const { website, username } = req.body;

    db.query("SELECT password FROM passwords WHERE website = (?) AND username = (?)", [website, username], (err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.send(result);
            console.log(result);
        }
    });
});
app.listen(PORT, () => {
    console.log("Server is up!");
});

