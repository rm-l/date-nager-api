'use client'
import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 3001;

app.use(cors())

app.get('/', async (req, res) => {
    const { data } = await axios('https://date.nager.at/api/v3/AvailableCountries')
    res.send(data);
});

app.listen(port, () => {
    console.log(`Servidor Express rodando em http://localhost:${port}`);
});
