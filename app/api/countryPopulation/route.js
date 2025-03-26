import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { country } = await req.json();

    if (!country) {
      return NextResponse.json(
        { error: 'Country parameter is required' },
        { status: 400 }
      );
    }

    const res = await fetch(process.env.NEXT_PUBLIC_COUNTRY_POPULATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar população:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar população' },
      { status: 500 }
    );
  }
}
