'use client'
import { useEffect, useState } from 'react';

async function getContent() {
  try {
    const response = await fetch('http://localhost:3001');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getContent();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Countries List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.countryCode}>
            {item.countryCode} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
