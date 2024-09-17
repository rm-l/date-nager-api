import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/countrieslist', async (req, res) => {
    try {
        const { data } = await axios(
            process.env.URL_AVALIBLE_COUNTRIES,
        );
        res.send(data);
    } catch (error) {
        console.error(error);
    }
});

app.post('/countryinfo', async (req, res) => {
    try {
        const { countryCode } = req.body;
        const { data } = await axios(
            `${process.env.URL_COUNTRY_INFO}${countryCode}`,
        );
        res.send(data);
    } catch (error) {
        console.error(error.message);
    }
});

app.post('/countryflag', async (req, res) => {
    try {
        const { countryCode } = req.body;
        const { data } = await axios.post(
            process.env.URL_FLAGS,
            {
                iso2: countryCode,
            },
        );
        res.send(data);
    } catch (error) {
        console.error(error);
    }
});

app.post('/countrypopulation', async (req, res) => {
    try {
        const { country } = req.body;

        if (!country) {
            return res.status(400).send('Country parameter is required');
        }

        const response = await axios.post(
            process.env.URL_POPULATION,
            {
                country: country,
            },
        );

        res.send(response.data);

    } catch (error) {
        console.error(error.message);
    }
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor Express rodando em http://localhost:${process.env.SERVER_PORT}`);
});
