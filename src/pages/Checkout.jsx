import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, MapPin, ArrowLeft } from 'lucide-react';
import myQR from '../assets/myQR.jpeg';
import talhaQR from '../assets/talhaQR.jpeg';
import { customer_backend_url } from '../constants/constant';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    if (storedCart.length === 0) {
      navigate('/cart');
    }
  }, [navigate]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = 0.00;
  const shipping = subtotal > 0 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Shipping validation
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    // Payment validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    const order = {
      items: cart,
      total,
      shippingAddress: {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone,
      },
    };

    try {
      const res = await fetch(`${customer_backend_url}/api/v1/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to place order');
      }
      const data = await res.json();

      // Save order to localStorage
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      savedOrders.push(data.data);
      localStorage.setItem('orders', JSON.stringify(savedOrders));

      localStorage.removeItem('cart');
      navigate('/order-confirmation', { state: { order: data.data } });
    } catch (err) {
      setErrors({ submit: err.message || 'An unexpected error occurred.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return null; // Redirecting in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Shipping & Payment */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 space-y-8">
            {/* Shipping Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
                <Truck className="h-6 w-6 mr-2" />
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.address ? 'border-red-300' : 'border-gray-300'}`} />
                  {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.city ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.state ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className={`w-full px-3 py-2 border rounded-lg ${errors.zipCode ? 'border-red-300' : 'border-gray-300'}`} />
                    {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
                <CreditCard className="h-6 w-6 mr-2" />
                Payment Information
              </h2>
              <div className="space-y-4">
                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg">
                    <p className="text-gray-600 mb-4">
                      Please scan one of the QR codes below to complete your payment.
                      After payment, click "Place Order".
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-center p-4 border rounded-lg">
                        <img src={myQR} alt="Imran's QR" className="w-40 h-40 cursor-pointer" onClick={() => { setSelectedQR(myQR); setZoom(1); }} />
                        <div className='mx-10'>
                          <p className="mt-2 text-sm font-medium text-gray-700">Imran Shaikh</p>
                          <p className="text-xs text-gray-500 font-mono">27imranshaikh05@oksbi</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 border rounded-lg">
                        <img src={talhaQR} alt="Talha's QR" className="w-40 h-40 cursor-pointer" onClick={() => { setSelectedQR(talhaQR); setZoom(1); }} />
                        <div className='mx-10'>
                          <p className="mt-2 text-sm font-medium text-gray-700">Talha Malik</p>
                          <p className="text-xs text-gray-500 font-mono">talhamalik4311-1@oksbi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium">₹{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Tax</span><span className="font-medium">₹{'0.00'}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2 mt-2"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              {errors.submit && <p className="text-red-600 text-sm mt-2 text-center">{errors.submit}</p>}
            </div>
          </div>
        </form>
      </div>
      {/* QR Code Modal */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedQR(null)}>
          <div className="relative p-4 bg-white rounded-lg" onClick={e => e.stopPropagation()}>
            <img src={selectedQR} alt="Enlarged QR Code" style={{ width: `${20 * zoom}rem`, height: `${20 * zoom}rem`, objectFit: 'contain' }} />
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="bg-gray-200 px-3 py-1 rounded text-lg font-bold">+</button>
              <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="bg-gray-200 px-3 py-1 rounded text-lg font-bold">-</button>
            </div>
            <button onClick={() => setSelectedQR(null)} className="absolute top-2 right-2 text-white bg-gray-600 rounded-full p-1 leading-none">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}