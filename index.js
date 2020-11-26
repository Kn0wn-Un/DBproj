const express = require('express');
const path = require('path');
// get the client
const mysql = require('mysql2');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/shows', (req, res) => {
    const { id } = req.query;
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM `shows` WHERE `id` = ?',
        id,
        function (err, results) {
            if (err) throw err;
            console.log('sent show details');
            res.json(results[0]);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/movies', (req, res) => {
    const { id } = req.query;
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM `movies` WHERE `id` = ?',
        id,
        function (err, results) {
            if (err) throw err;
            console.log('sent movie details');
            res.json(results[0]);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/search', (req, res) => {
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM `shows` WHERE `id` <= ?',
        5,
        function (err, results) {
            if (err) throw err;
            console.log('sent details');
            res.json(results);
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

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
