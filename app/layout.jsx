import PropTypes from 'prop-types';
import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Country Information App',
  description: 'An application to view country information and population data',
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 antialiased">{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
