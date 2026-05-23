import React, { useState } from 'react';
import { ShoppingBag, Heart, X, AlertCircle, ShoppingCart, Send } from 'lucide-react';
import { MerchItem } from '../data/initialData';

interface MerchStoreProps {
  merch: MerchItem[];
  cart: { item: MerchItem; size: string; quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ item: MerchItem; size: string; quantity: number }[]>>;
  wishlist: MerchItem[];
  setWishlist: React.Dispatch<React.SetStateAction<MerchItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export const MerchStore: React.FC<MerchStoreProps> = ({
  merch,
  cart,
  setCart,
  wishlist,
  setWishlist,
  isCartOpen,
  setIsCartOpen
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | MerchItem['category']>('All');
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);

  // Product Detail configuration state
  const [configSize, setConfigSize] = useState('M');
  const [configQty, setConfigQty] = useState(1);

  // Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkName, setCheckName] = useState('');
  const [checkPhone, setCheckPhone] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  const [checkSuccess, setCheckSuccess] = useState(false);

  const categories: ('All' | MerchItem['category'])[] = ['All', 'T-Shirt', 'Hoodie', 'Cap', 'Stickers'];

  const filteredProducts = merch.filter((item) => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  const handleOpenProduct = (product: MerchItem) => {
    setSelectedProduct(product);
    setConfigSize(product.sizes ? product.sizes[0] : 'One Size');
    setConfigQty(1);
  };

  const handleAddToCart = (product: MerchItem, size: string, qty: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((x) => x.item.id === product.id && x.size === size);
      if (existingIdx !== -1) {
        return prev.map((x, idx) =>
          idx === existingIdx ? { ...x, quantity: x.quantity + qty } : x
        );
      }
      return [...prev, { item: product, size, quantity: qty }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const toggleWishlist = (product: MerchItem) => {
    setWishlist((prev) => {
      const isAlreadyIn = prev.some((x) => x.id === product.id);
      if (isAlreadyIn) {
        return prev.filter((x) => x.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkName || !checkPhone || !checkAddress) return;
    
    // Build the WhatsApp order details link
    const orderLines = cart.map(c => `• ${c.item.name} [Size: ${c.size}] x ${c.quantity} (Rs. ${c.item.price * c.quantity})`);
    const totalPrice = cart.reduce((acc, c) => acc + (c.item.price * c.quantity), 0);
    const orderSummary = `SOCIAPI MERCH ORDER SUMMARY:\n\n${orderLines.join('\n')}\n\nTotal Price: Rs. ${totalPrice}\n\nCustomer Details:\nName: ${checkName}\nPhone: ${checkPhone}\nAddress: ${checkAddress}\n\nPayment Method: Cash On Delivery (COD)`;
    
    const text = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/+923329984490?text=${text}`, '_blank');
    
    setCheckSuccess(true);
    setCart([]); // Clear cart
    setCheckName('');
    setCheckPhone('');
    setCheckAddress('');
    
    setTimeout(() => {
      setCheckSuccess(false);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
    }, 4500);
  };

  const totalPrice = cart.reduce((acc, c) => acc + (c.item.price * c.quantity), 0);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-12 relative z-10">
        
        {/* Title */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Apparel Catalog // store</span>
          <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
            SOCIAPI <span className="text-[#7bd355] glow-text">CYBER STORE</span>
          </h1>
          <p className="text-xs text-[#939596] leading-relaxed">
            Premium, high-performance gears and visual decals. Cash on delivery & direct WhatsApp checkout supported.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#333333] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#7bd355] text-[#121212] font-bold shadow-[0_0_15px_rgba(123,211,85,0.25)]'
                  : 'text-[#939596] hover:text-[#e8ecee] hover:bg-[#333333]/30'
              }`}
            >
              {cat} Catalog
            </button>
          ))}
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((x) => x.id === product.id);
            return (
              <div
                key={product.id}
                className="glass-panel rounded-2xl border border-[#333333] overflow-hidden hover:border-[#7bd355]/40 transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => handleOpenProduct(product)}
              >
                <div>
                  <div className="relative h-64 bg-[#161616] overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    
                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full border transition-all ${
                        isWishlisted
                          ? 'bg-red-500/10 border-red-500 text-red-500'
                          : 'bg-[#121212]/80 border-[#333333] text-[#939596] hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    
                    <span className="absolute bottom-4 left-4 text-[8px] font-bold uppercase tracking-widest bg-[#121212]/90 border border-[#7bd355]/30 text-[#7bd355] px-2.5 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-futuristic font-bold text-xs text-[#e8ecee] line-clamp-1 group-hover:text-[#7bd355] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#939596] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#333333] mt-3">
                  <span className="font-futuristic font-bold text-sm text-[#7bd355]">Rs. {product.price}</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#939596] flex items-center group-hover:text-[#7bd355] transition-colors">
                    <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Configure
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NIKE/APPLE-STYLE PRODUCT SPECIFICATION DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[99999] bg-[#000]/95 backdrop-blur-xl flex items-center justify-center p-4">
          {/* Main Modal Container - Force absolute height boundaries */}
          <div className="relative mx-auto w-full max-w-4xl bg-[#111111] border border-[#7bd355]/30 rounded-2xl md:rounded-3xl flex flex-col md:flex-row shadow-2xl overflow-hidden h-[85vh] max-h-[800px]">
            
            {/* Global X Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-[99999] p-3 rounded-full bg-[#121212]/95 border border-[#939596]/20 text-[#e8ecee] hover:text-red-500 hover:border-red-500 transition-all shadow-xl"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left media visual panel - Fixed at 40% height on mobile */}
            <div className="w-full md:w-1/2 relative h-[40%] md:h-full bg-[#161616] flex items-center justify-center shrink-0">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-contain p-4" />
            </div>

            {/* Right configuration panel - Fixed at 60% height on mobile, relative for bottom action bar */}
            <div className="w-full md:w-1/2 relative flex flex-col bg-[#111111] h-[60%] md:h-full">
              
              {/* Scrollable content area - Absolute positioning from top to bottom footer to prevent overlap */}
              <div className="absolute inset-0 bottom-[88px] overflow-y-auto p-5 md:p-8 space-y-6 pb-8">
                
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded">
                    {selectedProduct.category} Catalog
                  </span>
                  <h2 className="text-xl font-futuristic font-bold text-[#e8ecee] mt-2 pr-10">
                    {selectedProduct.name}
                  </h2>
                  <span className="block text-2xl font-futuristic font-bold text-[#7bd355] mt-1">Rs. {selectedProduct.price}</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Product Description</h4>
                  <p className="text-xs text-[#939596] leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Sizing Selectors */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Size Options</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setConfigSize(size)}
                          className={`w-10 h-10 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
                            configSize === size
                              ? 'bg-[#7bd355] border-[#7bd355] text-[#121212]'
                              : 'bg-[#121212] border-[#333333] text-[#939596] hover:border-[#7bd355]/40'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity adjuster */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Quantity Coordinates</h4>
                  <div className="flex items-center space-x-3 bg-[#121212] border border-[#333333] w-28 rounded-lg p-1.5 justify-between">
                    <button
                      onClick={() => setConfigQty(prev => prev > 1 ? prev - 1 : 1)}
                      className="text-[#939596] hover:text-[#7bd355] font-bold text-sm px-2.5"
                    >
                      -
                    </button>
                    <span className="text-xs text-[#e8ecee] font-bold">{configQty}</span>
                    <button
                      onClick={() => setConfigQty(prev => prev + 1)}
                      className="text-[#939596] hover:text-[#7bd355] font-bold text-sm px-2.5"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Technical Product details */}
                <div className="space-y-2.5 pt-4 border-t border-[#333333]">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Specifications Roster</h4>
                  <ul className="space-y-1.5 text-[11px] text-[#939596]">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#7bd355] mt-0.5">•</span>
                      <span>100% Cotton</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#7bd355] mt-0.5">•</span>
                      <span>Wash-resistant decals</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#7bd355] mt-0.5">•</span>
                      <span>Limited launch edition</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action buttons - ABSOLUTELY pinned to the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[88px] p-5 md:p-8 pt-4 border-t border-[#333333] bg-[#111111] flex space-x-3 z-10">
                <button
                  onClick={() => handleAddToCart(selectedProduct, configSize, configQty)}
                  className="flex-1 py-3.5 bg-[#7bd355] text-[#121212] hover:bg-[#517642] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Enlist to Cart</span>
                </button>
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className="px-4.5 py-3.5 bg-[#333333] border border-[#939596]/10 text-[#e8ecee] hover:border-red-500 hover:text-red-500 rounded-xl transition-all flex items-center justify-center"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING CART DRAWER PANEL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[99999] flex justify-end bg-[#121212]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#1e1e1e] border border-[#7bd355]/30 shadow-2xl flex flex-col justify-between h-full rounded-2xl overflow-hidden">
            
            {/* Drawer Header */}
            <div className="px-6 py-4.5 border-b border-[#333333] flex justify-between items-center bg-[#161616]">
              <div className="flex items-center space-x-2 text-[#7bd355]">
                <ShoppingCart className="w-4.5 h-4.5" />
                <h3 className="font-futuristic font-bold text-xs uppercase tracking-widest text-[#e8ecee]">Shopping Cart</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded hover:bg-[#333333] text-[#939596] hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#111111]">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-2 text-[#939596] text-xs uppercase tracking-widest">
                  <p>Your shopping cart coordinates are completely vacant.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[#7bd355] underline block mx-auto mt-4 font-bold"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                cart.map((cartItem, idx) => (
                  <div key={idx} className="flex items-center space-x-4 bg-[#1e1e1e] p-4 rounded-xl border border-[#333333] relative">
                    <img src={cartItem.item.imageUrl} alt={cartItem.item.name} className="w-12 h-12 rounded object-cover border border-[#333333]" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-futuristic font-bold text-xs text-[#e8ecee] truncate">{cartItem.item.name}</h4>
                      <span className="block text-[10px] text-[#7bd355]">Size: {cartItem.size} • Qty: {cartItem.quantity}</span>
                      <span className="block text-[11px] text-[#e8ecee] mt-1 font-bold">Rs. {cartItem.item.price * cartItem.quantity}</span>
                    </div>
                    <button
                      onClick={() => {
                        setCart((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="p-1.5 rounded bg-[#333333] text-[#939596] hover:text-red-500 hover:bg-red-950/20 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer checkout trigger */}
            {cart.length > 0 && (
              <div className="shrink-0 p-6 bg-[#161616] border-t border-[#333333] space-y-4">
                
                <div className="flex justify-between items-center text-xs font-futuristic font-bold">
                  <span className="text-[#939596]">Total Price:</span>
                  <span className="text-[#7bd355] text-lg">Rs. {totalPrice}</span>
                </div>

                {isCheckoutOpen ? (
                  // CHECKOUT FORM OVERLAY
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 text-xs">
                    
                    {checkSuccess ? (
                      <div className="text-center py-4 space-y-2">
                        <div className="w-8 h-8 rounded-full bg-[#7bd355]/10 border border-[#7bd355] flex items-center justify-center mx-auto text-[#7bd355]">
                          ✓
                        </div>
                        <h4 className="font-futuristic font-bold text-[#e8ecee]">Order Transmitted!</h4>
                        <p className="text-[9px] text-[#939596]">Redirecting to WhatsApp to sync COD logistics...</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Full Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Uzma Shah"
                            value={checkName}
                            onChange={(e) => setCheckName(e.target.value)}
                            required
                            className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">WhatsApp Phone Number</label>
                          <input
                            type="tel"
                            placeholder="e.g. +92 300 0000000"
                            value={checkPhone}
                            onChange={(e) => setCheckPhone(e.target.value)}
                            required
                            className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Delivery Address</label>
                          <textarea
                            placeholder="Provide full campus or home street addresses..."
                            value={checkAddress}
                            onChange={(e) => setCheckAddress(e.target.value)}
                            required
                            rows={2}
                            className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                          />
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#333333] text-[#939596] flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-[#7bd355] shrink-0 mt-0.5" />
                          <p className="text-[9px]">We support cash on delivery (COD) for Peshawar. The checkout initiates order confirmation via WhatsApp.</p>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsCheckoutOpen(false)}
                            className="flex-1 py-3 bg-[#333333] hover:bg-[#517642]/20 text-[#e8ecee] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Confirm Order</span>
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                ) : (
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 bg-[#7bd355] text-[#121212] hover:bg-[#517642] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                  >
                    Initialize Checkout (COD)
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};