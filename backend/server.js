
import express from 'express';

const app = express();


const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello from Express backend!');
});

app.listen(port, () => {
    console.log(`Servidor Express rodando em http://localhost:${port}`);
});
