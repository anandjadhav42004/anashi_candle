import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, QrCode, Truck, CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'COD'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // In a real app, send to backend
  };

  const handlePlaceOrder = () => {
    // Generate WhatsApp message
    const itemsText = cart.map(item => `${item.quantity}x ${item.name} (${item.selectedColor || 'Default'})`).join(', ');
    const message = `Hi! I want to place an order.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nItems: ${itemsText}\nTotal: ₹${totalPrice}\nPayment: ${formData.payment}`;
    
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
    
    setStep(3);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl mb-4">Your cart is empty</h1>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-light-brown/70">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-soft-pink/50"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-light-brown/70">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-soft-pink/50"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-light-brown/70">Hostel / Address</label>
                  <textarea
                    required
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-6 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-soft-pink/50 resize-none"
                    placeholder="Enter your hostel name & room number"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Continue to Payment
                </button>
              </form>

              <div className="bg-white p-8 rounded-3xl shadow-sm h-fit">
                <h3 className="font-serif font-bold text-xl mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-light-brown/60">{item.quantity}x {item.name}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-light-brown/10 pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <button onClick={() => setStep(1)} className="flex items-center space-x-2 text-sm mb-8">
              <ArrowLeft size={16} />
              <span>Back to Details</span>
            </button>
            <h1 className="text-4xl font-serif font-bold mb-8">Payment Method</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <button
                onClick={() => setFormData({ ...formData, payment: 'COD' })}
                className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center text-center ${
                  formData.payment === 'COD' ? 'border-light-brown bg-white shadow-md' : 'border-transparent bg-white/50'
                }`}
              >
                <Truck size={32} className="mb-4" />
                <h3 className="font-bold mb-2">Cash on Delivery</h3>
                <p className="text-xs text-light-brown/50">Pay when you receive your candles</p>
              </button>

              <button
                onClick={() => setFormData({ ...formData, payment: 'UPI' })}
                className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center text-center ${
                  formData.payment === 'UPI' ? 'border-light-brown bg-white shadow-md' : 'border-transparent bg-white/50'
                }`}
              >
                <QrCode size={32} className="mb-4" />
                <h3 className="font-bold mb-2">UPI / QR Code</h3>
                <p className="text-xs text-light-brown/50">Scan and pay instantly</p>
              </button>
            </div>

            {formData.payment === 'UPI' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 text-center">
                <p className="text-sm mb-6 font-bold">Scan to Pay ₹{totalPrice}</p>
                <div className="w-48 h-48 bg-cream mx-auto mb-6 flex items-center justify-center rounded-2xl border-2 border-dashed border-light-brown/20">
                  <QrCode size={100} className="text-light-brown/20" />
                  <span className="absolute text-[10px] uppercase tracking-widest text-light-brown/40">QR Code Placeholder</span>
                </div>
                <p className="text-xs text-light-brown/50 italic">Please take a screenshot after payment</p>
              </div>
            )}

            <button onClick={handlePlaceOrder} className="btn-primary w-full py-5 text-lg">
              Place Order via WhatsApp
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">Order Placed!</h1>
            <p className="text-light-brown/60 mb-12 max-w-md mx-auto">
              Thank you for choosing ANASHI. We've sent your order details to WhatsApp. We'll contact you soon for confirmation!
            </p>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
