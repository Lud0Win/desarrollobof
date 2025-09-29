import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { StorePrice } from '../types';

const PriceComparisonList: React.FC<{ prices: StorePrice[] }> = ({ prices }) => {
    if (!prices || prices.length === 0) return null;
    const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Comparar Precios</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                {sortedPrices.map((item, index) => (
                    <div key={item.store} className={`p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${index === 0 ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <img src={item.logo} alt={`${item.store} logo`} className="h-8 object-contain"/>
                            <div className="sm:hidden">
                                {index === 0 && <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-0.5 rounded-full">Mejor Precio</span>}
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                           <span className="text-gray-600 text-sm">{item.shipping}</span>
                        </div>
                        <div className="flex items-center gap-6 w-full sm:w-auto">
                           <span className="text-xl font-bold text-gray-800">${item.price.toFixed(2)}</span>
                           <a href={item.url} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm">
                               <ShoppingCart size={16}/>
                               Ir a la tienda
                           </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriceComparisonList;
