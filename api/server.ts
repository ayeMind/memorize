const express = require('express');
const app = express();
const fs = require('fs');

const pronunciationData = JSON.parse(fs.readFileSync('pronunciation.json', 'utf-8'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/pronunciation/:word', (req, res) => {
    const word = req.params.word;

    const pronunciationURLs = pronunciationData[word];
    if (!pronunciationURLs) {
        return res.status(404).json(null);
    }

    const amazonawsURL = pronunciationURLs.find(url => url.includes('amazonaws'));

    // Если есть amazonaws, возвращаем его
    if (amazonawsURL) {
        return res.json(amazonawsURL);
    }

    // Если нет amazonaws, ищем ссылку с img2
    const img2URL = pronunciationURLs.find(url => url.includes('img2'));
    if (img2URL) {
        return res.json(img2URL);
    }

    // Остальные ссылки, в основном, сломанные
    return res.json(null);
});

const PORT = 3000;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});