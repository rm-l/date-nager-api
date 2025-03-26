import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_COUNTRY_LIST);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados de países:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados de países' },
      { status: 500 }
    );
  }
}
