import { useState, useEffect } from 'react';
import { User, MapPin, Package, Settings, Heart, CreditCard, Bell, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

export default function Profile() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const generateInvoice = (order) => {
    if (!order) return;
    const doc = new jsPDF();

    // Embed a font that supports the rupee symbol
    doc.setFont("helvetica", "normal"); // Ensure the font supports Unicode

    // Company Info
    const company = {
      name: "ShopEase",
      address: "Kokni Pada Kurar Village, Malad East, Mumbai 400097",
      phone: "+91 9045193002 / +91 7977133658",
      email: "talhamalik4311@gmail.com / 27imranshaikh05@gmail.com",
    };

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(company.name, 20, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(company.address, 20, 28);
    doc.text(`Phone: ${company.phone}`, 20, 33);
    doc.text(`Email: ${company.email}`, 20, 38);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 180, 20, { align: "right" });

    // Invoice Details
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${order._id || order.id}`, 180, 35, { align: "right" });
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 180, 40, { align: "right" });

    // Shipping To
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 20, 60);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(order.shippingAddress.name, 20, 66);
    doc.text(order.shippingAddress.address, 20, 71);
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`,
      20,
      76
    );
    doc.text(order.shippingAddress.phone, 20, 81);

    // Items Table
    const tableColumn = ["#", "Item", "Qty", "Unit Price", "Total"];
    const tableRows = [];
    order.items.forEach((item, index) => {
      const itemData = [
        index + 1,
        item.name,
        item.quantity,
        `₹${item.price.toFixed(2)}`,
        `₹${(item.price * item.quantity).toFixed(2)}`,
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      startY: 95,
      head: [tableColumn],
      body: tableRows,
    });

    // Totals
    const finalY = doc.lastAutoTable.finalY;
    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = 0.00;
    const shipping = subtotal > 50 ? 0 : 9.99;

    doc.setFontSize(12);
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 180, finalY + 10, { align: "right" });
    doc.text(`Tax : ₹${tax.toFixed(2)}`, 180, finalY + 17, { align: "right" });
    doc.text(`Shipping: ₹${shipping.toFixed(2)}`, 180, finalY + 24, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ₹${order.total.toFixed(2)}`, 180, finalY + 31, { align: "right" });

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, finalY + 50, { align: "center" });

    doc.save(`invoice-${order._id || order.id}.pdf`);
  };

  const tabs = [
    // { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated:', state.profileData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {state.profileData.firstName} {state.profileData.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{state.profileData.email}</p>
                </div>
              </div> */}

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                    {tab.id === 'wishlist' && state.wishlist.length > 0 && (
                      <span className="ml-auto bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                        {state.wishlist.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id || order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-medium text-gray-900">Order #{order._id || order.id}</h3>
                              <p className="text-sm text-gray-600">
                                {order.date ? new Date(order.date).toLocaleDateString() : '-'}
                              </p>
                            </div>
                            <div className="text-right">

                              <p className="text-lg font-semibold text-gray-900 mt-1">
                                ₹{order.total?.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items?.map((item, idx) => (
                              <div key={item.id || idx} className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <div></div>
                            <button
                              onClick={() => generateInvoice(order)}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              Download Invoice
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600">Start shopping to see your orders here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}