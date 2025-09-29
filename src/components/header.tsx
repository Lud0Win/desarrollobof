import React from 'react';
import { Search, Menu, Heart, User } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC<{ 
  onMenuClick: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void; 
  favoriteCount: number;
}> = ({ onMenuClick, searchTerm, onSearchChange, favoriteCount }) => (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10 h-20 flex items-center">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <button className="md:hidden text-gray-600" onClick={onMenuClick}><Menu size={24} /></button>
        <div className="hidden md:block"><Logo /></div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input type="text" placeholder="Buscar productos, marcas y más..." className="w-full px-4 py-2.5 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)}/>
            <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="relative text-gray-600 hover:text-indigo-600"><Heart size={24} />
                {favoriteCount > 0 && (<span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{favoriteCount}</span>)}
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600"><User size={24} /></a>
        </div>
      </div>
    </header>
);

export default Header;
