const express = require('express');
const path = require('path');
// get the client
const mysql = require('mysql2');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/shop', (req, res) => {
    const name = 'Something';

    // create the connection to database
    const connection = mysql.createConnection({
        host: 'remotemysql.com',
        user: 'REXhJJZHIB',
        password: 'lScmGPJoo5',
        database: 'REXhJJZHIB',
    });
    connection.query('SELECT * FROM `test`', function (err, results) {
        if (err) throw err;
        const arr = results.map((table) => {
            return { id: table.id, name: table.name };
        });
        //console.log(arr);
        res.json(arr);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5002;
app.listen(port);

console.log(`listening on ${port}`);
