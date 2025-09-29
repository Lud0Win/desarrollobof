import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SortDropdown from '../components/SortDropdown';
import { Product, SortOption } from '../types';

const CategoryProductsView: React.FC<{
    categoryName: string;
    products: Product[];
    favoriteIds: number[];
    onToggleFavorite: (id: number) => void;
    onProductClick: (id: number) => void;
    currentSort: SortOption;
    onSortChange: (option: SortOption) => void;
    onNavigateHome: () => void;
}> = ({
    categoryName,
    products,
    favoriteIds,
    onToggleFavorite,
    onProductClick,
    currentSort,
    onSortChange,
    onNavigateHome
}) => {
    return (
        <div>
            <div className="mb-4 text-sm text-gray-500">
                <button onClick={onNavigateHome} className="hover:text-indigo-600 font-medium">Inicio</button>
                <span className="mx-2">/</span>
                <span className="font-medium text-gray-800">{categoryName}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
                <SortDropdown currentSort={currentSort} onSortChange={onSortChange} />
            </div>
            {products.length > 0 ? (
                <ProductGrid
                    products={products}
                    favoriteIds={favoriteIds}
                    onToggleFavorite={onToggleFavorite}
                    onProductClick={onProductClick}
                />
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">No hay productos en esta categoría</h3>
                    <p className="mt-1 text-sm text-gray-500">Pronto agregaremos más productos. ¡Vuelve a revisar más tarde!</p>
                </div>
            )}
        </div>
    );
};

export default CategoryProductsView;
