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

export default function getCountryInfo() {
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
          setError('Erro ao buscar informações do país');
          console.error(error);
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
    return <p>Loading...</p>;
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
    router.push(`/getcountryinfo?code=${countryCode}`);
  };

  const handleClickHome = () => {
    router.push('/');
  }

  return (
    <div>
      {countryData ? (
        <div className='flex flex-col min-w-full justify-center gap-4'>
          <div className='flex flex-row place-content-center  p-2 w-screen h-fit'>
            <div className='flex flex-col justify-center p-5'>
              <h1
                className='flex flex-col text-5xl font-bold text-center justify-start align-middle'
              >
                {countryData.commonName}
              </h1>
            </div>
            <div className='flex p-5 justify-start'>
              {flagUrl && (
                <img
                  className='min-w-52 min-h-52 max-w-52 max-h-52'
                  src={flagUrl}
                  alt={`Flag of ${countryData.commonName}`}
                />
              )}
            </div>
          </div>
          <div className='flex flex-col justify-center border-2 place-content-center border-gray-400 w-fit self-center rounded-md p-2 px-40'>
            <p className='flex justify-center font-bold w-fit self-center'>
              Border Countries
              :</p>
            {countryData.borders && countryData.borders.length > 0 ? (
              countryData.borders.map((border, index) => (
                <p
                className='flex justify-center underline'
                  key={index}
                  onClick={() => handleItemClick(border.countryCode)}
                  style={{ cursor: 'pointer' }}
                >
                  {border.commonName}
                </p>
              ))
            ) : (
              <li>No borders available</li>
            )}

          </div>
          <div>
            {populationData && (
              <div>
                <h2>Population over years</h2>
                <Line
                  className='max-w-full max-h-80'
                  data={chartData}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Country information not found.</p>
      )}
      <div className='flex justify-center mt-5'>

      <button
      className='bg-slate-500 rounded-lg text-white px-5 py-3'
      onClick={() => handleClickHome()}>
        Back
      </button>
          </div>
    </div>
  );
}
