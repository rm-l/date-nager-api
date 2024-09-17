import { redirect } from 'next/navigation';

import Link from 'next/link';



export default function Home() {
  redirect('/getavaliblecountries')
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link href="/getavaliblecountries">Countries List</Link>
      </nav>
    </div>
  );
}
