import React from 'react';
import { X, Home, LayoutGrid, Heart, User } from 'lucide-react';
import Logo from './Logo';
import { View } from '../types';

const Sidebar: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void;
    currentView: View;
    onNavigate: (view: View) => void;
}> = ({ isOpen, onClose, currentView, onNavigate }) => {
    const navItems = [
        { view: 'home' as View, icon: Home, label: 'Inicio' },
        { view: 'categories' as View, icon: LayoutGrid, label: 'Categorías' },
        { view: 'favorites' as View, icon: Heart, label: 'Favoritos' },
        { view: 'account' as View, icon: User, label: 'Mi Cuenta' },
    ];
    return (
        <>
            <aside className={`fixed md:static z-30 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex-shrink-0`}>
                <div className="p-4 flex justify-between items-center border-b h-20"><Logo /><button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-800"><X size={24} /></button></div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.view}><button onClick={() => { onNavigate(item.view); onClose(); }} className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${currentView === item.view ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}><item.icon size={20} /><span>{item.label}</span></button></li>
                        ))}
                    </ul>
                </nav>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={onClose}></div>}
        </>
    );
};

export default Sidebar;
