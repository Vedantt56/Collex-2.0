import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  "All",
  "TEXTBOOKS",
  "ELECTRONICS",
  "FURNITURE",
  "CLOTHING",
  "SPORTS",
  "TOOL",
  "OTHERS",
];

function ProductModal({ product, onClose, onContact }) {
  if (!product) return null;
  const oldPrice = Math.round(product.price * 1.2);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
                flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={product.image}
            className="w-full h-64 md:h-full object-cover"
            alt={product.title}
          />
          <span className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {product.condition}
          </span>
        </div>

        {/* CONTENT */}
        <div className="w-full md:w-1/2 p-10 relative overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-bold"
          >
            ✕
          </button>

          <p className="text-collex-teal text-xs font-bold uppercase mb-3">
            {product.category}
          </p>

          <h2 className="text-4xl font-black mb-4">{product.title}</h2>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold">₹{product.price}</span>
            <span className="text-gray-400 line-through">₹{oldPrice}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase">Location</p>
              <p className="font-bold">{product.location}</p>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase">Usage</p>
              <p className="font-bold">{product.usage}</p>
            </div>
          </div>

          <p className="text-xs uppercase font-bold text-gray-400 mb-2">
            Description
          </p>
          <p className="border-l-4 border-collex-teal pl-4 text-gray-600 mb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
              {product.seller[0]}
            </div>
            <div>
              <p className="font-bold">{product.seller}</p>
              <p className="text-xs text-gray-400">
                Posted {product.posted}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onContact(product)}
              className="flex-1 bg-collex-teal text-white py-4
                     font-bold uppercase rounded-xl"
            >
              Contact Seller
            </button>

            <button className="w-14 h-14 border rounded-xl text-xl">♥</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedId) || null;

  const handleContact = (product) => {
    const seller = encodeURIComponent(product.seller);
    const title = encodeURIComponent(product.title);
    navigate(`/chat?seller=${seller}&product=${title}`);
  };

  return (
    <>
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between gap-6">
          <h1 className="text-3xl font-black uppercase">Explore Listings</h1>

          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 border text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={setSelectedId} />
          ))}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedId(null)}
        onContact={handleContact}
      />
    </>
  );
}
