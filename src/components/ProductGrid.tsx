import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

const ProductGrid: React.FC<{ 
    products: Product[]; 
    favoriteIds: number[]; 
    onToggleFavorite: (id: number) => void; 
    onProductClick: (id: number) => void;
}> = ({ products, favoriteIds, onToggleFavorite, onProductClick }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
            <ProductCard 
                key={product.id} 
                product={product} 
                isFavorite={favoriteIds.includes(product.id)} 
                onToggleFavorite={onToggleFavorite} 
                onProductClick={onProductClick}
            />
        ))}
    </div>
);

export default ProductGrid;
