export default function ProductCard({
  product,
  onView,
  onChat,
}) {
  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all duration-300 hover:border-collex-teal hover:shadow-xl dark:border-gray-800 dark:bg-collex-dark"
    >
      <button
        type="button"
        onClick={() => onView(product.id)}
        className="relative aspect-[4/3] overflow-hidden bg-gray-100 text-left dark:bg-gray-900"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {product.condition}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-1 text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h3>

        <span className="mb-3 text-xl font-bold text-collex-teal">
          Rs. {product.price}
        </span>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p className="line-clamp-1 font-semibold">
            {product.college || product.location}
          </p>
          <p>Seller: {product.seller}</p>
          <p>Condition: {product.condition}</p>
          <p>{product.views || 0} Views</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-600 dark:bg-gray-900 dark:text-gray-300">
            {product.category}
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
            Verified Seller
          </span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <button
            type="button"
            onClick={() => onChat(product)}
            className="rounded-md bg-collex-teal px-3 py-2 text-xs font-black uppercase text-white hover:bg-collex-dark"
          >
            Chat Seller
          </button>
          <button
            type="button"
            onClick={() => onView(product.id)}
            className="rounded-md border border-gray-200 px-3 py-2 text-xs font-black uppercase text-gray-700 hover:border-collex-teal hover:text-collex-teal dark:border-gray-700 dark:text-gray-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
