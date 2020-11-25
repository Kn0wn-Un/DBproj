const express = require('express');
const path = require('path');
// get the client
const mysql = require('mysql2');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/shows', (req, res) => {
    const name = 'Something';

    // create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'example',
    });
    connection.query(
        'SELECT * FROM `shows` WHERE `name` = ?',
        'Gravity Falls',
        function (err, results) {
            if (err) throw err;
            //const arr = results.map((table) => {
            //    return { ...table };
            //});
            console.log('sent details');
            res.json(results[0]);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5002;
app.listen(port);

console.log(`listening on ${port}`);
