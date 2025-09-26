import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Home, LayoutGrid, Heart, User, ChevronDown, Frown, Smartphone, Headphones, Laptop, Mouse } from 'lucide-react';

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
  category: string;
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
    category: 'tech',
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Sony+XM5',
    price: 349.99,
    rating: 4.9,
    reviewCount: 2340,
    category: 'audio',
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
    category: 'tech',
  },
  {
    id: 4,
    name: 'Dell XPS 15 Laptop',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Dell+XPS',
    price: 1499.99,
    rating: 4.7,
    reviewCount: 450,
    category: 'laptops',
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
    category: 'accessories',
  },
  {
    id: 6,
    name: 'Kindle Paperwhite',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Kindle',
    price: 139.99,
    rating: 4.8,
    reviewCount: 15800,
    category: 'tech',
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
    category: 'accessories',
  },
  {
    id: 8,
    name: 'Nespresso VertuoPlus',
    image: 'https://placehold.co/600x600/E5E7EB/333?text=Nespresso',
    price: 159.00,
    rating: 4.6,
    reviewCount: 950,
    category: 'home',
  },
];

const mockCategories = [
    { name: 'Tecnología', icon: Smartphone, slug: 'tech' },
    { name: 'Audio', icon: Headphones, slug: 'audio' },
    { name: 'Portátiles', icon: Laptop, slug: 'laptops' },
    { name: 'Accesorios', icon: Mouse, slug: 'accessories' },
    { name: 'Hogar', icon: Home, slug: 'home' }
];

type View = 'home' | 'categories' | 'favorites' | 'account';


// --- COMPONENTES ---

// Componente del Logo para reutilizar en Header y Sidebar
const Logo = () => (
    <a href="#" className="flex items-center gap-2 shrink-0">
      <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
        <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
      </div>
      <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
        Compara<span className="text-indigo-500">Precios</span>
      </span>
    </a>
  );
  

// Componente para la tarjeta de producto
const ProductCard: React.FC<{ 
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}> = ({ product, isFavorite, onToggleFavorite }) => {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se active el click de la tarjeta (navegación)
    onToggleFavorite(product.id);
  };

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
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 left-3 bg-white/70 backdrop-blur-sm p-1.5 rounded-full text-gray-600 hover:text-red-500 transition-colors duration-200"
        >
          <Heart size={20} className={`${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
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
const Sidebar: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void;
    currentView: View;
    onNavigate: (view: View) => void;
}> = ({ isOpen, onClose, currentView, onNavigate }) => {
    const navItems = [
        { view: 'home' as View, icon: Home, label: 'Inicio' },
        { view: 'categories' as View, icon: LayoutGrid, label: 'Categorías' },
        { view: 'favorites' as View, icon: Heart, label: 'Favoritos' },
        { view: 'account' as View, icon: User, label: 'Mi Cuenta' },
    ];

    return (
        <>
            <aside className={`fixed md:static z-30 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex-shrink-0`}>
                <div className="p-4 flex justify-between items-center border-b h-20">
                    <Logo />
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.view}>
                                <button 
                                    onClick={() => { onNavigate(item.view); onClose(); }} 
                                    className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${currentView === item.view ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </button>
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
const Header: React.FC<{ 
  onMenuClick: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void; 
  favoriteCount: number;
}> = ({ onMenuClick, searchTerm, onSearchChange, favoriteCount }) => {
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10 h-20 flex items-center">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <button className="md:hidden text-gray-600" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="hidden md:block">
            <Logo />
        </div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos, marcas y más..."
              className="w-full px-4 py-2.5 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="relative text-gray-600 hover:text-indigo-600">
                <Heart size={24} />
                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {favoriteCount}
                  </span>
                )}
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
                <User size={24} />
            </a>
        </div>
      </div>
    </header>
  );
};

// Componente reutilizable para la cuadrícula de productos
const ProductGrid: React.FC<{
    products: Product[];
    favoriteIds: number[];
    onToggleFavorite: (id: number) => void;
}> = ({ products, favoriteIds, onToggleFavorite }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product}
                    isFavorite={favoriteIds.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

// Componente para la sección de categorías
const CategoryHighlights = () => {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explora Categorías</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {mockCategories.map(category => (
            <button key={category.slug} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 rounded-full group-hover:bg-indigo-500 transition-colors duration-300">
                <category.icon size={32} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="mt-3 text-sm font-semibold text-gray-800">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
};


// Componente principal de la aplicación
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(mockProducts); 
  const [currentView, setCurrentView] = useState<View>('home');
  
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const storedFavorites = window.localStorage.getItem('favoriteProducts');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error al leer favoritos de localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('favoriteProducts', JSON.stringify(favoriteIds));
    } catch (error) {
      console.error("Error al guardar favoritos en localStorage", error);
    }
  }, [favoriteIds]);

  const handleToggleFavorite = (productId: number) => {
    setFavoriteIds(prevIds => 
      prevIds.includes(productId) 
        ? prevIds.filter(id => id !== productId) 
        : [...prevIds, productId]
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteProducts = products.filter(product => favoriteIds.includes(product.id));

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <div className="flex">
        <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            currentView={currentView}
            onNavigate={setCurrentView}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            onMenuClick={() => setSidebarOpen(true)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            favoriteCount={favoriteIds.length}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                {currentView === 'home' && (
                    <>
                        <CategoryHighlights />
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Productos Populares</h1>
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border rounded-lg px-3 py-1.5 hover:bg-gray-50">
                                Ordenar por <ChevronDown size={16} />
                            </button>
                        </div>
                        <ProductGrid products={filteredProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />
                    </>
                )}

                {currentView === 'favorites' && (
                    <>
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos</h1>
                        {favoriteProducts.length > 0 ? (
                            <ProductGrid products={favoriteProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />
                        ) : (
                            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                                <Frown className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium text-gray-900">Aún no tienes favoritos</h3>
                                <p className="mt-1 text-sm text-gray-500">Haz clic en el corazón de un producto para guardarlo aquí.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

