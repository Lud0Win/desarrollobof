import React, { useState } from 'react';
import { Search, Menu, X, Home, LayoutGrid, Heart, User, ChevronDown } from 'lucide-react';

// Interfaz para definir la estructura de un producto
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
}

// Datos de ejemplo para los productos
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 14 Pro',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=iPhone+14',
    price: 999.99,
    originalPrice: 1099.99,
    discount: 9,
    rating: 4.8,
    reviewCount: 1250,
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Sony+XM5',
    price: 349.99,
    rating: 4.9,
    reviewCount: 2340,
  },
  {
    id: 3,
    name: 'Samsung Galaxy Watch 6',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Watch+6',
    price: 279.99,
    originalPrice: 329.99,
    discount: 15,
    rating: 4.6,
    reviewCount: 890,
  },
  {
    id: 4,
    name: 'Dell XPS 15 Laptop',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Dell+XPS',
    price: 1499.99,
    rating: 4.7,
    reviewCount: 450,
  },
  {
    id: 5,
    name: 'Logitech MX Master 3S Mouse',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=MX+Master',
    price: 99.99,
    originalPrice: 119.99,
    discount: 17,
    rating: 4.9,
    reviewCount: 3120,
  },
  {
    id: 6,
    name: 'Kindle Paperwhite',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Kindle',
    price: 139.99,
    rating: 4.8,
    reviewCount: 15800,
  },
  {
    id: 7,
    name: 'GoPro HERO11 Black',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=GoPro',
    price: 399.99,
    originalPrice: 499.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 780,
  },
  {
    id: 8,
    name: 'Nespresso VertuoPlus',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Nespresso',
    price: 159.00,
    rating: 4.6,
    reviewCount: 950,
  },
];


// --- COMPONENTES ---

// Componente para la tarjeta de producto
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
      onClick={() => alert(`Navegando a los detalles de: ${product.name}`)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base text-gray-800 truncate">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-600">
           <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ))}
           </div>
          <span className="ml-2">({product.reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

// Componente para la barra lateral
const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const navItems = [
        { icon: Home, label: 'Inicio' },
        { icon: LayoutGrid, label: 'Categorías' },
        { icon: Heart, label: 'Favoritos' },
        { icon: User, label: 'Mi Cuenta' },
    ];

    return (
        <>
            <aside className={`fixed md:static z-30 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex-shrink-0`}>
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Compara<span className="text-indigo-600">Precios</span></h2>
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 font-medium hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={onClose}></div>}
        </>
    );
};


// Componente para la cabecera
const Header: React.FC<{ onMenuClick: () => void }> = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm p-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <button className="md:hidden text-gray-600" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="hidden md:block text-2xl font-bold text-gray-800">Compara<span className="text-indigo-600">Precios</span></div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos, marcas y más..."
              className="w-full px-4 py-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all"
            />
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Heart size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
                <User size={24} />
            </a>
        </div>
      </div>
    </header>
  );
};


// Componente principal de la aplicación
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts); // Para futura funcionalidad de búsqueda

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Productos Populares</h1>
                    <div className="relative">
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border rounded-lg px-3 py-1.5 hover:bg-gray-50">
                            Ordenar por <ChevronDown size={16} />
                        </button>
                        {/* Dropdown menu can be added here */}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
