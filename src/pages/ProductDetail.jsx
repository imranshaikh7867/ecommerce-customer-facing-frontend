import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Minus, Plus, ZoomIn, PlayCircle, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, productsLoading, productsError } = useApp();
  const [product, setProduct] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Specification');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const foundProduct = products.find(p => (p._id || p.id) === id || String(p._id || p.id) === id);
      setProduct(foundProduct);
      if (foundProduct) {
        setSelectedMediaIndex(0);
      }
      if (!foundProduct && !productsLoading) {
        navigate('/');
      }
    }
  }, [id, products, productsLoading, navigate]);

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const media = (product.imageUrls || [product.image]).map(url => ({ type: 'image', url }));
  if (product.videoUrl) {
    media.push({ type: 'video', url: product.videoUrl, thumbnailUrl: product.imageUrls ? product.imageUrls[0] : product.image });
  }

  const discountPercentage = product.price
    ? Math.round(((product.price - product.originalPrice) / product.price) * 100)
    : 0;

  // Related products: filter by same category, exclude self
  const relatedProducts = products
    ? products.filter(p => (p.category === product.category || p.category?.id === product.category) && (p._id || p.id) !== (product._id || product.id)).slice(0, 4)
    : [];

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 capitalize">{product.category?.name || product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg relative group">
              {media[selectedMediaIndex].type === 'image' ? (
                <img
                  src={media[selectedMediaIndex].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media[selectedMediaIndex].url}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                />
              )}
              {media[selectedMediaIndex].type === 'image' && (
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute top-4 right-4 bg-black bg-opacity-40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Zoom in on image"
                >
                  <ZoomIn className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {media.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMediaIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedMediaIndex === index ? 'border-primary-600' : 'border-gray-200'
                    }`}
                >
                  <img
                    src={item.type === 'image' ? item.url : item.thumbnailUrl}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.brand}</p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    Save ₹{(product.price - product.originalPrice).toFixed(2)} ({discountPercentage}%)
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    // if (!product.inStock) return;
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const existingIndex = cart.findIndex(item => item.id === (product._id || product.id));
                    if (existingIndex !== -1) {
                      cart[existingIndex].quantity += quantity;
                    } else {
                      cart.push({
                        id: product._id || product.id,
                        name: product.name,
                        brand: product.brand,
                        image: product.imageUrls ? product.imageUrls[0] : product.image,
                        price: product.price,
                        quantity: quantity,
                      });
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert('Added to cart!');
                  }}
                  className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    // product.inStock
                    //   ? 'bg-primary-600 text-white hover:bg-primary-700'
                    //   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                // disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {/* {product.inStock ?  : 'Out of Stock'} */}
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <Truck className="h-5 w-5 mr-3 text-primary-600" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <RotateCcw className="h-5 w-5 mr-3 text-primary-600" />
                <span>7-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b">
            <nav className="flex space-x-8">
              {['Specification'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'Specification' && (
              <ul className="space-y-1">

                {product.specifications.map((feature, index) => (
                  <li key={index} className="text-gray-700">• {feature}</li>
                ))}

              </ul>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id || relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            {media[selectedMediaIndex].type === 'image' ? (
              <img
                src={media[selectedMediaIndex].url}
                alt={product.name}
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <video
                src={media[selectedMediaIndex].url}
                className="max-w-full max-h-[90vh]"
                controls
                autoPlay
                loop
              />
            )}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-2 -right-2 sm:top-4 sm:right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}