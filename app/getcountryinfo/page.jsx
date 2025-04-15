import { Spinner } from '@heroui/spinner';
import { Suspense } from 'react';
import CountryInfo from './CountryInfo';

export default function Page() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen">
            <Spinner size="lg" />
          </div>
        }
      >
        <CountryInfo />
      </Suspense>
    </>
  );
}
