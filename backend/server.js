import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());

app.get('/countrieslist', async (req, res) => {
    try {
        const { data } = await axios('https://date.nager.at/api/v3/AvailableCountries');
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching countries list');
    }
});

app.post('/countryinfo', async (req, res) => {
    try {
        const { countryCode } = req.body;
        const { data } = await axios(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching country info');
    }
});

app.post('/countryflag', async (req, res) => {
    try {
        const { countryCode } = req.body;
        const { data } = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
            iso2: countryCode
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching country flag');
    }
});

app.post('/countrypopulation', async (req, res) => {
    try {
        const { country } = req.body;

        if (!country) {
            return res.status(400).send('Country parameter is required');
        }

        console.log('Received country:', country);

        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
            country: country,
        });

        console.log(response.data)
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching country population:', error.message);
        res.status(500).send('Error fetching country population');
    }
});


app.listen(port, () => {
    console.log(`Servidor Express rodando em http://localhost:${port}`);
});
