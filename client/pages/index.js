import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <nav>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </nav>
      Home
    </div>
  )
}
