import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  // Only show trending products
  

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.id === (product._id || product.id));
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product._id || product.id,
        name: product.name,
        brand: product.brand,
        image: product.imageUrls ? product.imageUrls[0] : product.image,
        price: product.price,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl max-w-xs mx-auto flex flex-col">
      <div className="relative w-full aspect-[4/5] bg-gray-100 group">
        <Link to={`/product/${product._id || product.id}`} className="block w-full h-full">
          <img
            src={product.imageUrls ? product.imageUrls[0] : product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
            {product.isTrending && (
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">TRENDING</span>
            )}
            {product.isNew && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">NEW</span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">-{discountPercentage}%</span>
            )}
          </div>
          {/* Add to Cart Button (hover) */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-primary-600 text-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary-700 z-20"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </Link>
      </div>
      {/* Product Info below image */}
      <div className="flex flex-col items-start px-4 pt-3 pb-4">
        <Link to={`/product/${product._id || product.id}`} className="block w-full">
          <h3 className="text-base font-semibold text-gray-900 mb-1 truncate" title={product.name}>{product.name}</h3>
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-primary-700">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}