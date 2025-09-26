
// Mockup de productos
const mockProducts = [
  {
    id: 1,
    name: 'Smartphone X',
    image: 'https://via.placeholder.com/300x200?text=Smartphone',
    price: 699.99,
    discount: 15,
  },
  {
    id: 2,
    name: 'Auriculares Bluetooth',
    image: 'https://via.placeholder.com/300x200?text=Auriculares',
    price: 89.99,
    discount: 0,
  },
  {
    id: 3,
    name: 'Reloj Inteligente',
    image: 'https://via.placeholder.com/300x200?text=Reloj',
    price: 199.99,
    discount: 20,
  },
  {
    id: 4,
    name: 'Tablet Pro',
    image: 'https://via.placeholder.com/300x200?text=Tablet',
    price: 399.99,
    discount: 10,
  },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Barra de búsqueda */}
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Tienda Online</h1>
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Menú lateral */}
        <aside
          className={`fixed md:static z-20 h-full bg-white shadow-lg w-64 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <button
              className="md:hidden absolute top-4 right-4 text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="mt-8 space-y-4">
              <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">Inicio</a></li>
              <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">Categorías</a></li>
              <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">Favoritos</a></li>
              <li><a href="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded">Mi Cuenta</a></li>
            </ul>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => alert(`Producto: ${product.name}`)} // Aquí iría la navegación
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${(product.price * 100 / (100 - product.discount)).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
