const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/shop', (req, res) => {
    const name = 'Something';
    res.json({ name });

    console.log(`Sent name`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5002;
app.listen(port);

console.log(`listening on ${port}`);
