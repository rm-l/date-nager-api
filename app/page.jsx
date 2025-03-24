import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link href="/getcountries">Countries List</Link>
      </nav>
    </div>
  );
}
