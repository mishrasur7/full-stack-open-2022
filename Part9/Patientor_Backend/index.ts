import express from 'express';

const app = express();

const PORT = 3000;

app.get('/ping', (_req, res) => {
    console.log('Ping was called!');
    res.send('Pong!');
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});