import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Home, LayoutGrid, Heart, User, ChevronDown, Frown, Smartphone, Headphones, Laptop, Mouse, Check, Star, Zap } from 'lucide-react';

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
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Recomendados' },
    { value: 'rating-desc', label: 'Mejor valorados' },
    { value: 'price-asc', label: 'Precio: bajo a alto' },
    { value: 'price-desc', label: 'Precio: alto a bajo' },
];


// --- COMPONENTES ---

// Componente del Logo
const Logo = () => (
    <a href="#" className="flex items-center gap-2 shrink-0">
      <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
        <svg className="w-5 h-5 text-white" xmlns="http://www.w.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
      </div>
      <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
        Compara<span className="text-indigo-500">Precios</span>
      </span>
    </a>
);

// Componente Hero Banner
const HeroBanner = () => (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-white/10 rounded-full"></div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight relative z-10">Encuentra el Mejor Precio</h2>
        <p className="text-lg md:text-xl max-w-2xl text-indigo-100 relative z-10">Compara miles de productos de las mejores tiendas en un solo lugar. Ahorrar nunca fue tan fácil.</p>
        <button className="mt-6 bg-white text-indigo-600 font-bold py-2.5 px-6 rounded-full hover:bg-indigo-100 transition-transform duration-300 transform hover:scale-105 shadow relative z-10 flex items-center gap-2">
            <Zap size={18} />
            Explorar Ofertas
        </button>
    </div>
);
  
// Componente para la tarjeta de producto
const ProductCard: React.FC<{ 
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}> = ({ product, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
      onClick={() => alert(`Navegando a los detalles de: ${product.name}`)}
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
            <Star size={16} className="text-yellow-400" />
            <span className="font-bold text-gray-800">{product.rating}</span>
           </div>
          <span className="ml-2">({product.reviewCount} reseñas)</span>
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
                <div className="p-4 flex justify-between items-center border-b h-20"><Logo /><button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-800"><X size={24} /></button></div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.view}><button onClick={() => { onNavigate(item.view); onClose(); }} className={`w-full flex items-center gap-3 px-3 py-2 font-medium rounded-lg transition-colors ${currentView === item.view ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}><item.icon size={20} /><span>{item.label}</span></button></li>
                        ))}
                    </ul>
                </nav>
            </aside>
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
}> = ({ onMenuClick, searchTerm, onSearchChange, favoriteCount }) => (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10 h-20 flex items-center">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <button className="md:hidden text-gray-600" onClick={onMenuClick}><Menu size={24} /></button>
        <div className="hidden md:block"><Logo /></div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input type="text" placeholder="Buscar productos, marcas y más..." className="w-full px-4 py-2.5 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)}/>
            <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="relative text-gray-600 hover:text-indigo-600"><Heart size={24} />
                {favoriteCount > 0 && (<span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{favoriteCount}</span>)}
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600"><User size={24} /></a>
        </div>
      </div>
    </header>
);

// Componente reutilizable para la cuadrícula de productos
const ProductGrid: React.FC<{ products: Product[]; favoriteIds: number[]; onToggleFavorite: (id: number) => void;}> = ({ products, favoriteIds, onToggleFavorite }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (<ProductCard key={product.id} product={product} isFavorite={favoriteIds.includes(product.id)} onToggleFavorite={onToggleFavorite}/>))}
    </div>
);

// Componente para la sección de categorías
const CategoryHighlights: React.FC<{ selectedCategory: string | null; onCategorySelect: (slug: string | null) => void; }> = ({ selectedCategory, onCategorySelect }) => {
    const categories = [{ name: 'Todos', icon: LayoutGrid, slug: null }, ...mockCategories];
    return (
        <div className="mb-10">
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                {categories.map(category => {
                    const isSelected = selectedCategory === category.slug;
                    return (
                        <button key={category.slug || 'all'} onClick={() => onCategorySelect(category.slug)} className={`flex-shrink-0 flex flex-col items-center justify-center p-4 w-28 h-28 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border group ${isSelected ? 'bg-indigo-600 text-white shadow-lg -translate-y-1' : 'bg-white border-gray-100'}`}>
                            <div className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors duration-300 ${isSelected ? 'bg-white' : 'bg-indigo-100 group-hover:bg-indigo-500'}`}>
                                <category.icon size={24} className={`transition-colors duration-300 ${isSelected ? 'text-indigo-600' : 'text-indigo-600 group-hover:text-white'}`} />
                            </div>
                            <span className={`mt-2 text-sm font-semibold truncate transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-800'}`}>{category.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

// Componente para el menú desplegable de ordenamiento
const SortDropdown: React.FC<{ currentSort: SortOption; onSortChange: (option: SortOption) => void; }> = ({ currentSort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label;
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border rounded-lg px-3 py-1.5 hover:bg-gray-50"><span className="hidden sm:inline">Ordenar por:</span><span>{currentLabel}</span><ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} /></button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 border">
                    <ul className="py-1">
                        {sortOptions.map(option => (<li key={option.value}><button onClick={() => { onSortChange(option.value); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center justify-between">{option.label}{currentSort === option.value && <Check size={16} className="text-indigo-600" />}</button></li>))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// Componente principal de la aplicación
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(mockProducts); 
  const [currentView, setCurrentView] = useState<View>('home');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const storedFavorites = window.localStorage.getItem('favoriteProducts');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) { console.error("Error al leer favoritos de localStorage", error); return []; }
  });

  useEffect(() => {
    try { window.localStorage.setItem('favoriteProducts', JSON.stringify(favoriteIds)); } 
    catch (error) { console.error("Error al guardar favoritos en localStorage", error); }
  }, [favoriteIds]);

  const handleToggleFavorite = (productId: number) => {
    setFavoriteIds(prevIds => prevIds.includes(productId) ? prevIds.filter(id => id !== productId) : [...prevIds, productId]);
  };

  const processedProducts = (() => {
    let result = products;
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (searchTerm) result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const sortedResult = [...result];
    switch(sortOption) {
        case 'price-asc': sortedResult.sort((a, b) => a.price - b.price); break;
        case 'price-desc': sortedResult.sort((a, b) => b.price - a.price); break;
        case 'rating-desc': sortedResult.sort((a, b) => b.rating - a.rating); break;
    }
    return sortedResult;
  })();

  const favoriteProducts = products.filter(product => favoriteIds.includes(product.id));
  const currentCategoryName = mockCategories.find(c => c.slug === selectedCategory)?.name || 'Productos Populares';

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} currentView={currentView} onNavigate={setCurrentView} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} searchTerm={searchTerm} onSearchChange={setSearchTerm} favoriteCount={favoriteIds.length} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                {currentView === 'home' && (
                    <>
                        <HeroBanner />
                        <CategoryHighlights selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">{currentCategoryName}</h1>
                            <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
                        </div>
                        <ProductGrid products={processedProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />
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

