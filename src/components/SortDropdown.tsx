import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { SortOption } from '../types';

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Recomendados' },
    { value: 'rating-desc', label: 'Mejor valorados' },
    { value: 'price-asc', label: 'Precio: bajo a alto' },
    { value: 'price-desc', label: 'Precio: alto a bajo' },
];

const SortDropdown: React.FC<{ 
    currentSort: SortOption; 
    onSortChange: (option: SortOption) => void; 
}> = ({ currentSort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border rounded-lg px-3 py-1.5 hover:bg-gray-50">
                <span className="hidden sm:inline">Ordenar por:</span>
                <span>{currentLabel}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border">
                    <ul className="py-1">
                        {sortOptions.map(option => (
                            <li key={option.value}>
                                <button onClick={() => { onSortChange(option.value); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center justify-between">
                                    {option.label}
                                    {currentSort === option.value && <Check size={16} className="text-indigo-600" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
