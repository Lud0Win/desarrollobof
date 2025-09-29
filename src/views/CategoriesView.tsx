import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { Category, iconComponents } from '../types';

const CategoriesView: React.FC<{ 
    categories: Category[]; 
    onCategorySelect: (slug: string) => void; 
}> = ({ categories, onCategorySelect }) => (
    <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Explorar Categorías</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map(category => {
                const Icon = iconComponents[category.icon] || LayoutGrid;
                return (
                    <button key={category.slug} onClick={() => onCategorySelect(category.slug)} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
                        <div className="flex items-center justify-center h-20 w-20 bg-indigo-100 rounded-full group-hover:bg-indigo-500 transition-colors duration-300">
                            <Icon size={40} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="mt-4 text-base font-semibold text-gray-800">{category.name}</span>
                    </button>
                )
            })}
        </div>
    </div>
);

export default CategoriesView;
