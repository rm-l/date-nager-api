'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// // Registre os componentes do Chart.js
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

export default function CountryInfo() {
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

                const response = await fetch('http://localhost:3010/CountryInfo', {
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

                const flagResponse = await fetch('http://localhost:3010/countryflag', {
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

    // // Prepara os dados para o gráfico
    // const chartData = {
    //     labels: populationData?.map(item => item.year) || [], // Anos
    //     datasets: [
    //         {
    //             label: 'População',
    //             data: populationData?.map(item => item.value) || [], // Valores de população
    //             fill: false,
    //             borderColor: 'rgb(75, 192, 192)',
    //             tension: 0.1
    //         }
    //     ]
    // };

    return (
        <div>
            {countryData ? (
                <div>
                    <h1>Nome: {countryData.commonName}</h1>
                    {flagUrl && <img src={flagUrl} alt={`Flag of ${countryData.commonName}`} />} {/* Renderiza a bandeira */}
                    <ul>
                        <p>Borders:</p>
                        {countryData.borders && countryData.borders.length > 0 ? (
                            countryData.borders.map((border, index) => (
                                <li key={index}>{border.commonName}</li>
                            ))
                        ) : (
                            <li>No borders available</li>
                        )}
                    </ul>
                    <p>Continente: {countryData.continent}</p>
                    {/* Renderize mais informações conforme necessário */}

                    {/* Renderiza o gráfico de população */}
                    {/* {populationData && (
                        <div>
                            <h2>População ao longo dos anos</h2>
                            <Line data={chartData} />
                        </div>
                    )} */}
                </div>
            ) : (
                <p>Informações do país não encontradas.</p>
            )}
        </div>
    );
}
