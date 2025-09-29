import React from 'react';
import { Zap } from 'lucide-react';

const HeroBanner: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-white/10 rounded-full"></div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight relative z-10">Encuentra el Mejor Precio</h2>
        <p className="text-lg md:text-xl max-w-2xl text-indigo-100 relative z-10">Compara miles de productos de las mejores tiendas en un solo lugar. Ahorrar nunca fue tan fácil.</p>
        <button onClick={onExploreClick} className="mt-6 bg-white text-indigo-600 font-bold py-2.5 px-6 rounded-full hover:bg-indigo-100 transition-transform duration-300 transform hover:scale-105 shadow relative z-10 flex items-center gap-2">
            <Zap size={18} />
            Explorar Ofertas
        </button>
    </div>
);

export default HeroBanner;
