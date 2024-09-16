'use client';
import { useRouter } from 'next/navigation'; // Para manipular a navegação
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
  const router = useRouter(); // Hook para navegação

  useEffect(() => {
    const fetchData = async () => {
      const result = await getContent();
      setData(result);
    };

    fetchData();
  }, []);

  // Função para tratar o clique no item
  const handleItemClick = (countryCode) => {
    router.push(`/countryinfo?code=${countryCode}`); // Redireciona com o countryCode como parâmetro na URL
  };

  return (
    <div>
      <h1>Countries List</h1>
      <ul>
        {data.map((item) => (
          <li
            key={item.countryCode}
            onClick={() => handleItemClick(item.countryCode)} // Chama a função no clique
            style={{ cursor: 'pointer' }} // Para indicar que é clicável
          >
            {item.countryCode} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
