import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createListing,
  getListingById,
  updateListing,
} from "../services/listingService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const CATEGORIES = ["Books", "Electronics", "Furniture", "Stationery", "Others"];
const CONDITIONS = ["New", "Like New", "Good", "Fair"];

export default function Sell() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const navigate = useNavigate();
  const {
    currentUser,
    isLoggedIn,
    verificationStatus,
  } = useAuth();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  const [editingItem, setEditingItem] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(
    CATEGORIES[0]
  );
  const [condition, setCondition] = useState(
    CONDITIONS[0]
  );
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const loadListing = async () => {
      setSaved(false);
      setError("");

      if (!editId) {
        setEditingItem(null);
        setTitle("");
        setPrice("");
        setCategory(CATEGORIES[0]);
        setCondition(CONDITIONS[0]);
        setDescription("");
        setImages([]);
        return;
      }

      try {
        const response = await getListingById(editId);
        const item = response.data;

        setEditingItem(item);
        setTitle(item.title || "");
        setPrice(item.price || "");
        setCategory(item.category || CATEGORIES[0]);
        setCondition(item.condition || CONDITIONS[0]);
        setDescription(item.description || "");
        setImages(item.images || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load this listing."
        );
      }
    };

    loadListing();
  }, [editId]);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList);
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      setImages((prev) => {
        if (prev.length >= 5) return prev;
        return prev;
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) =>
          prev.length >= 5 ? prev : [...prev, e.target.result]
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: title.trim(),
        price: Number(price),
        category,
        condition,
        description: description.trim(),
        images,
      };

      if (editingItem) {
        await updateListing(editId, payload);
        showToast("Listing updated.");
      } else {
        await createListing(payload);
        showToast("Listing created.");
      }

      setSaved(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save listing."
      );
      showToast(
        error.response?.data?.message ||
          "Unable to save listing.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white dark:bg-collex-dark p-10 shadow-lg text-center max-w-md w-full border rounded-2xl">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            ✔
          </div>
          <h2 className="text-2xl font-black uppercase mb-4">Saved!</h2>
          <p className="text-gray-500 mb-8">Your changes are live.</p>
          <button
            onClick={() => navigate("/listing")}
            className="w-full inline-block bg-collex-teal text-white py-4 font-bold uppercase tracking-widest rounded-xl hover:bg-black"
          >
            Back to My Listings
          </button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  if (verificationStatus === "pending") {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-16 dark:bg-collex-darker">
        <div className="mx-auto max-w-2xl rounded-lg border border-yellow-200 bg-yellow-50 p-8 text-yellow-800 shadow dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
          <h1 className="text-2xl font-black uppercase">
            Verification Pending
          </h1>
          <p className="mt-3 font-semibold">
            Your account is awaiting verification. You can browse items but cannot create listings until approved.
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === "rejected") {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-16 dark:bg-collex-darker">
        <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-8 text-red-700 shadow dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <h1 className="text-2xl font-black uppercase">
            Verification Rejected
          </h1>
          <p className="mt-3 font-semibold">
            Please re-upload your college ID.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="mt-6 rounded-lg bg-red-600 px-5 py-3 text-sm font-black uppercase text-white"
          >
            Resubmit ID
          </button>
        </div>
      </div>
    );
  }

  if (
    currentUser &&
    verificationStatus !== "approved"
  ) {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-16 dark:bg-collex-darker">
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-8 text-gray-700 shadow dark:border-gray-800 dark:bg-collex-dark dark:text-gray-200">
          <h1 className="text-2xl font-black uppercase">
            Seller Verification Required
          </h1>
          <p className="mt-3 font-semibold">
            Your college ID must be approved before you can create listings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-collex-darker min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            {editingItem ? "Edit Listing" : "Sell Your Gear"}
          </h1>
          <div className="w-12 h-1 bg-collex-teal mx-auto mt-4 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 uppercase tracking-wide text-sm">
            {editingItem
              ? "Update your item details."
              : "Turn unused items into cash."}
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800 rounded-2xl">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-2">
                Photos
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center px-6 py-10
                       border-2 border-dashed border-gray-200 dark:border-gray-700
                       rounded-xl cursor-pointer hover:border-collex-teal
                       hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <p className="text-gray-500 text-sm">
                  Click to upload images (PNG, JPG)
                </p>
                <p className="text-xs text-gray-400 mt-1">Max 5 images</p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      className="w-full h-24 object-cover rounded-xl border"
                      alt={`Upload ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/70 text-white
                   text-xs rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FIELDS */}
            <div className="grid sm:grid-cols-6 gap-6">
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-800 dark:text-slate-200">
                  Item Title
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950
                         border border-gray-200 dark:border-slate-700 rounded-xl
                         text-gray-900 dark:text-white outline-none
                         focus:border-collex-teal dark:focus:border-collex-teal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-800 dark:text-slate-200">
                  Price
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950
                         border border-gray-200 dark:border-slate-700 rounded-xl
                         text-gray-900 dark:text-white outline-none
                         focus:border-collex-teal dark:focus:border-collex-teal"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-800 dark:text-slate-200">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950
                         border border-gray-200 dark:border-slate-700 rounded-xl
                         text-gray-900 dark:text-white outline-none
                         focus:border-collex-teal dark:focus:border-collex-teal"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} className="bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-800 dark:text-slate-200">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950
                         border border-gray-200 dark:border-slate-700 rounded-xl
                         text-gray-900 dark:text-white outline-none
                         focus:border-collex-teal dark:focus:border-collex-teal"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c} className="bg-white text-gray-900 dark:bg-slate-950 dark:text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold uppercase mb-2 text-gray-800 dark:text-slate-200">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950
                         border border-gray-200 dark:border-slate-700 rounded-xl
                         text-gray-900 dark:text-white outline-none
                         focus:border-collex-teal dark:focus:border-collex-teal"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-slate-800">
              <button
                type="submit"
                disabled={saving}
                className={`bg-collex-teal text-white font-bold py-4 px-10
                       uppercase tracking-widest text-sm rounded-xl
                       hover:bg-black transition ${
                         saving ? "opacity-70" : ""
                       }`}
              >
                {saving
                  ? "Saving..."
                  : editingItem
                  ? "Update Listing"
                  : "Create Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
