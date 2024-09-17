'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function getContent() {
  try {
    const response = await fetch('http://localhost:3010/countrieslist');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function CountriesList() {
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
    router.push(`/countryinfo?code=${countryCode}`);
  };

  return (
    <div>
      <h1>Countries List</h1>
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
