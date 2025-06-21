import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, List } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { categoryId } = useParams();
  const { products, productsLoading, productsError } = useApp();
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const category = categories.find(cat => cat.id === categoryId);

  // Filter products by category
  const categoryProducts = products && Array.isArray(products)
    ? products.filter(
        (product) => product.category === categoryId || product.category?.id === categoryId
      )
    : [];

  // Pagination
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = categoryProducts.slice(startIndex, startIndex + productsPerPage);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }
  if (productsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          </div>
          <p className="text-gray-600">
            {categoryProducts.length} products found
          </p>
        </div>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {paginatedProducts.map((product, index) => (
              <div
                key={product._id || product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} showQuickView={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products found in this category.</p>
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 3 ||
                  page === currentPage + 3
                ) {
                  return <span key={page} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}