export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-collex-dark dark:bg-black text-gray-400 py-12 border-t border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-white font-black text-2xl uppercase tracking-tighter">
              COLLEX
            </span>
            <p className="text-xs mt-2 uppercase tracking-widest text-gray-500">
              © {year} Campus Marketplace.
            </p>
          </div>

          <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-collex-teal transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-collex-teal transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-collex-teal transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
