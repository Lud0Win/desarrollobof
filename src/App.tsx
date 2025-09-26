// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Search, Star, ShoppingCart, TrendingUp, Award, Clock, Package } from 'lucide-react';

interface Store {
  name: string;
  price: number;
  delivery: string;
  best: boolean;
}

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  ratings: number;
  reviews: number;
  stores: Store[];
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data for demonstration (replace with your API call)
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      image: "https://placehold.co/300x200/1e40af/white?text=iPhone+15+Pro",
      category: "electronica",
      ratings: 4.8,
      reviews: 1247,
      stores: [
        { name: "Amazon", price: 999, delivery: "2 días", best: true },
        { name: "Mercado Libre", price: 1049, delivery: "3 días", best: false },
        { name: "Liverpool", price: 1099, delivery: "1 día", best: false }
      ]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      image: "https://placehold.co/300x200/7c3aed/white?text=Galaxy+S24",
      category: "electronica",
      ratings: 4.6,
      reviews: 892,
      stores: [
        { name: "Samsung", price: 899, delivery: "1 día", best: true },
        { name: "Amazon", price: 929, delivery: "2 días", best: false },
        { name: "Walmart", price: 949, delivery: "4 días", best: false }
      ]
    },
    {
      id: 3,
      name: "MacBook Air M2",
      image: "https://placehold.co/300x200/059669/white?text=MacBook+Air",
      category: "computacion",
      ratings: 4.9,
      reviews: 2156,
      stores: [
        { name: "Apple", price: 1199, delivery: "1 día", best: true },
        { name: "Best Buy", price: 1249, delivery: "2 días", best: false },
        { name: "Amazon", price: 1199, delivery: "3 días", best: false }
      ]
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      image: "https://placehold.co/300x200/dc2626/white?text=AirPods+Pro",
      category: "audio",
      ratings: 4.7,
      reviews: 3421,
      stores: [
        { name: "Apple", price: 249, delivery: "1 día", best: false },
        { name: "Amazon", price: 229, delivery: "2 días", best: true },
        { name: "Costco", price: 239, delivery: "5 días", best: false }
      ]
    },
    {
      id: 5,
      name: "PlayStation 5",
      image: "https://placehold.co/300x200/0891b2/white?text=PS5",
      category: "gaming",
      ratings: 4.8,
      reviews: 1876,
      stores: [
        { name: "GameStop", price: 499, delivery: "2 días", best: true },
        { name: "Amazon", price: 519, delivery: "3 días", best: false },
        { name: "Walmart", price: 499, delivery: "7 días", best: false }
      ]
    },
    {
      id: 6,
      name: "Nike Air Max",
      image: "https://placehold.co/300x200/be185d/white?text=Nike+Air+Max",
      category: "ropa",
      ratings: 4.5,
      reviews: 943,
      stores: [
        { name: "Nike", price: 129, delivery: "3 días", best: false },
        { name: "Foot Locker", price: 119, delivery: "2 días", best: true },
        { name: "Amazon", price: 124, delivery: "1 día", best: false }
      ]
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos', icon: Package },
    { id: 'electronica', name: 'Electrónica', icon: TrendingUp },
    { id: 'computacion', name: 'Computación', icon: Award },
    { id: 'audio', name: 'Audio', icon: Clock },
    { id: 'gaming', name: 'Gaming', icon: Star },
    { id: 'ropa', name: 'Ropa', icon: ShoppingCart }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const bestPrice = Math.min(...product.stores.map(store => store.price));
    const bestStore = product.stores.find(store => store.price === bestPrice);
    
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            Mejor precio
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.ratings) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
          </div>
          
          <div className="mb-4">
            <div className="text-2xl font-bold text-green-600 mb-2">
              ${bestPrice.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">en {bestStore?.name}</div>
          </div>
          
          <div className="space-y-2">
            {product.stores.map((store, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center p-2 rounded-lg ${
                  store.best ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs font-bold text-gray-600">
                      {store.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-sm">{store.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${store.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{store.delivery} días</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PriceCompare
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Inicio</a>
              <a href="#" className="text-gray-500 hover:text-blue-600">Categorías</a>
              <a href="#" className="text-gray-500 hover:text-blue-600">Acerca de</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Encuentra los <span className="text-blue-600">mejores precios</span> en todos los productos
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compara precios en tiempo real de múltiples tiendas y ahorra en tu próxima compra
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text",
                placeholder="Busca productos, marcas o categorías...",
                value={searchTerm},
                onChange={(e) => setSearchTerm(e.target.value)},
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id},
                  onClick={() => setSelectedCategory(category.id)},
                  className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-600">Intenta con diferentes términos de búsqueda o categoría</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">PriceCompare</h3>
            <p className="text-gray-400 mb-6">Tu aliado para encontrar los mejores precios</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
