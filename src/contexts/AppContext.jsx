import { createContext, useContext, useState, useEffect } from 'react';
import { backend_url } from '../constants/constant';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const res = await fetch(`${backend_url}/api/v1/product/`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      setProductsError(err.message || 'Error fetching products');
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider value={{ products, productsLoading, productsError, fetchProducts }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}