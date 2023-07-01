import express from 'express';

const app = express();

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('Ping was called!');
    res.send('Pong!');
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});