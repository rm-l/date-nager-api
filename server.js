import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import next from 'next';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.get('/countrieslist', async (req, res) => {
    try {
      const { data } = await axios(process.env.URL_AVALIBLE_COUNTRIES);
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar dados de países');
    }
  });

  server.post('/countryinfo', async (req, res) => {
    try {
      const { countryCode } = req.body;
      const { data } = await axios(
        `${process.env.URL_COUNTRY_INFO}${countryCode}`
      );
      res.send(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erro ao buscar informações do país');
    }
  });

  server.post('/countryflag', async (req, res) => {
    try {
      const { countryCode } = req.body;
      const response = await axios.post(process.env.URL_FLAGS, {
        iso2: countryCode,
      });
      const { data } = response;

      if (!data || !data.data.flag) {
        return res.json({ flag: null });
      }

      res.send({ flag: data.data.flag });
    } catch (error) {
      console.error('Erro ao buscar a bandeira:', error.message);
      res.send({ flag: null });
    }
  });

  server.post('/countrypopulation', async (req, res) => {
    try {
      const { country } = req.body;

      if (!country) {
        return res.status(400).send('Country parameter is required');
      }

      const response = await axios.post(process.env.URL_POPULATION, {
        country,
      });
      res.send(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erro ao buscar população');
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3010;
  server.listen(port, () => {
    console.log(`> Servidor rodando em http://localhost:${port}`);
  });
});
