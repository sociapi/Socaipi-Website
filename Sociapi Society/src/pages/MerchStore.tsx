import React, { useState } from "react";
import { X, ShoppingCart, Heart } from "lucide-react";

export default function ProductModal({
  selectedProduct,
  setSelectedProduct,
  handleAddToCart,
  toggleWishlist,
}: any) {
  const [configSize, setConfigSize] = useState("");
  const [configQty, setConfigQty] = useState(1);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#000]/95 backdrop-blur-xl overflow-hidden">
      
      <div className="relative w-full h-full bg-[#111111] flex flex-col md:flex-row overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 relative bg-[#111111] flex items-center justify-center min-h-[42vh] md:min-h-screen">
          
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="w-full h-full object-contain md:object-cover"
          />

          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-[#121212] text-white border border-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col h-full overflow-hidden">

          {/* SCROLL AREA */}
          <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 pb-52">

            {/* TITLE */}
            <span className="text-xs text-green-400 uppercase">
              {selectedProduct.category}
            </span>

            <h2 className="text-3xl font-bold text-white mt-3">
              {selectedProduct.name}
            </h2>

            <p className="text-green-400 text-xl font-bold mt-2">
              Rs. {selectedProduct.price}
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-400 mt-6 leading-7">
              {selectedProduct.description}
            </p>

            {/* SIZE */}
            {selectedProduct.sizes?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-white mb-3">Select Size</h4>

                <div className="flex gap-3 flex-wrap">
                  {selectedProduct.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setConfigSize(size)}
                      className={`w-12 h-12 rounded-xl border ${
                        configSize === size
                          ? "bg-green-500 text-black"
                          : "text-white border-gray-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-6">
              <h4 className="text-white mb-3">Quantity</h4>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    setConfigQty((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="text-green-400 text-2xl"
                >
                  -
                </button>

                <span className="text-white text-lg">{configQty}</span>

                <button
                  onClick={() => setConfigQty((prev) => prev + 1)}
                  className="text-green-400 text-2xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-8 border-t border-gray-700 pt-6">
              <h4 className="text-white mb-3">Specifications</h4>

              <ul className="text-gray-400 space-y-2">
                <li>• 100% Cotton</li>
                <li>• Wash resistant print</li>
                <li>• Limited edition</li>

                {(selectedProduct.details ?? []).map(
                  (det: string, i: number) => (
                    <li key={i}>• {det}</li>
                  )
                )}
              </ul>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="absolute bottom-0 left-0 md:left-1/2 w-full md:w-1/2 bg-[#111] border-t border-gray-700 p-5">

            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-xs">Total</p>
                <p className="text-green-400 text-xl font-bold">
                  Rs. {Number(selectedProduct.price) * configQty}
                </p>
              </div>

              <div className="text-right text-gray-400 text-xs">
                <p>Size: {configSize || "N/A"}</p>
                <p>Qty: {configQty}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  handleAddToCart(selectedProduct, configSize, configQty)
                }
                className="flex-1 bg-green-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className="w-14 bg-gray-800 text-white rounded-xl flex items-center justify-center"
              >
                <Heart className="w-5 h-5" />
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}