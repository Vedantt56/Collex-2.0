import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CATEGORIES = ["TEXTBOOKS", "ELECTRONICS", "FURNITURE", "CLOTHING", "SPORTS"];
const CONDITIONS = ["New", "Like New", "Good", "Fair"];

function getListings() {
  return JSON.parse(localStorage.getItem("collex_my_listings")) || [];
}

export default function Sell() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const listings = getListings();
  const editingItem = editId
    ? listings.find((item) => item.id.toString() === editId)
    : null;

  const [title, setTitle] = useState(editingItem?.title || "");
  const [price, setPrice] = useState(editingItem?.price || "");
  const [category, setCategory] = useState(
    editingItem?.category || CATEGORIES[0]
  );
  const [condition, setCondition] = useState(
    editingItem?.condition || CONDITIONS[0]
  );
  const [description, setDescription] = useState(
    editingItem?.description || ""
  );
  const [images, setImages] = useState(editingItem?.images || []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Reset form if navigating between "new" and "edit" without remount
  useEffect(() => {
    setTitle(editingItem?.title || "");
    setPrice(editingItem?.price || "");
    setCategory(editingItem?.category || CATEGORIES[0]);
    setCondition(editingItem?.condition || CONDITIONS[0]);
    setDescription(editingItem?.description || "");
    setImages(editingItem?.images || []);
    setSaved(false);
  }, [editId]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const current = getListings();

    if (editingItem) {
      const index = current.findIndex((i) => i.id.toString() === editId);
      current[index] = {
        ...current[index],
        title: title.trim(),
        price,
        category,
        condition,
        description: description.trim(),
        images,
      };
    } else {
      current.unshift({
        id: Date.now(),
        title: title.trim(),
        price,
        category,
        condition,
        description: description.trim(),
        images,
        postedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem("collex_my_listings", JSON.stringify(current));

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1000);
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

  return (
    <div className="bg-gray-50 dark:bg-collex-darker min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
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
        <div className="bg-white dark:bg-collex-dark shadow-xl border border-gray-100 dark:border-gray-800 rounded-2xl">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
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
                <label className="block text-xs font-bold uppercase mb-2">
                  Item Title
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900
                         border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase mb-2">
                  Price
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900
                         border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold uppercase mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900
                         border border-gray-200 dark:border-gray-700 rounded-xl"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold uppercase mb-2">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900
                         border border-gray-200 dark:border-gray-700 rounded-xl"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold uppercase mb-2">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900
                         border border-gray-200 dark:border-gray-700 rounded-xl"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-800">
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
                  : "Publish Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
