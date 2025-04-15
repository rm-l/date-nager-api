'use client';
import { Spinner } from '@heroui/spinner';
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
import { useTheme } from 'next-themes';
import Image from 'next/image';
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
  Legend
);

export const dynamic = 'force-dynamic';

export default function CountryInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const countryCode = searchParams.get('code');
  const [countryData, setCountryData] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchCountryInfo = async () => {
      if (!countryCode) return;

      try {
        const countryResponse = await fetch('/api/countryInfo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ countryCode }),
        });

        if (!countryResponse.ok)
          throw new Error('Erro ao buscar informações do país');
        const countryData = await countryResponse.json();
        setCountryData(countryData);

        const flagResponse = await fetch('/api/countryFlag', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ countryCode }),
        });

        if (!flagResponse.ok)
          throw new Error('Erro ao buscar a bandeira do país');
        const flagData = await flagResponse.json();
        setFlagUrl(flagData.flag || null);

        const populationResponse = await fetch('/api/countryPopulation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: countryData.commonName }),
        });

        if (!populationResponse.ok) {
          console.error('Erro ao buscar população');
          setPopulationData(null);
        } else {
          const populationData = await populationResponse.json();
          setPopulationData(populationData.data?.populationCounts || null);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const chartData = {
    labels: populationData?.map((item) => item.year) || [],
    datasets: [
      {
        label: 'Population',
        data: populationData?.map((item) => item.value) || [],
        fill: false,
        borderColor:
          theme === 'dark' ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
        backgroundColor:
          theme === 'dark'
            ? 'rgba(96, 165, 250, 0.5)'
            : 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#f3f4f6' : '#111827',
        },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Population Over Years',
        font: {
          size: 16,
        },
        color: theme === 'dark' ? '#f3f4f6' : '#111827',
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color:
            theme === 'dark'
              ? 'rgba(75, 85, 99, 0.5)'
              : 'rgba(209, 213, 219, 0.5)',
        },
      },
      y: {
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        },
        grid: {
          color:
            theme === 'dark'
              ? 'rgba(75, 85, 99, 0.5)'
              : 'rgba(209, 213, 219, 0.5)',
        },
      },
    },
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100 dark:bg-gray-900">
        <Spinner className="text-blue-500 dark:text-blue-400" size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
        <p className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">
          {error}
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-100 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  const handleItemClick = (countryCode) => {
    router.push(`/getcountryinfo?code=${countryCode}`);
  };

  const handleClickHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      {countryData ? (
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-blue-50 dark:bg-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {flagUrl && (
                <div className="w-24 h-16 md:w-32 md:h-20 relative">
                  <Image
                    src={flagUrl}
                    alt={`Flag of ${countryData.commonName}`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
                {countryData.commonName}
              </h1>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={handleClickHome}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-100 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
                Border Countries
              </h2>
              {countryData.borders && countryData.borders.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {countryData.borders.map((border, index) => (
                    <button
                      key={index}
                      onClick={() => handleItemClick(border.countryCode)}
                      className="px-3 py-1 bg-white dark:bg-gray-600 border border-blue-200 dark:border-gray-500 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors text-sm md:text-base text-gray-800 dark:text-gray-200"
                    >
                      {border.commonName}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No borders available
                </p>
              )}
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
                Population Data
              </h2>
              {populationData ? (
                <div className="h-64 md:h-80 w-full">
                  <Line data={chartData} options={chartOptions} />
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-500 dark:text-red-400 font-medium">
                    No population data available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-xl font-bold text-red-500 dark:text-red-400 mb-4">
            Country information not found
          </p>
          <button
            onClick={handleClickHome}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-100 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
