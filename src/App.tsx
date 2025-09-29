import { useState, useEffect, useRef } from 'react';
import { Frown, ServerCrash, LoaderCircle, SearchX } from 'lucide-react';

import { Product, Category, View, SortOption, PaginatedResponse } from './types';
import useDebounce from './hooks/useDebounce';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import CategoryHighlights from './components/CategoryHighlights';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';
import ProductCardSkeleton from './components/skeletons/ProductCardSkeleton';
import CategoryHighlightsSkeleton from './components/skeletons/CategoryHighlightsSkeleton';
import CategoriesView from './views/CategoriesView';
import ProductDetailView from './views/ProductDetailView';
import CategoryProductsView from './views/CategoryProductsView';
import BackToTopButton from './components/BackToTopButton';

const PRODUCTS_PER_PAGE = 12;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try { 
      const storedFavorites = window.localStorage.getItem('favoriteProducts'); 
      return storedFavorites ? JSON.parse(storedFavorites) : []; 
    } catch (error) { 
      console.error("Error al leer favoritos de localStorage", error); 
      return []; 
    }
  });

  // Efecto para la búsqueda y carga de datos
  useEffect(() => {
    const fetchApiData = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const url = `https://mi-api-supabase.vercel.app/products?page=${page}&limit=${PRODUCTS_PER_PAGE}&search=${search}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error en la llamada a la API');
            
            const data: PaginatedResponse = await response.json();

            setProducts(data.data);
            setTotalProducts(data.totalCount);
            setCurrentPage(1); // Siempre resetear a la página 1 en una nueva búsqueda
            setError(null);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setProducts([]);
            setTotalProducts(0);
        } finally {
            setLoading(false);
        }
    };
    
    // Si hay un término de búsqueda, se ejecuta. Si no, carga los datos iniciales.
    fetchApiData(1, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Carga las categorías una sola vez al montar el componente
  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const categoriesResponse = await fetch('https://mi-api-supabase.vercel.app/categories');
              if (!categoriesResponse.ok) throw new Error('No se pudo conectar con la API.');
              const categoriesData = await categoriesResponse.json();
              setCategories(categoriesData);
          } catch(err: any) {
              console.error(err);
              setError(err.message || 'Ocurrió un error inesperado.');
          }
      };
      fetchCategories();
  }, []);

  useEffect(() => {
    try { 
      window.localStorage.setItem('favoriteProducts', JSON.stringify(favoriteIds)); 
    } catch (error) { 
      console.error("Error al guardar favoritos en localStorage", error); 
    }
  }, [favoriteIds]);

  const handleLoadMore = async () => {
    if (isLoadingMore || products.length >= totalProducts) return;

    setIsLoadingMore(true);
    try {
        const nextPage = currentPage + 1;
        const response = await fetch(`https://mi-api-supabase.vercel.app/products?page=${nextPage}&limit=${PRODUCTS_PER_PAGE}&search=${debouncedSearchTerm}`);
        if (!response.ok) throw new Error('No se pudieron cargar más productos.');

        const newData: PaginatedResponse = await response.json();
        setProducts(prevProducts => [...prevProducts, ...newData.data]);
        setCurrentPage(nextPage);
    } catch (err: any) {
        console.error("Error al cargar más productos:", err);
    } finally {
        setIsLoadingMore(false);
    }
  };
  
  const handleToggleFavorite = (productId: number) => { 
    setFavoriteIds(prevIds => 
      prevIds.includes(productId) 
        ? prevIds.filter(id => id !== productId) 
        : [...prevIds, productId]
    ); 
  };
  
  const handleExploreOffers = () => { productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' }); };
  const handleNavigateHome = () => { 
      setCurrentView('home'); 
      setSelectedCategory(null); 
      setSelectedProductId(null);
      if (searchTerm) setSearchTerm(''); // Esto disparará el useEffect de búsqueda para recargar
  };
  const handleSelectCategory = (slug: string | null) => { setSelectedCategory(slug); setSelectedProductId(null); };
  const handleNavigate = (view: View) => { 
    if (view === 'home') { 
      handleNavigateHome(); 
    } else { 
      setCurrentView(view); 
      setSelectedCategory(null); 
      setSelectedProductId(null); 
    } 
  };
  const handleProductClick = (id: number) => { setSelectedProductId(id); };
  const handleBackToList = () => { setSelectedProductId(null); };

  const processedProducts = (() => {
    let result = [...products];
    // El filtrado ahora lo hace la API. El ordenamiento lo mantenemos en el cliente.
    switch(sortOption) {
        case 'price-asc': result.sort((a, b) => a.price - b.price); break;
        case 'price-desc': result.sort((a, b) => b.price - a.price); break;
        case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  })();

  const favoriteProducts = products.filter(product => favoriteIds.includes(product.id));
  const currentCategoryName = categories.find(c => c.slug === selectedCategory)?.name || 'Productos Populares';
  
  const renderMainContent = () => {
    // ... (El resto del renderizado se mantiene igual, pero ahora será más reactivo a la búsqueda)

    if (selectedProductId) {
      return ( <ProductDetailView productId={selectedProductId} isFavorite={favoriteIds.includes(selectedProductId)} onToggleFavorite={handleToggleFavorite} onBack={handleBackToList} categories={categories} /> );
    }

    if (loading) {
        return (
            <>
              {!debouncedSearchTerm && <div className="h-[288px] bg-gray-200 rounded-2xl mb-10 animate-pulse"></div>}
              <CategoryHighlightsSkeleton />
              <div className="flex justify-between items-center mb-6">
                <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-9 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            </>
          );
    }
    
    if (error) {
        return ( <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm"> <ServerCrash className="mx-auto h-12 w-12 text-red-400" /> <h3 className="mt-2 text-lg font-medium text-gray-900">¡Oh, no! Algo salió mal.</h3> <p className="mt-1 text-sm text-gray-500">{error}</p> <p className="mt-1 text-sm text-gray-500">Por favor, intenta recargar la página.</p> </div> );
    }

    const searchResultsContent = (
        <>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Resultados para "{debouncedSearchTerm}"</h1>
            {processedProducts.length > 0 ? (
                <ProductGrid products={processedProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} onProductClick={handleProductClick} />
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <SearchX className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No hay resultados</h3>
                    <p className="mt-1 text-sm text-gray-500">Intenta con otra palabra clave o revisa la ortografía.</p>
                </div>
            )}
        </>
    );

    if (debouncedSearchTerm) {
        return searchResultsContent;
    }

    const mainGrid = (
      <>
        <ProductGrid 
          products={processedProducts} 
          favoriteIds={favoriteIds} 
          onToggleFavorite={handleToggleFavorite} 
          onProductClick={handleProductClick} 
        />
        {products.length < totalProducts && !searchTerm && !selectedCategory && (
          <div className="text-center mt-10">
            <button 
              onClick={handleLoadMore} 
              disabled={isLoadingMore} 
              className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-full hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 flex items-center gap-2 mx-auto"
            >
              {isLoadingMore ? <><LoaderCircle size={20} className="animate-spin" /> <span>Cargando...</span></> : 'Cargar Más Productos'}
            </button>
          </div>
        )}
      </>
    );

    if (currentView === 'home' && !selectedCategory) {
      return ( <> <HeroBanner onExploreClick={handleExploreOffers} /> <CategoryHighlights categories={categories} selectedCategory={selectedCategory} onCategorySelect={handleSelectCategory} /> <div ref={productsSectionRef} className="flex justify-between items-center mb-6"> <h1 className="text-2xl font-bold text-gray-900">Productos Populares</h1> <SortDropdown currentSort={sortOption} onSortChange={setSortOption} /> </div> {mainGrid} </> );
    }
    
    // ... (resto de las vistas)
    if (currentView === 'home' && selectedCategory) {
      return ( <CategoryProductsView categoryName={currentCategoryName} products={processedProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} onProductClick={handleProductClick} currentSort={sortOption} onSortChange={setSortOption} onNavigateHome={handleNavigateHome} /> );
    }
    if (currentView === 'categories') {
      return ( <CategoriesView categories={categories} onCategorySelect={(slug) => { setCurrentView('home'); setSelectedCategory(slug); }} /> );
    }
    if (currentView === 'favorites') {
      return ( <> <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Favoritos</h1> {favoriteProducts.length > 0 ? ( <ProductGrid products={favoriteProducts} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} onProductClick={handleProductClick} /> ) : ( <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm"> <Frown className="mx-auto h-12 w-12 text-gray-400" /> <h3 className="mt-2 text-lg font-medium text-gray-900">Aún no tienes favoritos</h3> <p className="mt-1 text-sm text-gray-500">Haz clic en el corazón de un producto para guardarlo aquí.</p> </div> )} </> );
    }

    return <div>Vista no implementada</div>;
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          currentView={currentView} 
          onNavigate={handleNavigate} 
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
                {renderMainContent()}
            </div>
          </main>
        </div>
        <BackToTopButton/>
      </div>
    </div>
  );
}

