import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { countryCode } = await req.json();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRY_INFO}${countryCode}`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar informações do país:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar informações do país' },
      { status: 500 }
    );
  }
}
