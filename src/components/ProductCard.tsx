import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';

const ProductCard: React.FC<{ 
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onProductClick: (id: number) => void;
}> = ({ product, isFavorite, onToggleFavorite, onProductClick }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
      onClick={() => onProductClick(product.id)}
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"/>
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">-{product.discount}%</span>
        )}
        <button onClick={handleFavoriteClick} className="absolute top-3 left-3 bg-white/70 backdrop-blur-sm p-1.5 rounded-full text-gray-600 hover:text-red-500 transition-colors duration-200">
          <Heart size={20} className={`${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base text-gray-800 truncate">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-600">
           <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-gray-800">{product.rating}</span>
           </div>
          <span className="ml-2">({product.reviewCount} reseñas)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
