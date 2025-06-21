import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const generateInvoice = () => {
    if (!order) return;
    const doc = new jsPDF();

    // Company Info
    const company = {
      name: "ShopEase",
      address: "Kokni Pada Kurar Village, Malad East, Mumbai 400097",
      phone: "+91 9045193002 / +91 7977133658",
      email: "talhamalik4311@gmail.com / 27imranshaikh05@gmail.com",
    };

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(company.name, 20, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(company.address, 20, 28);
    doc.text(`Phone: ${company.phone}`, 20, 33);
    doc.text(`Email: ${company.email}`, 20, 38);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("INVOICE", 180, 20, { align: 'right' });

    // Invoice Details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice #: ${order._id || order.id}`, 180, 35, { align: 'right' });
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 180, 40, { align: 'right' });

    // Shipping To
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Bill To:", 20, 60);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(order.shippingAddress.name, 20, 66);
    doc.text(order.shippingAddress.address, 20, 71);
    doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`, 20, 76);
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
        `₹${(item.price * item.quantity).toFixed(2)}`
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
    const tax = 0;
    const shipping = subtotal > 50 ? 0 : 9.99;
    
    doc.setFontSize(12);
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 180, finalY + 10, { align: 'right' });
    doc.text(`Tax: ₹${tax.toFixed(2)}`, 180, finalY + 17, { align: 'right' });
    doc.text(`Shipping: Free}`, 180, finalY + 24, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${order.total.toFixed(2)}`, 180, finalY + 31, { align: 'right' });

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, finalY + 50, { align: 'center' });

    doc.save(`invoice-${order._id || order.id}.pdf`);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 my-14">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Order Found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 my-14">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
        <div className="text-center mb-8">
          <svg className="mx-auto mb-4 h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h2>
          <p className="text-gray-600">Your order has been placed successfully.</p>
        </div>
        
        {/* Important Notification */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md">
          <p className="font-bold">Important Notice</p>
          <p>To continue communicating with us, kindly download your invoice right away. After a few hours, order data will no longer be visible on this page. If you have any questions about your order, get in touch with us; the invoice will include our contact information.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Summary</h3>
          <div className="text-sm text-gray-700 mb-2">
            <div><span className="font-medium">Order ID:</span> {order._id || order.id}</div>
            <div><span className="font-medium">Date:</span> {order.date ? new Date(order.date).toLocaleString() : '-'}</div>
            <div><span className="font-medium">Status:</span> {order.status}</div>
          </div>
          <div className="mb-2">
            <span className="font-medium">Shipping Address:</span>
            <div className="ml-2 text-gray-600">
              <div>{order.shippingAddress?.name}</div>
              <div>{order.shippingAddress?.address}</div>
              <div>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</div>
              <div>{order.shippingAddress?.phone}</div>
            </div>
          </div>
          <div className="mb-2">
            <span className="font-medium">Total:</span> ₹{order.total?.toFixed(2)}
          </div>
        </div>
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Items</h4>
          <ul className="divide-y">
            {order.items?.map((item, idx) => (
              <li key={item.id || idx} className="py-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Return to Home
          </button>
          <button
            onClick={generateInvoice}
            className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
} 