import PropTypes from 'prop-types';
import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Date Nager API',
  description: 'DevelopsToday Assessment: ',
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col overflow-auto min-w-full min-h-screen bg-gray-300">
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
