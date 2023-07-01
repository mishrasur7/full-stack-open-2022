import express from 'express';

const app = express();

const PORT = 3000; 

app.get('/ping', (_req, res) => {
    console.log('Someone pinged here :)');
    res.send('Pong')
    res.end();
});

app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`);
});