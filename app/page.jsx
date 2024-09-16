'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/countrieslist">Countries List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
