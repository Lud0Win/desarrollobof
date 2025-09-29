import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Home, LayoutGrid, Heart, User, ChevronDown, Frown, Smartphone, Headphones, Laptop, Mouse, Check, Star, Zap, ShieldCheck, Truck, ShoppingCart, ServerCrash } from 'lucide-react';

// --- INTERFACES Y DATOS ---

interface StorePrice {
    store: string;
    logo: string;
    price: number;
    shipping: string;
    url: string;
}

interface Category {
    name: string;
    icon: keyof typeof iconComponents; // Usaremos el nombre del icono para buscarlo dinámicamente
    slug: string;
}

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
  description: string;
  storePrices: StorePrice[];
}

// Mapeo de nombres de iconos a componentes de Lucide
const iconComponents = {
    Smartphone,
    Headphones,
    Laptop,
    Mouse,
    Home,
    LayoutGrid
};


type View = 'home' | 'categories' | 'favorites' | 'account' | 'product-detail';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Recomendados' },
    { value: 'rating-desc', label: 'Mejor valorados' },
    { value: 'price-asc', label: 'Precio: bajo a alto' },
    { value: 'price-desc', label: 'Precio: alto a bajo' },
];


// --- COMPONENTES DE CARGA (SKELETONS) ---

const ProductCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
        <div className="bg-gray-200 w-full h-48"></div>
        <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-7 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
    </div>
);

const CategoryHighlightsSkeleton = () => (
    <div className="mb-10">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-28 h-28 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-pulse">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded mt-3 w-16 mx-auto"></div>
                </div>
            ))}
        </div>
    </div>
);


// --- COMPONENTES ---

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

const HeroBanner: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-white/10 rounded-full"></div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight relative z-10">Encuentra el Mejor Precio</h2>
        <p className="text-lg md:text-xl max-w-2xl text-indigo-100 relative z-10">Compara miles de productos de las mejores tiendas en un solo lugar. Ahorrar nunca fue tan fácil.</p>
        <button onClick={onExploreClick} className="mt-6 bg-white text-indigo-600 font-bold py-2.5 px-6 rounded-full hover:bg-indigo-100 transition-transform duration-300 transform hover:scale-105 shadow relative z-10 flex items-center gap-2">
            <Zap size={18} />
            Explorar Ofertas
        </button>
    </div>
);
  
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

const ProductGrid: React.FC<{ products: Product[]; favoriteIds: number[]; onToggleFavorite: (id: number) => void; onProductClick: (id: number) => void;}> = ({ products, favoriteIds, onToggleFavorite, onProductClick }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (<ProductCard key={product.id} product={product} isFavorite={favoriteIds.includes(product.id)} onToggleFavorite={onToggleFavorite} onProductClick={onProductClick}/>))}
    </div>
);

