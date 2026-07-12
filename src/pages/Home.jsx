import { useNavigate } from "react-router-dom";
import useFadeUp from "../hooks/useFadeUp";

function FeatureCard({ icon, title, text, delay }) {
  return (
    <div
      className={`p-8 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-collex-dark
                hover:border-collex-teal transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                fade-up ${delay}`}
    >
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold uppercase tracking-wide mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  useFadeUp();

  return (
    <>
      {/* HERO */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-90"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/10"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tight mb-6 fade-up visible">
            Colle<span className="text-collex-teal">X</span>
            <br className="md:hidden" />
            Is Campus
          </h1>

          <div className="w-24 h-1 bg-collex-teal mx-auto mb-8 fade-up visible delay-1"></div>

          <p className="text-white text-xs md:text-sm uppercase tracking-[0.25em] font-bold mb-12 max-w-2xl mx-auto leading-relaxed fade-up visible delay-2">
            College + Exchange . The new standard for sustainable student
            exchange.
            <br className="hidden md:block" />
            Buy. Sell. Connect. Without the hassle.
          </p>

          <div className="fade-up visible delay-3">
            <button
              onClick={() => navigate("/explore")}
              className="bg-collex-teal text-white text-sm font-bold py-4 px-12 uppercase tracking-widest rounded-full
                   transition-all duration-300 hover:bg-white hover:text-black
                   hover:shadow-[0_10px_30px_rgba(20,184,166,0.4)] hover:-translate-y-1"
            >
              Discover Now
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white dark:bg-collex-darker">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
              Why Colle<span className="text-collex-teal">X</span>?
            </h2>
            <div className="w-12 h-1 bg-gray-200 dark:bg-gray-800 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon="💸"
              title="Student Budget Friendly"
              text="Skip bookstore markups. Buy directly from peers at prices that make sense."
              delay="delay-1"
            />
            <FeatureCard
              icon="🌱"
              title="Sustainable Future"
              text="Reduce campus waste by giving books, furniture and tech a second life."
              delay="delay-2"
            />
            <FeatureCard
              icon="👥"
              title="Trusted Community"
              text="Verified students only. Meet safely on campus. Build reputation locally."
              delay="delay-3"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-collex-teal text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8 fade-up">
          Ready to clear your dorm?
        </h2>
        <div className="fade-up delay-1">
          <button
            onClick={() => navigate("/sell")}
            className="bg-white text-black font-bold py-4 px-14 uppercase tracking-widest rounded-full
                 transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-1"
          >
            Start Selling
          </button>
        </div>
      </section>
    </>
  );
}
