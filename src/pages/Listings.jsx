import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function formatDate(date) {
  if (!date) return "Recently";
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getListings() {
  return JSON.parse(localStorage.getItem("collex_my_listings")) || [];
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-6">📦</div>
      <h2 className="text-xl font-black uppercase mb-2">No listings yet</h2>
      <p className="text-gray-500 mb-6">Items you list will appear here.</p>
      <Link
        to="/sell"
        className="inline-block bg-collex-teal text-white px-8 py-4
               font-bold uppercase tracking-widest rounded-xl hover:bg-black transition"
      >
        Sell an Item
      </Link>
    </div>
  );
}

function ListingModal({ item, onClose }) {
  if (!item) return null;
  const img = item.images?.[0] || "";

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
                flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-collex-dark
                  w-full max-w-5xl rounded-3xl overflow-hidden
                  shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IMAGE */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
          {img ? (
            <img
              src={img}
              className="max-h-[420px] w-full object-contain"
              alt={item.title}
            />
          ) : (
            <div className="text-gray-400 py-24">No Image</div>
          )}
        </div>

        {/* CONTENT */}
        <div className="w-full md:w-1/2 p-8 relative overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-bold"
          >
            ✕
          </button>

          <p className="text-collex-teal text-xs font-bold uppercase mb-2">
            {item.category}
          </p>

          <h2 className="text-3xl font-black uppercase mb-4">{item.title}</h2>

          <p className="text-3xl font-bold mb-6">₹{item.price}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border rounded-xl p-4">
              <p className="text-xs uppercase text-gray-400">Condition</p>
              <p className="font-bold">{item.condition}</p>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-xs uppercase text-gray-400">Posted</p>
              <p className="font-bold">{formatDate(item.postedAt)}</p>
            </div>
          </div>

          <p className="text-xs uppercase font-bold text-gray-400 mb-2">
            Description
          </p>
          <p className="border-l-4 border-collex-teal pl-4 text-gray-600">
            {item.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

function ListingCard({ item, onOpen, onEdit, onDelete }) {
  const img = item.images?.[0] || "";

  return (
    <div
      onClick={() => onOpen(item.id)}
      className="bg-white dark:bg-collex-dark rounded-2xl border
             border-gray-100 dark:border-gray-800 overflow-hidden
             shadow-sm cursor-pointer hover:shadow-lg transition"
    >
      <div className="aspect-[4/3] bg-gray-100">
        {img ? (
          <img src={img} className="w-full h-full object-cover" alt={item.title} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col">
        <h3 className="font-bold uppercase tracking-tight text-gray-900 dark:text-white line-clamp-1">
          {item.title}
        </h3>

        <span className="text-collex-teal font-bold text-lg mt-2">
          ₹{item.price}
        </span>

        <p className="text-xs uppercase text-gray-500 mt-2">
          {item.category} · {item.condition}
        </p>

        <p className="text-xs text-gray-400 mt-4">
          Posted {formatDate(item.postedAt)}
        </p>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onEdit(item.id)}
            className="flex-1 py-2 text-xs font-bold uppercase
                   border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="flex-1 py-2 text-xs font-bold uppercase
                   text-red-500 border border-red-200 rounded-lg
                   hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Listings() {
  const [listings, setListings] = useState(getListings);
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  const openItem = listings.find((l) => l.id === openId) || null;

  const handleDelete = (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    const updated = listings.filter((item) => item.id !== id);
    localStorage.setItem("collex_my_listings", JSON.stringify(updated));
    setListings(updated);
  };

  const handleEdit = (id) => {
    navigate(`/sell?edit=${id}`);
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-12">
          <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
            My Listings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Items you have listed for sale
          </p>
        </div>

        {listings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                onOpen={setOpenId}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <ListingModal item={openItem} onClose={() => setOpenId(null)} />
    </>
  );
}