const CategoryHighlights: React.FC<{ categories: Category[], selectedCategory: string | null; onCategorySelect: (slug: string | null) => void; }> = ({ categories, selectedCategory, onCategorySelect }) => {
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

const CategoriesView: React.FC<{ categories: Category[]; onCategorySelect: (slug: string) => void; }> = ({ categories, onCategorySelect }) => (
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

const CategoryProductsView: React.FC<{
  categoryName: string;
  products: Product[];
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
  onProductClick: (id: number) => void;
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
  onNavigateHome: () => void;
}> = ({ categoryName, products, favoriteIds, onToggleFavorite, onProductClick, currentSort, onSortChange, onNavigateHome }) => (
  <div>
    <div className="mb-4 text-sm text-gray-500">
      <button onClick={onNavigateHome} className="hover:text-indigo-600 font-medium">Inicio</button>
      <span className="mx-2">/</span>
      <span className="text-gray-800 font-medium">{categoryName}</span>
    </div>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
      <SortDropdown currentSort={currentSort} onSortChange={onSortChange} />
    </div>
    <ProductGrid products={products} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} onProductClick={onProductClick} />
  </div>
);

const PriceComparisonList: React.FC<{ prices: StorePrice[] }> = ({ prices }) => {
    const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Comparar Precios</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
                {sortedPrices.map((item, index) => (
                    <div key={item.store} className={`p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${index === 0 ? 'bg-green-50 border-2 border-green-500' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <img src={item.logo} alt={`${item.store} logo`} className="h-8 object-contain"/>
                            <div className="sm:hidden">
                                {index === 0 && <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-0.5 rounded-full">Mejor Precio</span>}
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                           <span className="text-gray-600 text-sm">{item.shipping}</span>
                        </div>
                        <div className="flex items-center gap-6 w-full sm:w-auto">
                           <span className="text-xl font-bold text-gray-800">${item.price.toFixed(2)}</span>
                           <a href={item.url} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm">
                               <ShoppingCart size={16}/>
                               Ir a la tienda
                           </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProductDetailView: React.FC<{
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onBack: () => void;
    categories: Category[];
}> = ({ product, isFavorite, onToggleFavorite, onBack, categories }) => {
    const categoryName = categories.find(c => c.slug === product.category)?.name;
    const priceListRef = useRef<HTMLDivElement>(null);
    const handleCompareClick = () => {
        priceListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className="mb-4 text-sm text-gray-500">
                <button onClick={onBack} className="hover:text-indigo-600 font-medium">Inicio</button>
                {categoryName && (
                    <>
                        <span className="mx-2">/</span>
                        <button onClick={onBack} className="hover:text-indigo-600 font-medium">{categoryName}</button>
                    </>
                )}
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
                           {product.originalPrice && (
                               <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                           )}
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


// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const storedFavorites = window.localStorage.getItem('favoriteProducts');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) { console.error("Error al leer favoritos de localStorage", error); return []; }
  });
  
  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsResponse, categoriesResponse] = await Promise.all([
                fetch('https://mi-api-supabase.vercel.app/products'),
                fetch('https://mi-api-supabase.vercel.app/categories')
            ]);
            
            if (!productsResponse.ok || !categoriesResponse.ok) {
                throw new Error('No se pudo conectar con la API.');
            }

            const productsData = await productsResponse.json();
            const categoriesData = await categoriesResponse.json();
            
            setProducts(productsData);
            setCategories(categoriesData);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem('favoriteProducts', JSON.stringify(favoriteIds)); } 
    catch (error) { console.error("Error al guardar favoritos en localStorage", error); }
  }, [favoriteIds]);

  const handleToggleFavorite = (productId: number) => {
    setFavoriteIds(prevIds => prevIds.includes(productId) ? prevIds.filter(id => id !== productId) : [...prevIds, productId]);
  };

  const handleExploreOffers = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedProductId(null);
  };
  
  const handleSelectCategory = (slug: string | null) => {
      setSelectedCategory(slug);
      setSelectedProductId(null); 
  };

  const handleNavigate = (view: View) => {
      if (view === 'home') {
          handleNavigateHome();
      } else {
          setCurrentView(view);
          setSelectedCategory(null);
          setSelectedProductId(null);
      }
  };
  
  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
  };
  
  const handleBackToList = () => {
      setSelectedProductId(null);
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
  const currentCategoryName = categories.find(c => c.slug === selectedCategory)?.name || 'Productos Populares';
  const selectedProduct = selectedProductId ? products.find(p => p.id === selectedProductId) : null;

  const renderMainContent = () => {
      if (loading) {
        return (
            <>
                <div className="h-[288px] bg-gray-200 rounded-2xl mb-10 animate-pulse"></div>
                <CategoryHighlightsSkeleton />
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-9 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
            </>
        );
      }
      
      if (error) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                <ServerCrash className="mx-auto h-12 w-12 text-red-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">¡Oh, no! Algo salió mal.</h3>
                <p className="mt-1 text-sm text-gray-500">{error}</p>
                <p className="mt-1 text-sm text-gray-500">Por favor, intenta recargar la página.</p>
            </div>
        )
      }

      if (selectedProduct) {
          return (
              <ProductDetailView 
                product={selectedProduct}
                isFavorite={favoriteIds.includes(selectedProduct.id)}
                onToggleFavorite={handleToggleFavorite}
                onBack={handleBackToList}
                categories={categories}
              />
          );
      }
      
      if (currentView === 'home' && !selectedCategory) {
          return (
              <>
                  <HeroBanner onExploreClick={handleExploreOffers} />
                  <CategoryHighlights categories={categories} selectedCategory={selectedCategory} onCategorySelect={handleSelectCategory} />
                  <div ref={productsSectionRef} className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold text-gray-900">Productos Populares</h1>
                      <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
                  </div>
                  <ProductGrid products={processedProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} onProductClick={handleProductClick} />
              </>
          );
      }

      if (currentView === 'home' && selectedCategory) {
          return (
              <CategoryProductsView
                categoryName={currentCategoryName}
                products={processedProducts}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
                onProductClick={handleProductClick}
                currentSort={sortOption}
                onSortChange={setSortOption}
                onNavigateHome={handleNavigateHome}
              />
          );
      }

      if (currentView === 'categories') {
          return (
              <CategoriesView categories={categories} onCategorySelect={(slug) => {
                  setCurrentView('home');
                  setSelectedCategory(slug);
              }} />
          );
      }
      
      if (currentView === 'favorites') {
          return (
              <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos</h1>
                  {favoriteProducts.length > 0 ? (
                      <ProductGrid products={favoriteProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} onProductClick={handleProductClick} />
                  ) : (
                      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                          <Frown className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-lg font-medium text-gray-900">Aún no tienes favoritos</h3>
                          <p className="mt-1 text-sm text-gray-500">Haz clic en el corazón de un producto para guardarlo aquí.</p>
                      </div>
                  )}
              </>
          );
      }

      return <div>Vista no implementada</div>;
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} currentView={currentView} onNavigate={handleNavigate} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} searchTerm={searchTerm} onSearchChange={setSearchTerm} favoriteCount={favoriteIds.length} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                {renderMainContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


