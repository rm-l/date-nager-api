import PropTypes from 'prop-types';
import React from 'react';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Country Information App',
  description: 'An application to view country information and population data',
};

function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
