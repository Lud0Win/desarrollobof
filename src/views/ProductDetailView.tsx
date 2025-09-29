import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, Truck, Heart } from 'lucide-react';
import { Product, Category } from '../types';
import PriceComparisonList from '../components/PriceComparisonList';

const ProductDetailView: React.FC<{
    productId: number;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onBack: () => void;
    categories: Category[];
}> = ({ productId, isFavorite, onToggleFavorite, onBack, categories }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const priceListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://mi-api-supabase.vercel.app/products/${productId}`);
                if (!response.ok) throw new Error('Producto no encontrado');
                const data = await response.json();

                if (!data.storePrices) {
                  data.storePrices = [
                      { store: 'ElectroShop', logo: 'https://placehold.co/100x40/1e40af/ffffff?text=ElectroShop', price: data.price, shipping: 'Envío gratis', url: '#' },
                      { store: 'TecnoWorld', logo: 'https://placehold.co/100x40/6d28d9/ffffff?text=TecnoWorld', price: data.price + 15.50, shipping: 'Envío en 3 días', url: '#' },
                      { store: 'GadgetGalaxy', logo: 'https://placehold.co/100x40/be185d/ffffff?text=GadgetGalaxy', price: data.price - 5.00, shipping: 'Retiro en tienda', url: '#' }
                  ];
                }

                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="bg-gray-200 h-96 rounded-2xl"></div>
                    <div>
                        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
                        <div className="h-20 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (!product) return <div>Producto no encontrado.</div>;
    
    const categoryName = categories.find(c => c.slug === product.category)?.name;
    const handleCompareClick = () => {
        priceListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className="mb-4 text-sm text-gray-500">
                <button onClick={onBack} className="hover:text-indigo-600 font-medium">Inicio</button>
                {categoryName && ( <> <span className="mx-2">/</span> <button onClick={onBack} className="hover:text-indigo-600 font-medium">{categoryName}</button> </> )}
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg"/>
                </div>
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                            <Star size={18} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-gray-800">{product.rating}</span>
                            <span className="text-gray-600">({product.reviewCount} reseñas)</span>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                       <span className="text-sm text-gray-600">Mejor precio encontrado</span>
                        <div className="flex items-baseline gap-3">
                           <span className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                           {product.originalPrice && ( <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span> )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button onClick={handleCompareClick} className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">Comparar Precios</button>
                        <button onClick={() => onToggleFavorite(product.id)} className="w-full bg-white border-2 border-indigo-200 text-indigo-600 font-bold py-3 px-6 rounded-full hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                           <Heart size={20} className={`${isFavorite ? 'fill-current' : ''}`}/> {isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}
                        </button>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-green-500" /><span>Garantía de compra segura</span></div>
                        <div className="flex items-center gap-2"><Truck size={18} className="text-blue-500" /><span>Opciones de envío disponibles</span></div>
                    </div>
                </div>
            </div>
            <div ref={priceListRef}>
                <PriceComparisonList prices={product.storePrices || []} />
            </div>
        </div>
    );
};

export default ProductDetailView;
