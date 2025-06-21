// Sample product data - in a real app, this would come from an API
export const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    brand: 'TechSound',
    rating: 4.5,
    reviews: 1234,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Noise Cancellation': 'Active',
      'Weight': '250g'
    },
    features: ['Noise Cancellation', 'Wireless', 'Long Battery Life', 'Comfortable Fit'],
    inStock: true,
    isNew: true,
    isTrending: true
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1701373/pexels-photo-1701373.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    brand: 'FitTech',
    rating: 4.3,
    reviews: 856,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': '50m',
      'Sensors': 'Heart Rate, GPS, Accelerometer'
    },
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Sleep Tracking'],
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: 3,
    name: 'Professional Camera Lens',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/414781/pexels-photo-414781.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    brand: 'ProLens',
    rating: 4.8,
    reviews: 432,
    description: '85mm f/1.4 professional portrait lens with optical stabilization.',
    specifications: {
      'Focal Length': '85mm',
      'Aperture': 'f/1.4',
      'Stabilization': 'Optical',
      'Mount': 'Canon EF/Sony E'
    },
    features: ['Professional Quality', 'Image Stabilization', 'Fast Aperture', 'Sharp Images'],
    inStock: true,
    isNew: false,
    isTrending: false
  },
  {
    id: 4,
    name: 'Casual Summer Dress',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'fashion',
    brand: 'StyleCo',
    rating: 4.2,
    reviews: 267,
    description: 'Lightweight and comfortable summer dress perfect for casual outings.',
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Care': 'Machine Washable',
      'Sizes': 'XS-XL'
    },
    features: ['Breathable Fabric', 'Comfortable Fit', 'Easy Care', 'Versatile Style'],
    inStock: true,
    isNew: true,
    isTrending: false
  },
  {
    id: 5,
    name: 'Gaming Mechanical Keyboard',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    brand: 'GameTech',
    rating: 4.6,
    reviews: 789,
    description: 'RGB mechanical keyboard with customizable switches and lighting.',
    specifications: {
      'Switch Type': 'Cherry MX Blue',
      'Backlighting': 'RGB',
      'Connectivity': 'USB-C',
      'Layout': 'Full Size'
    },
    features: ['Mechanical Switches', 'RGB Lighting', 'Programmable Keys', 'Durable Build'],
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: 6,
    name: 'Organic Skincare Set',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'beauty',
    brand: 'NaturalGlow',
    rating: 4.4,
    reviews: 543,
    description: 'Complete organic skincare routine for healthy, glowing skin.',
    specifications: {
      'Ingredients': '100% Organic',
      'Skin Type': 'All Types',
      'Packaging': 'Eco-Friendly',
      'Set Includes': 'Cleanser, Toner, Moisturizer, Serum'
    },
    features: ['Organic Ingredients', 'All Skin Types', 'Eco-Friendly', 'Complete Routine'],
    inStock: true,
    isNew: true,
    isTrending: false
  },
  {
    id: 7,
    name: 'Premium Coffee Beans',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2061127/pexels-photo-2061127.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'food',
    brand: 'RoastMaster',
    rating: 4.7,
    reviews: 1156,
    description: 'Single-origin premium coffee beans with rich, complex flavor profile.',
    specifications: {
      'Origin': 'Ethiopian Highlands',
      'Roast Level': 'Medium',
      'Weight': '500g',
      'Grind': 'Whole Beans'
    },
    features: ['Single Origin', 'Freshly Roasted', 'Premium Quality', 'Rich Flavor'],
    inStock: true,
    isNew: false,
    isTrending: true
  },
  {
    id: 8,
    name: 'Wireless Charging Pad',
    price: 39.99,
    originalPrice: 49.99,
    image: 'https://images.pexels.com/photos/4316/smartphone-technology-phone-mobile.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4316/smartphone-technology-phone-mobile.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/163065/mobile-phone-android-apps-phone-163065.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'electronics',
    brand: 'ChargeTech',
    rating: 4.1,
    reviews: 324,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    specifications: {
      'Charging Speed': '15W Fast Charge',
      'Compatibility': 'Qi-Enabled Devices',
      'LED Indicator': 'Yes',
      'Safety Features': 'Overheat Protection'
    },
    features: ['Fast Charging', 'Universal Compatibility', 'LED Indicator', 'Safe Charging'],
    inStock: true,
    isNew: false,
    isTrending: false
  }
];

export const categories = [
  { id: 'all', name: 'All Categories', icon: '🛍️' },
  { id: 'clothes', name: 'Clothes', icon: '👕' },
  { id: 'shoes', name: 'Shoes', icon: '👟' },
  { id: 'watches', name: 'Watches', icon: '⌚️' },  
];

export const brands = [
  'TechSound', 'FitTech', 'ProLens', 'StyleCo', 'GameTech', 
  'NaturalGlow', 'RoastMaster', 'ChargeTech'
];

export const getTrendingProducts = () => products.filter(p => p.isTrending);
export const getNewProducts = () => products.filter(p => p.isNew);
export const getProductsByCategory = (category) => 
  category === 'all' ? products : products.filter(p => p.category === category);
export const getRelatedProducts = (productId, category) => 
  products.filter(p => p.id !== productId && p.category === category).slice(0, 4);