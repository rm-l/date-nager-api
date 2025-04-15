'use client';
import { Spinner } from '@heroui/spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function getContent() {
  try {
    const response = await fetch('/api/countriesList/');
    if (!response.ok) {
      throw new Error('Failed to fetch countries list');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}

export default function AvalibleCountries() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getContent();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleItemClick = (countryCode) => {
    router.push(`/getcountryinfo?code=${countryCode}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <Spinner className="text-blue-500" size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <p className="text-xl font-bold text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md">
        <div className="max-w-full mx-auto p-4 md:p-6">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 py-4">
            Available Countries
          </h1>
          <div className="mb-6 px-4 md:px-20">
            <input
              type="text"
              placeholder="Search for a country..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredData.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              style={{
                gridAutoFlow: 'dense',
                gridTemplateRows: 'auto',
              }}
            >
              {filteredData.map((item) => (
                <div
                  key={item.countryCode}
                  onClick={() => handleItemClick(item.countryCode)}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-blue-600">
                      {item.countryCode}
                    </span>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm
                  ? 'No countries match your search'
                  : 'No countries available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
