{/* NIKE/APPLE-STYLE PRODUCT SPECIFICATION DETAIL MODAL */}
{selectedProduct && (
  <div className="fixed inset-0 z-[9999] bg-[#000]/95 backdrop-blur-xl overflow-hidden">
    
    {/* Main Modal */}
    <div className="relative w-full h-full bg-[#111111] flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT IMAGE SECTION */}
      <div className="w-full md:w-1/2 relative bg-[#111111] flex items-center justify-center min-h-[42vh] md:min-h-screen shrink-0">
        
        <img
          src={selectedProduct.imageUrl}
          alt={selectedProduct.name}
          className="w-full h-full object-contain md:object-cover"
        />

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-[#121212]/95 border border-[#939596]/20 text-[#e8ecee] hover:text-[#7bd355] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

      </div>

      {/* RIGHT DETAILS SECTION */}
      <div className="w-full md:w-1/2 bg-[#111111] flex flex-col h-full overflow-hidden">
        
        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 pb-40">
          
          <div className="space-y-7">

            {/* CATEGORY */}
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#7bd355] bg-[#517642]/20 px-3 py-1 rounded-full">
                {selectedProduct.category}
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-[#e8ecee] mt-4 leading-tight">
                {selectedProduct.name}
              </h2>

              <p className="text-2xl font-bold text-[#7bd355] mt-2">
                Rs. {selectedProduct.price}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#e8ecee]">
                Product Description
              </h4>

              <p className="text-sm text-[#b3b3b3] leading-7">
                {selectedProduct.description}
              </p>
            </div>

            {/* SIZE */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="space-y-3">
                
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#e8ecee]">
                  Select Size
                </h4>

                <div className="flex flex-wrap gap-3">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setConfigSize(size)}
                      className={`w-12 h-12 rounded-xl border text-sm font-bold transition-all ${
                        configSize === size
                          ? 'bg-[#7bd355] border-[#7bd355] text-[#111111]'
                          : 'bg-[#1a1a1a] border-[#333333] text-[#d1d1d1] hover:border-[#7bd355]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

              </div>
            )}

            {/* QUANTITY */}
            <div className="space-y-3">
              
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#e8ecee]">
                Quantity Coordinates
              </h4>

              <div className="flex items-center justify-between bg-[#151515] border border-[#333333] rounded-2xl px-4 py-3 w-[170px]">
                
                <button
                  onClick={() =>
                    setConfigQty((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="text-[#7bd355] text-xl font-bold"
                >
                  -
                </button>

                <span className="text-white text-lg font-bold">
                  {configQty}
                </span>

                <button
                  onClick={() => setConfigQty((prev) => prev + 1)}
                  className="text-[#7bd355] text-xl font-bold"
                >
                  +
                </button>

              </div>
            </div>

            {/* SPECIFICATIONS */}
            <div className="space-y-4 pt-6 border-t border-[#2d2d2d]">
              
              <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#e8ecee]">
                Specifications Roster
              </h4>

              <div className="space-y-3">

                {/* DEFAULT DETAILS */}
                <div className="flex items-start gap-3 text-sm text-[#bdbdbd]">
                  <span className="text-[#7bd355] mt-1">•</span>
                  <span>100% Cotton</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-[#bdbdbd]">
                  <span className="text-[#7bd355] mt-1">•</span>
                  <span>Wash-resistant decals</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-[#bdbdbd]">
                  <span className="text-[#7bd355] mt-1">•</span>
                  <span>Limited launch edition</span>
                </div>

                {/* DYNAMIC DETAILS */}
                {selectedProduct.details?.map((det, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#bdbdbd]"
                  >
                    <span className="text-[#7bd355] mt-1">•</span>
                    <span>{det}</span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

        {/* FIXED BOTTOM ADD TO CART SECTION */}
        <div className="absolute bottom-0 left-0 md:left-1/2 w-full md:w-1/2 bg-[#111111]/98 backdrop-blur-xl border-t border-[#333333] px-5 md:px-8 py-5">
          
          <div className="space-y-4">

            {/* PRICE + INFO */}
            <div className="flex items-center justify-between">
              
              <div>
                <p className="text-[#939596] text-xs uppercase tracking-widest">
                  Total
                </p>

                <h3 className="text-2xl font-bold text-[#7bd355]">
                  Rs. {selectedProduct.price * configQty}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-[#939596] text-xs">
                  Size: {configSize}
                </p>

                <p className="text-[#939596] text-xs">
                  Qty: {configQty}
                </p>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                onClick={() =>
                  handleAddToCart(
                    selectedProduct,
                    configSize,
                    configQty
                  )
                }
                className="flex-1 h-14 rounded-2xl bg-[#7bd355] text-[#111111] font-bold text-sm uppercase tracking-widest hover:bg-[#95ff64] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Enlist to Cart
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className="w-14 h-14 rounded-2xl border border-[#333333] bg-[#1a1a1a] text-[#e8ecee] hover:text-red-500 hover:border-red-500 transition-all flex items-center justify-center"
              >
                <Heart className="w-5 h-5" />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
)}