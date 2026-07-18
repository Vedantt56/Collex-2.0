import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  getExploreListings,
  searchListings,
} from "../services/exploreService";

const CATEGORIES = [
  "All",
  "Books",
  "Electronics",
  "Furniture",
  "Stationery",
  "Others",
];

function normalizeListing(listing) {
  return {
    ...listing,
    id: listing._id,
    image: listing.images?.[0] || "",
    seller: listing.sellerName || "Seller",
    location: listing.college || "Campus",
    usage: listing.condition,
    posted: listing.createdAt
      ? new Date(listing.createdAt).toLocaleDateString()
      : "Recently",
  };
}

function ProductModal({ product, onClose, onContact }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-collex-dark md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full bg-gray-100 md:w-1/2 dark:bg-gray-900">
          {product.image ? (
            <img
              src={product.image}
              className="h-64 w-full object-cover md:h-full"
              alt={product.title}
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center text-gray-400 md:h-full">
              No Image
            </div>
          )}
          <span className="absolute bottom-4 left-4 rounded-full bg-black px-3 py-1 text-xs font-bold uppercase text-white">
            {product.condition}
          </span>
        </div>

        <div className="relative w-full overflow-y-auto p-8 md:w-1/2 md:p-10">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-2xl font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            x
          </button>

          <p className="mb-3 text-xs font-bold uppercase text-collex-teal">
            {product.category}
          </p>

          <h2 className="mb-4 pr-8 text-3xl font-black uppercase text-gray-900 dark:text-white">
            {product.title}
          </h2>

          <p className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Rs. {product.price}
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs uppercase text-gray-400">
                College
              </p>
              <p className="font-bold dark:text-white">
                {product.location}
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs uppercase text-gray-400">
                Views
              </p>
              <p className="font-bold dark:text-white">
                {product.views || 0}
              </p>
            </div>
          </div>

          <p className="mb-2 text-xs font-bold uppercase text-gray-400">
            Description
          </p>
          <p className="mb-8 border-l-4 border-collex-teal pl-4 text-gray-600 dark:text-gray-300">
            {product.description || "No description provided."}
          </p>

          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-collex-teal font-bold text-white">
              {product.seller?.[0] || "S"}
            </div>
            <div>
              <p className="font-bold dark:text-white">
                {product.seller}
              </p>
              <p className="text-xs text-gray-400">
                Posted {product.posted}
              </p>
            </div>
          </div>

          <button
            onClick={() => onContact(product)}
            className="w-full rounded-lg bg-collex-teal py-4 font-bold uppercase text-white hover:bg-collex-dark"
          >
            Chat Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        setError("");

        const categoryParams =
          activeCategory === "All"
            ? {}
            : { category: activeCategory };
        const response = searchTerm.trim()
          ? await searchListings(searchTerm.trim())
          : await getExploreListings({
              ...categoryParams,
              ...(sort ? { sort } : {}),
            });

        const nextProducts =
          response.data.map(normalizeListing);
        setProducts(
          searchTerm.trim() && activeCategory !== "All"
            ? nextProducts.filter(
                (item) => item.category === activeCategory
              )
            : nextProducts
        );
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load listings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [activeCategory, searchTerm, sort]);

  const selectedProduct =
    products.find((p) => p.id === selectedId) || null;

  const handleContact = (product) => {
    const seller = encodeURIComponent(product.seller);
    const title = encodeURIComponent(product.title);
    navigate(`/chat?seller=${seller}&product=${title}`);
  };

  return (
    <>
      <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-collex-dark">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
          <div>
            <p className="text-xs font-black uppercase text-collex-teal">
              Campus marketplace
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase text-gray-900 dark:text-white">
              Explore Listings
            </h1>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_220px_180px]">
            <input
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search books, calculators, furniture..."
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-collex-teal dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            <select
              value={activeCategory}
              onChange={(e) =>
                setActiveCategory(e.target.value)
              }
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">Newest</option>
              <option value="price">Price: Low to High</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 py-20 text-center dark:border-gray-800">
            <h2 className="text-xl font-black uppercase text-gray-900 dark:text-white">
              No listings found
            </h2>
            <p className="mt-2 text-gray-500">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={setSelectedId}
                onChat={handleContact}
              />
            ))}
          </div>
        )}
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedId(null)}
        onContact={handleContact}
      />
    </>
  );
}
