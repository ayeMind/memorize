// get pronounciations from jsom file in this folder (with creating nodejs server)

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.get('/api/getPronunciation', (req, res) => {
    const word = req.query.word;
    const filePath = path.join(__dirname, 'pronunciations.json');
    fs.readFile(filePath
        , (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
            const pronunciations = JSON.parse(data);
            const pronunciation = pronunciations[word];
            if (pronunciation) {
                res.json(pronunciation);
            } else {
                res.status(404).send('Not Found');
            }
        });
});