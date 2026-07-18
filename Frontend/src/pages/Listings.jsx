import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteListing,
  getMyListings,
} from "../services/listingService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function formatDate(date) {
  if (!date) return "Recently";
  return new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalize(item) {
  return {
    ...item,
    id: item._id,
    postedAt: item.createdAt,
  };
}

function StatusBadge({ status = "available" }) {
  const label =
    status.charAt(0).toUpperCase() + status.slice(1);
  const styles = {
    available:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
    sold: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
    reserved:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
    hidden:
      "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
        styles[status] || styles.available
      }`}
    >
      {label}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 py-20 text-center dark:border-gray-800">
      <h2 className="text-xl font-black uppercase text-gray-900 dark:text-white">
        No listings yet
      </h2>
      <p className="mt-2 text-gray-500">
        Items you list will appear here.
      </p>
      <Link
        to="/sell"
        className="mt-6 inline-block rounded-lg bg-collex-teal px-8 py-4 font-bold uppercase tracking-widest text-white transition hover:bg-black"
      >
        Sell an Item
      </Link>
    </div>
  );
}

function ListingCard({ item, onOpen, onEdit, onDelete }) {
  const img = item.images?.[0] || "";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:border-collex-teal hover:shadow-lg dark:border-gray-800 dark:bg-collex-dark">
      <button
        type="button"
        onClick={() => onOpen(item.id)}
        className="aspect-[4/3] bg-gray-100 text-left dark:bg-gray-900"
      >
        {img ? (
          <img
            src={img}
            className="h-full w-full object-cover"
            alt={item.title}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-black uppercase tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <StatusBadge status={item.status} />
        </div>

        <span className="text-lg font-bold text-collex-teal">
          Rs. {item.price}
        </span>

        <p className="mt-2 text-xs uppercase text-gray-500">
          {item.category} / {item.condition}
        </p>

        <p className="mt-4 text-xs text-gray-400">
          Posted {formatDate(item.postedAt)}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <button
            onClick={() => onEdit(item.id)}
            className="rounded-md border border-gray-200 py-2 text-xs font-black uppercase hover:border-collex-teal hover:text-collex-teal dark:border-gray-700 dark:text-gray-200"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="rounded-md border border-red-200 py-2 text-xs font-black uppercase text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ListingModal({ item, onClose }) {
  if (!item) return null;
  const img = item.images?.[0] || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-collex-dark md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-center bg-gray-100 md:w-1/2 dark:bg-gray-900">
          {img ? (
            <img
              src={img}
              className="max-h-[420px] w-full object-contain"
              alt={item.title}
            />
          ) : (
            <div className="py-24 text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="relative w-full overflow-y-auto p-8 md:w-1/2">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-2xl font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            x
          </button>

          <p className="mb-2 text-xs font-bold uppercase text-collex-teal">
            {item.category}
          </p>
          <h2 className="mb-4 pr-8 text-3xl font-black uppercase text-gray-900 dark:text-white">
            {item.title}
          </h2>
          <p className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Rs. {item.price}
          </p>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs uppercase text-gray-400">
                Condition
              </p>
              <p className="font-bold dark:text-white">
                {item.condition}
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs uppercase text-gray-400">
                Status
              </p>
              <p className="font-bold dark:text-white">
                {item.status || "available"}
              </p>
            </div>
          </div>

          <p className="mb-2 text-xs font-bold uppercase text-gray-400">
            Description
          </p>
          <p className="border-l-4 border-collex-teal pl-4 text-gray-600 dark:text-gray-300">
            {item.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const openItem =
    listings.find((listing) => listing.id === openId) ||
    null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadListings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyListings();
        setListings(response.data.map(normalize));
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load your listings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [isLoggedIn, navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      await deleteListing(id);
      setListings((current) =>
        current.filter((item) => item.id !== id)
      );
      showToast("Listing deleted.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to delete listing.";
      setError(message);
      showToast(message, "error");
    }
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase text-collex-teal">
              Seller dashboard
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
              My Listings
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage active, sold, and reserved campus listings.
            </p>
          </div>
          <Link
            to="/sell"
            className="rounded-lg bg-collex-teal px-6 py-3 text-sm font-black uppercase text-white hover:bg-collex-dark"
          >
            Create Listing
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"
              />
            ))}
          </div>
        ) : error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-center font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            {error}
          </p>
        ) : listings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                onOpen={setOpenId}
                onEdit={(id) => navigate(`/sell?edit=${id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <ListingModal
        item={openItem}
        onClose={() => setOpenId(null)}
      />
    </>
  );
}
