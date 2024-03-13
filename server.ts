const express = require('express');
const app = express();
const fs = require('fs');

const Reverso = require('reverso-api');
const reverso = new Reverso();

const pronunciationData = JSON.parse(fs.readFileSync('api/pronunciation.json', 'utf-8'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/pronunciation/:word', (req, res) => {
    try {
        const word = req.params.word;
        const pronunciationURLs = pronunciationData[word];
        if (!pronunciationURLs) {
            return res.status(404).json(null);
        }

        const amazonawsURL = pronunciationURLs.find(url => url.includes('amazonaws'));

        if (amazonawsURL) {
            return res.json(amazonawsURL);
        }

        const img2URL = pronunciationURLs.find(url => url.includes('img2'));
        if (img2URL) {
            return res.json(img2URL);
        }

        return res.json(null);
    } catch (error) {
        console.error('Ошибка во время обработки запроса на получение произношения:', error.message);
        return res.status(500).send('Ошибка сервера');
    }
});

app.get('/context/:word', (req, res) => {
    try {
        const word = req.params.word;
        reverso.getContext(
            word,
            'english',
            'russian',
            (err, response) => {
                if (err) {
                    console.error('Ошибка при запросе контекста:', err.message);
                    return res.status(500).send('Ошибка сервера');
                }
                console.log(response);
                return res.json(response.examples);
            }
        );
    } catch (error) {
        console.error('Ошибка во время обработки запроса на получение контекста:', error.message);
        return res.status(500).send('Ошибка сервера');
    }
});

const PORT = 3000;

function startServer() {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}

startServer();

process.on('uncaughtException', error => {
    console.error('Произошла непредвиденная ошибка:', error.message);
    console.log('Перезапуск сервера...');
    startServer();
});
