import React from 'react';
import Header from './Header';

const LayoutNoFooter = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
    </div>
  );
};

export default LayoutNoFooter;
