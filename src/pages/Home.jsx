import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { useApp } from '../contexts/AppContext';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products, productsLoading, productsError } = useApp();

  const heroSlides = [
  {
    id: 1,
    title: "Trending Products",
    subtitle: "Handpicked Favorites",
    description: "Explore the most popular products that everyone’s talking about. Don’t miss out on these hot picks!",
    image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Discover Now",
    link: "/category/trending"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh & Trendy",
    description: "Step into the future with our latest and greatest products. Style meets innovation!",
    image: "https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Explore",
    link: "/category/fashion"
  },
  {
    id: 3,
    title: "Premium Quality",
    subtitle: "Best Brands",
    description: "Indulge in excellence with premium products from top-rated brands. Because you deserve the best.",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Browse",
    link: "/category/beauty"
  }
];


  const watches = products ? products.filter((product) => product.category === "watches") : [];
  const shoes = products ? products.filter((product) => product.category === "shoes") : [];
  const clothes = products ? products.filter((product) => product.category === "clothes") : [];


  const trendingProducts = products
    ? [...products].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 8)
    : [];
  const newProducts = products
    ? [...products].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 8)
    : [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing products...</p>
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
      {/* Hero Section */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 animate-slide-up">
                  {slide.title}
                </h1>
                <p className="text-xl lg:text-2xl mb-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  {slide.description}
                </p>

              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Discover our wide range of products across different categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.slice(1).map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3 group-hover:animate-bounce-gentle">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 text-center">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      {
        watches.length !== 0 ? <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">Trending Watches</h2>
              </div>
              <Link
                to="/search?trending=true"
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {watches.slice(0, 8).map((product, index) => (
                <div
                  key={product._id || product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} showQuickView={true} />
                </div>
              ))}
            </div>
          </div>
        </section> : <div></div>
      }

      {
        clothes.length !== 0 ? <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">Trending Clothes</h2>
              </div>
              <Link
                to="/search?trending=true"
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clothes.slice(0, 8).map((product, index) => (
                <div
                  key={product._id || product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} showQuickView={true} />
                </div>
              ))}
            </div>
          </div>
        </section> : <div></div>
      }

      {
        shoes.length !== 0 ? <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">Trending Shoes</h2>
              </div>
              <Link
                to="/search?trending=true"
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shoes.slice(0, 8).map((product, index) => (
                <div
                  key={product._id || product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} showQuickView={true} />
                </div>
              ))}
            </div>
          </div>
        </section> : <div></div>
      }
    </div>
  );
}