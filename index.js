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
            connection.end((err) => {
                if (err) throw err;
            });
        }
    );
    console.log('teminated connection...');
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
                    res.json(results[0].user_id);
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
});

app.get('/api/users/delete', (req, res) => {
    let { userId } = req.query;

    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'DELETE FROM users WHERE user_id = ?;',
        userId,
        function (err) {
            if (err) throw err;
            res.json(true);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/add/shows', (req, res) => {
    let { userId, showId, rating, review } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'INSERT INTO S_WATCHED VALUES(?, ?, ?, ?)',
        [userId, showId, rating, review],
        function (err) {
            if (err) throw err;
            console.log('added show to watched');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watched/shows', (req, res) => {
    let { userId, showId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT ratings, review FROM S_WATCHED WHERE user_id = ? AND show_id = ?',
        [userId, showId],
        function (err, results) {
            if (err) throw err;
            res.json(results);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/add/movies', (req, res) => {
    let { userId, movieId, rating, review } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'INSERT INTO M_WATCHED VALUES(?, ?, ?, ?)',
        [userId, movieId, rating, review],
        function (err) {
            if (err) throw err;
            console.log('added movie to watched');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/remove/movies', (req, res) => {
    let { userId, movieId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'DELETE FROM WATCHLATER_M WHERE user_id = ? AND movie_id = ?',
        [userId, movieId],
        function (err) {
            if (err) throw err;
            console.log('removed movie from watched');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watchlater/movies', (req, res) => {
    let { userId, movieId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM WATCHLATER_M WHERE user_id = ? AND movie_id = ?',
        [userId, movieId],
        function (err, results) {
            if (err) throw err;
            res.json(results);
            console.log('sent watch later movies');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watchlater/movies/add', (req, res) => {
    let { userId, movieId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'INSERT INTO WATCHLATER_M VALUES(?, ?)',
        [userId, movieId],
        function (err) {
            if (err) throw err;
            console.log('added movie to watched later');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watchlater/movies/remove', (req, res) => {
    let { userId, movieId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'DELETE FROM WATCHLATER_M WHERE user_id = ? AND movie_id = ?',
        [userId, movieId],
        function (err) {
            if (err) throw err;
            console.log('removed movie from watched later');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watchlater/shows', (req, res) => {
    let { userId, showId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM WATCHLATER_S WHERE user_id = ? AND show_id = ?',
        [userId, showId],
        function (err, results) {
            if (err) throw err;
            res.json(results);
            console.log('sent watch later shows');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watchlater/shows/add', (req, res) => {
    let { userId, showId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'INSERT INTO WATCHLATER_S VALUES(?, ?)',
        [userId, showId],
        function (err) {
            if (err) throw err;
            console.log('added show to watched later');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watchlater/shows/remove', (req, res) => {
    let { userId, showId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'DELETE FROM WATCHLATER_S WHERE user_id = ? AND show_id = ?',
        [userId, showId],
        function (err) {
            if (err) throw err;
            console.log('removed show from watched later');
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/watched/movies', (req, res) => {
    let { userId, movieId } = req.query;
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT ratings, review FROM M_WATCHED WHERE user_id = ? AND movie_id = ?',
        [userId, movieId],
        function (err, results) {
            if (err) throw err;
            res.json(results);
        }
    );
    connection.end((err) => {
        if (err) throw err;
    });
    console.log('teminated connection...');
});

app.get('/api/users', (req, res) => {
    let { userId } = req.query;
    let data = {};
    //create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'unknown',
        password: 'toor',
        database: 'tracker',
    });
    connection.query(
        'SELECT * FROM users WHERE user_id = ?',
        userId,
        function (err, results) {
            if (err) throw err;
            data = { ...results[0] };
            connection.query(
                'SELECT m.id, m.name, w.ratings FROM movies m, M_WATCHED w WHERE m.id = w.movie_id AND w.user_id = ?; ',
                userId,
                function (err, results) {
                    if (err) {
                        connection.end((err) => {
                            if (err) throw err;
                        });
                        throw err;
                    }
                    data.movies = [...results];
                    console.log('got movie data');
                    connection.query(
                        'SELECT s.id, s.name, w.ratings FROM shows s, S_WATCHED w WHERE s.id = w.show_id AND w.user_id = ?; ',
                        userId,
                        function (err, results) {
                            if (err) {
                                connection.end((err) => {
                                    if (err) throw err;
                                });
                                throw err;
                            }
                            data.shows = [...results];
                            console.log('got show data');
                            connection.query(
                                'SELECT m.id, m.name FROM movies m, WATCHLATER_M w WHERE m.id = w.movie_id AND w.user_id = ?; ',
                                userId,
                                function (err, results) {
                                    if (err) {
                                        connection.end((err) => {
                                            if (err) throw err;
                                        });
                                        throw err;
                                    }
                                    data.wlMovies = [...results];
                                    console.log('got watchlater movies');
                                    connection.query(
                                        'SELECT s.id, s.name FROM shows s, WATCHLATER_S w WHERE s.id = w.show_id AND w.user_id = ?; ',
                                        userId,
                                        function (err, results) {
                                            if (err) {
                                                connection.end((err) => {
                                                    if (err) throw err;
                                                });
                                                throw err;
                                            }
                                            data.wlShows = [...results];
                                            console.log('got watchlater shows');
                                            res.json(data);
                                        }
                                    );
                                    console.log('sent user data');
                                    connection.end((err) => {
                                        if (err) throw err;
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
    console.log('teminated connection...');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on port: ${port}`);
