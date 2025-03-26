import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/getcountries');
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link href="/getcountries">Countries List</Link>
      </nav>
    </div>
  );
}
