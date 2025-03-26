import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { countryCode } = await req.json();
    const res = await fetch(process.env.NEXT_PUBLIC_COUNTRY_FLAG, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ iso2: countryCode }),
    });

    const data = await res.json();
    return NextResponse.json({ flag: data?.data?.flag || null });
  } catch (error) {
    console.error('Erro ao buscar a bandeira:', error);
    return NextResponse.json({ flag: null });
  }
}
