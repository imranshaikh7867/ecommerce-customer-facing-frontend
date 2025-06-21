import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const { products, productsLoading, productsError } = useApp();
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!products) return;
    let filtered = [...products];
    if (query) {
      filtered = filtered.filter(product =>
        (product.name && product.name.toLowerCase().includes(query.toLowerCase())) ||
        (typeof product.category === 'string' && product.category.toLowerCase().includes(query.toLowerCase())) ||
        (typeof product.category === 'object' && product.category?.name?.toLowerCase().includes(query.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(query.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [query, products]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{productsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `Search results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ml-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
            <p className="text-gray-500">Try a different search term.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedProducts.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${currentPage === page ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}