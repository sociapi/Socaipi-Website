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
  merch, cart, setCart, wishlist, setWishlist, isCartOpen, setIsCartOpen
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | MerchItem['category']>('All');
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);
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

    const orderLines = cart.map(c => `• ${c.item.name} [Size: ${c.size}] x ${c.quantity} (Rs. ${c.item.price * c.quantity})`);
    const totalPrice = cart.reduce((acc, c) => acc + (c.item.price * c.quantity), 0);
    const orderSummary = `SOCIAPI MERCH ORDER SUMMARY:\n\n${orderLines.join('\n')}\n\nTotal Price: Rs. ${totalPrice}\n\nCustomer Details:\nName: ${checkName}\nPhone: ${checkPhone}\nAddress: ${checkAddress}\n\nPayment Method: Cash On Delivery (COD)`;

    const text = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/+923329984490?text=${text}`, '_blank');

    setCheckSuccess(true);
    setCart([]);
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

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[9999] bg-[#000]/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative mx-auto w-full max-w-4xl bg-[#111111] border border-[#7bd355]/30 rounded-3xl flex flex-col md:flex-row shadow-2xl overflow-hidden max-h-[90vh]">

            {/* Left media */}
            <div className="w-full md:w-1/2 relative min-h-[260px] md:min-h-[420px] bg-[#111111] overflow-hidden flex items-center justify-center shrink-0">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-contain" />
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-[#121212]/95 border border-[#939596]/20 text-[#e8ecee] hover:text-[#7bd355] transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Right config panel */}
            <div className="w-full md:w-1/2 flex flex-col bg-[#111111] max-h-[90vh] md:max-h-full">

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

                <div>
                  <span className="text-[8px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded">
                    {selectedProduct.category} Catalog
                  </span>
                  <h2 className="text-xl font-futuristic font-bold text-[#e8ecee] mt-2">
                    {selectedProduct.name}
                  </h2>
                  <span className="block text-2xl font-futuristic font-bold text-[#7bd355] mt-1">Rs. {selectedProduct.price}</span>
                </div>

                {/* ✅ FIX 1: Description — make sure data has this field */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Product Description</h4>
                  <p className="text-xs text-[#939596] leading-relaxed">
                    {selectedProduct.description || 'No description available for this product.'}
                  </p>
                </div>

                {/* Sizing */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Size Options</h4>
                    <div className="flex space-x-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setConfigSize(size)}
                          className={`w-9 h-9 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
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

                {/* Quantity */}
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Quantity Coordinates</h4>
                  <div className="flex items-center space-x-3 bg-[#121212] border border-[#333333] w-28 rounded-lg p-1.5 justify-between">
                    <button onClick={() => setConfigQty(prev => prev > 1 ? prev - 1 : 1)} className="text-[#939596] hover:text-[#7bd355] font-bold text-sm px-2.5">-</button>
                    <span className="text-xs text-[#e8ecee] font-bold">{configQty}</span>
                    <button onClick={() => setConfigQty(prev => prev + 1)} className="text-[#939596] hover:text-[#7bd355] font-bold text-sm px-2.5">+</button>
                  </div>
                </div>

                {/* ✅ FIX 2: Dynamic specifications from product data */}
                {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-[#333333]">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Specifications Roster</h4>
                    <ul className="space-y-1.5 text-[11px] text-[#939596]">
                      {selectedProduct.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-[#7bd355] mt-0.5">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="h-4"></div>
              </div>

              {/* Action buttons */}
              <div className="shrink-0 p-6 md:p-8 pt-4 border-t border-[#333333] bg-[#111111] flex space-x-3">
                <button
                  onClick={() => handleAddToCart(selectedProduct, configSize, configQty)}
                  className="flex-1 py-3.5 bg-[#7bd355] text-[#121212] hover:bg-[#517642] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Enlist to Cart</span>
                </button>
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className="px-4.5 py-3.5 bg-[#333333] border border-[#939596]/10 text-[#e8ecee] hover:border-red-500 hover:text-red-500 rounded-xl transition-all"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER — unchanged, keep your existing code */}
      {isCartOpen && (
        // ... your existing cart drawer code
        <></>
      )}
    </div>
  );
};