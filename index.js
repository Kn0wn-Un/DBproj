const express = require('express');
//to get the client
const path = require('path');
const mysql = require('mysql2');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

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

app.get('/api/search/shows', (req, res) => {
    let { name } = req.query;
    name = '%' + name + '%';
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM `shows` WHERE `name` LIKE ? ORDER BY id DESC LIMIT 50',
        name,
        function (err, results) {
            if (err) throw err;
            console.log('show search');
            res.json(results);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/search/movies', (req, res) => {
    let { name } = req.query;
    name = '%' + name + '%';
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM `movies` WHERE `name` LIKE ? ORDER BY year DESC LIMIT 50',
        name,
        function (err, results) {
            if (err) throw err;
            console.log('movie search');
            res.json(results);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/users/add', (req, res) => {
    let { name } = req.query;
    let { pass } = req.query;
    const enPass = cryptr.encrypt(pass);
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM users WHERE user_name = ?;',
        name,
        function (err, results) {
            if (err) throw err;
            if (results.length > 0) {
                console.log('user already exists');
                res.json('err');
                return;
            } else
                connection.query(
                    'INSERT INTO users (user_name, password) VALUES (? , ?);',
                    [name, enPass],
                    function (err) {
                        if (err) throw err;
                        console.log('added user :)');
                        res.json(true);
                    }
                );
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
    //res.json('added user :)');
});

app.get('/api/users/login', (req, res) => {
    let { name } = req.query;
    let { pass } = req.query;
    const enPass = cryptr.encrypt(pass);

    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM users WHERE user_name = ?;',
        name,
        function (err, results) {
            if (err) throw err;
            if (results.length === 0) {
                console.log('user does not exists');
                res.json(false);
                return;
            } else {
                const dePass = cryptr.decrypt(results[0].password);
                if (pass === dePass) {
                    console.log('Password is correct!');
                    res.json(true);
                    return;
                } else {
                    console.log('Password is Incorrect, not authenticated');
                    res.json(false);
                }
            }
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
    //res.json('added user :)');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
