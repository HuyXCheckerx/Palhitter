import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import { allServicesFlat, serviceCategories } from '@/data/servicesData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, ShoppingCart, MessageSquare, Layers, Code } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';

const ServicesPage = ({ variants, transition }) => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');

  const serviceId = params.serviceId;
  const { toast } = useToast();
  const { addToCart } = useCart();

  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const service = allServicesFlat.find(s => s.id === serviceId);

  useEffect(() => {
    // Reset state when service changes
    setStep(1);
    setSelectedTier(null);
    setSelectedOption(null);
  }, [serviceId]);

  const handleAddToCart = () => {
    if (!service || !selectedTier || !selectedOption) return;

    const cartItem = {
      ...service,
      id: `${service.id}-${selectedTier.id}-${selectedOption.name.toLowerCase()}`,
      title: `${service.title} - ${selectedTier.name} (${selectedOption.name})`,
      price: `$${selectedOption.price.toFixed(2)}`,
      numericPrice: selectedOption.numericPrice,
      features: selectedTier.features,
      tierName: selectedTier.name,
      optionName: selectedOption.name,
    };

    addToCart(cartItem);
    toast({
      title: `${cartItem.title} Added to Cart!`,
      description: "Proceed to checkout or continue browsing.",
      variant: "default",
    });
  };

  const ProgressIndicator = () => (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-border -translate-y-1/2"></div>
        <div 
          className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>
        {[1, 2, 3].map(s => (
          <div key={s} className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-card border-2 border-border text-foreground/60'}`}>
              {step > s ? <CheckCircle size={18} /> : s}
            </div>
            <span className={`mt-2 text-xs font-orbitron-specific transition-colors duration-300 ${step >= s ? 'text-primary' : 'text-foreground/60'}`}>
              {s === 1 && 'TIER'}
              {s === 2 && 'PLAN'}
              {s === 3 && 'CONFIRM'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (serviceId) {
    if (!service) {
      return (
        <motion.div 
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-12"
          initial="initial" animate="in" exit="out" variants={variants} transition={transition}
        >
          <h1 className="text-4xl font-bold gradient-text mb-4 title-animate">Service Not Found</h1>
          <p className="text-foreground/80 mb-8 font-roboto-mono">The service you are looking for does not exist or has been moved.</p>
          <Link to="/services">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 font-orbitron-specific">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>
          </Link>
        </motion.div>
      );
    }
    
    const currentCategoryForBreadcrumb = serviceCategories.find(sc => sc.data.some(s => s.id === serviceId));

    return (
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40"
        initial="initial" animate="in" exit="out" variants={variants} transition={transition}
      >
        <div className="mb-10">
          <Link to={currentCategoryForBreadcrumb ? `/services?category=${currentCategoryForBreadcrumb.id}` : "/services"}>
            <Button variant="ghost" className="text-primary hover:bg-primary/10 font-orbitron-specific tracking-wider">
              <ArrowLeft className="mr-2.5 h-5 w-5" /> 
              {currentCategoryForBreadcrumb ? `BACK TO ${currentCategoryForBreadcrumb.title.toUpperCase()}` : 'ALL SERVICES'}
            </Button>
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Side: Image Gallery */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'circOut' }}>
            <div className="space-y-4 sticky top-32">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text tracking-tight title-animate">{service.title}</h1>
              <p className="text-md text-foreground/70 mb-6 font-roboto-mono leading-relaxed">{service.description}</p>
              <img src={service.image} alt={service.title} className="w-full h-auto object-cover rounded-xl shadow-xl aspect-video border border-border/40" />
              <img src={service.image2} alt={service.title} className="w-full h-auto object-cover rounded-xl shadow-xl aspect-video border border-border/40" />
              <img src={service.image3} alt={service.title} className="w-full h-auto object-cover rounded-xl shadow-xl aspect-video border border-border/40" />
            </div>
          </motion.div>

          {/* Right Side: Configuration Steps */}
          <motion.div className="lg:col-span-3 bg-card p-8 md:p-12 rounded-2xl shadow-2xl border border-border/60" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'circOut', delay: 0.15 }}>
            <ProgressIndicator />

            {/* Step 1: Select Tier */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-6 text-center">Step 1: Choose Your Tier</h2>
                <div className="space-y-5">
                  {service.tiers.map(tier => (
                    <div key={tier.id} onClick={() => { setSelectedTier(tier); setSelectedOption(tier.options[0]); setStep(2); }} className="p-6 border-2 border-border hover:border-primary rounded-lg cursor-pointer transition-all duration-300">
                      <h3 className="text-xl font-bold text-primary font-orbitron-specific">{tier.name}</h3>
                      <p className="text-foreground/80 mt-2 font-roboto-mono text-sm">{tier.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Plan */}
            {step === 2 && selectedTier && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-2 text-center">Step 2: Setup Your Plan</h2>
                <p className="text-center text-foreground/60 mb-8">You've selected the <span className="text-primary font-semibold">{selectedTier.name}</span> tier.</p>
                <div className="space-y-4 mb-8">
                  {selectedTier.options.map(option => (
                    <div key={option.name} onClick={() => setSelectedOption(option)} className={`p-5 border-2 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center ${selectedOption?.name === option.name ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/70'}`}>
                      <span className="text-lg font-semibold font-orbitron-specific">{option.name}</span>
                      <span className="text-2xl font-bold font-minecraft">${option.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="w-full py-6" onClick={() => setStep(3)}>Next: Confirm Selection</Button>
                <Button variant="ghost" className="w-full mt-3" onClick={() => setStep(1)}>Back to Tiers</Button>
              </motion.div>
            )}

            {/* Step 3: Confirm & Add to Cart */}
            {step === 3 && selectedTier && selectedOption && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold mb-6 text-center">Step 3: Review & Proceed</h2>
                <div className="bg-background/50 p-6 rounded-lg border border-border mb-8 space-y-5">
                  <div>
                    <h4 className="text-sm text-foreground/60 font-orbitron-specific">TIER</h4>
                    <p className="text-xl font-semibold text-primary">{selectedTier.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-foreground/60 font-orbitron-specific">PLAN</h4>
                    <p className="text-xl font-semibold text-primary">{selectedOption.name}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm text-foreground/60 font-orbitron-specific">TOTAL PRICE</h4>
                    <p className={`text-4xl font-bold bg-gradient-to-r ${service.gradient || 'from-primary to-accent'} bg-clip-text text-transparent font-minecraft`}>${selectedOption.price.toFixed(2)}</p>
                  </div>
                </div>
                <Button size="lg" className="w-full py-7 text-lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-3" size={22} /> Add to Cart & Proceed
                </Button>
                <Button variant="ghost" className="w-full mt-3" onClick={() => setStep(2)}>Back to Plans</Button>
              </motion.div>
            )}

          </motion.div>
        </div>
      </motion.div>
    );
  }
  
  // Logic for displaying all services (unchanged)
  const currentCategory = serviceCategories.find(cat => cat.id === categoryId);
  const displayData = currentCategory ? currentCategory.data : allServicesFlat;
  const displayTitle = currentCategory ? currentCategory.title : "All Services & Tools";
  const DisplayIcon = currentCategory ? currentCategory.icon : Layers;
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="pt-20"
    >
      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'circOut' }}
            viewport={{ once: true }}
          >
            {DisplayIcon && <DisplayIcon size={48} className="mx-auto mb-4 text-primary" />}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text tracking-tight title-animate">{displayTitle}</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-roboto-mono">
              {currentCategory ? currentCategory.summary : "Explore our full arsenal of professional-grade digital solutions."}
            </p>
            {categoryId && (
              <div className="mt-6">
                <Link to="/services">
                  <Button variant="ghost" className="text-primary hover:bg-primary/10 font-orbitron-specific text-sm">
                    <ArrowLeft className="mr-2 h-4 w-4" /> View All Categories
                  </Button>
                </Link>
              </div>
            )}
            {!categoryId && serviceCategories.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {serviceCategories.map(cat => (
                  <Link key={cat.id} to={`/services?category=${cat.id}`}>
                    <Button variant="outline" className="text-sm border-primary/60 text-primary/90 hover:bg-primary/10 hover:text-primary hover:border-primary font-orbitron-specific">
                      {cat.icon && <cat.icon size={16} className="mr-2" />}
                      {cat.title}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {displayData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayData.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: 'circOut' }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <ServiceCard service={service} onAddToCart={handleAddToCart} />
                </motion.div>
              ))}
            </div>
          ) : (
             <p className="text-center text-xl text-foreground/60 font-roboto-mono py-10">
                No services found in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;