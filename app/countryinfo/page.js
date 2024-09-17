'use client';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import 'dotenv/config';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function CountryInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryCode = searchParams.get('code');
  const [countryData, setCountryData] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_COUNTRY_INFO, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ countryCode }),
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar informações do país');
        }

        const data = await response.json();
        setCountryData(data);
        setCountry(data.commonName);

        const flagResponse = await fetch(process.env.NEXT_PUBLIC_COUNTRY_FLAG, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ countryCode }),
        });

        if (!flagResponse.ok) {
          throw new Error('Erro ao buscar a bandeira do país');
        }

        const flagData = await flagResponse.json();
        setFlagUrl(flagData.data.flag);

        const populationResponse = await fetch(
          process.env.NEXT_PUBLIC_COUNTRY_POPULATION,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country: data.commonName }),
          },
        );

        if (!populationResponse.ok) {
          throw new Error('Erro ao buscar dados de população');
        }

        const populationData = await populationResponse.json();
        setPopulationData(populationData.data.populationCounts);

        setLoading(false);
      } catch (error) {
        setError('Falha ao carregar os dados do país');
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryInfo();
    }
  }, [countryCode]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const chartData = {
    labels: populationData?.map((item) => item.year) || [],
    datasets: [
      {
        label: 'Population',
        data: populationData?.map((item) => item.value) || [],

        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const handleItemClick = (countryCode) => {
    router.push(`/countryinfo?code=${countryCode}`);
  };

  return (
    <div>
      {countryData ? (
        <div>
          <h1>Nome: {countryData.commonName}</h1>
          {flagUrl && (
            <img src={flagUrl} alt={`Flag of ${countryData.commonName}`} />
          )}
          <ul>
            <p>Borders:</p>
            {countryData.borders && countryData.borders.length > 0 ? (
              countryData.borders.map((border, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(border.countryCode)}
                  style={{ cursor: 'pointer' }}
                >
                  {border.commonName}
                </li>
              ))
            ) : (
              <li>No borders available</li>
            )}
          </ul>
          {populationData && (
            <div>
              <h2>Population over years</h2>
              <Line data={chartData} />
            </div>
          )}
        </div>
      ) : (
        <p>Informações do país não encontradas.</p>
      )}
    </div>
  );
}
