import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { Category, iconComponents } from '../types';

const CategoryHighlights: React.FC<{ 
    categories: Category[]; 
    selectedCategory: string | null; 
    onCategorySelect: (slug: string | null) => void; 
}> = ({ categories, selectedCategory, onCategorySelect }) => {
    const allCategories = [{ name: 'Todos', icon: 'LayoutGrid' as const, slug: null }, ...categories];
    return (
        <div className="mb-10">
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                {allCategories.map(category => {
                    const isSelected = selectedCategory === category.slug;
                    const Icon = iconComponents[category.icon] || LayoutGrid;
                    return (
                        <button key={category.slug || 'all'} onClick={() => onCategorySelect(category.slug)} className={`flex-shrink-0 flex flex-col items-center justify-center p-4 w-28 h-28 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border group ${isSelected ? 'bg-indigo-600 text-white shadow-lg -translate-y-1' : 'bg-white border-gray-100'}`}>
                            <div className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors duration-300 ${isSelected ? 'bg-white' : 'bg-indigo-100 group-hover:bg-indigo-500'}`}>
                                <Icon size={24} className={`transition-colors duration-300 ${isSelected ? 'text-indigo-600' : 'text-indigo-600 group-hover:text-white'}`} />
                            </div>
                            <span className={`mt-2 text-sm font-semibold truncate transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-800'}`}>{category.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default CategoryHighlights;
