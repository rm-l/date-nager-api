'use client';
import 'dotenv/config';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function getContent() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_COUNTRY_LIST);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export default function getAvalibleCountries() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getContent();
      setData(result);
    };

    fetchData();
  }, []);

  const handleItemClick = (countryCode) => {
    router.push(`/getcountryinfo?code=${countryCode}`);
  };

  return (
    <div className="flex flex-col min-w-full min-h-screen overflow-auto">
      <h1 className="flex font-bold justify-center w-screen min-h-20 p-5 text-5xl bg-slate-200 border-gray-700 border-2 rounded-sm shadow-md">
        Avalible Countries
      </h1>
      <ul className="grid grid-cols-2 min-w-80 min-h-80 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-2 justify-evenly">
        {data.map((item) => (
          <li
            className="grid"
            key={item.countryCode}
            onClick={() => handleItemClick(item.countryCode)}
            style={{ cursor: 'pointer' }}
          >
            {item.countryCode} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
