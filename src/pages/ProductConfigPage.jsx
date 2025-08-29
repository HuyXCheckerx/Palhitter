import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { allServicesFlat } from '@/data/servicesData.js';

const ProductConfigPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();

    const [selectedOptions, setSelectedOptions] = useState({
    hitter: false,
    proxyless: false,
    cookies_capture: false,
  });

    const product = allServicesFlat.find(p => p.id === productId);

  const optionsConfig = {
    hitter: { name: 'Hitter', price: 50 },
    proxyless: { name: 'Proxyless', price: 30 },
    cookies_capture: { name: 'Cookies Capture', price: 20 },
  };

  const calculateTotalPrice = () => {
    let total = product.numericPrice;
    if (selectedOptions.hitter) total += optionsConfig.hitter.price;
    if (selectedOptions.proxyless) total += optionsConfig.proxyless.price;
    if (selectedOptions.cookies_capture) total += optionsConfig.cookies_capture.price;
    return total;
  };

  const totalPrice = calculateTotalPrice();

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>;
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedOptions,
      totalPrice: totalPrice,
      cartId: `${product.id}-${Object.values(selectedOptions).join('-')}`
    };

    addToCart(cartItem);
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added.`
    });
    
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold uppercase text-glow-cyan mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-300 text-lg">
                  {product.description}
                </p>
              </div>
              
              <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-6xl text-cyan-400">
                  {product.icon}
                </div>
              </div>
            </div>

            <div className="space-y-8">
                <h2 className="text-2xl font-bold uppercase text-white mb-6">
                  Configure Your Product
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(optionsConfig).map(([key, option]) => (
                    <div key={key} className={`flex justify-between items-center p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedOptions[key] ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-600 hover:border-cyan-400/50'}`}>
                      <div>
                        <h4 className="font-bold text-white">{option.name}</h4>
                        <p className="text-sm text-gray-400">Adds the {option.name} feature.</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-cyan-400 font-bold">+${option.price.toFixed(2)}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={selectedOptions[key]}
                            onChange={() => handleOptionToggle(key)}
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-400/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-6">
                        ${totalPrice.toFixed(2)}
                    </div>
                    <Button
                        className="w-full uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold py-4 text-lg"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        ADD TO CART
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductConfigPage;
