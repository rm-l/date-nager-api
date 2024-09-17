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
    console.error(error);
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
    <div>
      <h1>Avalible Countries List</h1>
      <ul>
        {data.map((item) => (
          <li
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
