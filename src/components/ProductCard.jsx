export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={() => onClick(product.id)}
      className="bg-white dark:bg-collex-dark
             border border-gray-100 dark:border-gray-800
             rounded-2xl overflow-hidden
             hover:border-collex-teal
             transition-all duration-300
             hover:shadow-xl
             flex flex-col h-full
             group cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-t-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover
                 transform group-hover:scale-105
                 transition-transform duration-500"
        />
        <div
          className="absolute top-3 right-3 bg-black/80 px-3 py-1
                    text-xs font-bold uppercase tracking-wider
                    text-white rounded-full"
        >
          {product.condition}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col">
        <h3
          className="font-bold text-gray-900 dark:text-white
                   uppercase tracking-tight text-lg
                   line-clamp-1 mb-2"
        >
          {product.title}
        </h3>

        <span className="font-bold text-collex-teal text-xl mb-3">
          ₹{product.price}
        </span>

        <p
          className="text-gray-500 dark:text-gray-400
                  text-xs uppercase tracking-wide
                  mb-6 flex items-center gap-1"
        >
          🏷️ {product.category}
        </p>

        {/* FOOTER */}
        <div
          className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800
                    flex items-center justify-between
                    text-xs text-gray-500 dark:text-gray-400
                    font-medium uppercase tracking-wide"
        >
          <div className="flex items-center gap-2">
            👤 <span className="truncate max-w-[100px]">{product.seller}</span>
          </div>
          <span
            className="text-gray-900 dark:text-white
                       group-hover:text-collex-teal transition-colors"
          >
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}
