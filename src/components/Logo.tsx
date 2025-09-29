import React from 'react';

const Logo = () => (
    <a href="#" className="flex items-center gap-2 shrink-0">
      <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
        <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
      </div>
      <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
        Compara<span className="text-indigo-500">Precios</span>
      </span>
    </a>
);

export default Logo;
