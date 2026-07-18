import { useNavigate } from "react-router-dom";
import useFadeUp from "../hooks/useFadeUp";

function FeatureCard({ icon, title, text, delay }) {
  return (
    <div
      className={`group relative p-8 rounded-[2rem] overflow-hidden
                bg-white/40 dark:bg-white/[0.04] backdrop-blur-xl
                border border-white/60 dark:border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                hover:shadow-[0_16px_48px_rgba(20,184,166,0.18)]
                transition-all duration-500 hover:-translate-y-2
                fade-up ${delay}`}
    >
      {/* subtle glass sheen */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-collex-teal/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        className="relative w-16 h-16 mb-6 flex items-center justify-center text-3xl rounded-[1.25rem]
                   bg-gradient-to-br from-collex-teal/20 to-collex-teal/5
                   border border-collex-teal/20"
      >
        {icon}
      </div>
      <h3 className="relative text-xl font-bold uppercase tracking-wide mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="relative text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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
      <section className="relative min-h-[calc(100vh-6rem)] w-full flex items-center justify-center overflow-hidden bg-gray-900 py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-90"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/10"></div>
        </div>

        {/* floating glass blobs for ambience */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-collex-teal/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-[10%] w-72 h-72 rounded-full bg-collex-teal/10 blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* glass eyebrow pill */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 fade-up visible">
            <span className="w-1.5 h-1.5 rounded-full bg-collex-teal animate-pulse" />
            <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-semibold">
              Now live on campus
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tight mb-6 fade-up visible">
            Colle<span className="text-collex-teal">X</span>
            <br className="md:hidden" />
            Is Campus
          </h1>

          <div className="w-24 h-1 rounded-full bg-collex-teal mx-auto mb-8 fade-up visible delay-1"></div>

          <p className="text-white text-xs md:text-sm uppercase tracking-[0.25em] font-bold mb-12 max-w-2xl mx-auto leading-relaxed fade-up visible delay-2">
            College + Exchange . The new standard for sustainable student
            exchange.
            <br className="hidden md:block" />
            Buy. Sell. Connect. Without the hassle.
          </p>

          <div className="fade-up visible delay-3">
            <button
              onClick={() => navigate("/explore")}
              className="relative bg-collex-teal/90 backdrop-blur-md text-white text-sm font-bold py-4 px-12
                   uppercase tracking-widest rounded-[2rem] border border-white/20
                   transition-all duration-300
                   hover:bg-white hover:text-black hover:rounded-full
                   hover:shadow-[0_10px_40px_rgba(20,184,166,0.5)] hover:-translate-y-1
                   active:translate-y-0"
            >
              Discover Now
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white dark:bg-collex-darker relative overflow-hidden">
        {/* ambient background blobs */}
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-collex-teal/5 blur-3xl -z-0" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16 fade-up">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-collex-teal bg-collex-teal/10 border border-collex-teal/20">
              The Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
              Why Colle<span className="text-collex-teal">X</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="relative py-24 text-center overflow-hidden bg-gradient-to-br from-collex-teal to-teal-600">
        {/* glass panel floating inside the CTA */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 py-14 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8 fade-up">
            Ready to clear your dorm?
          </h2>
          <div className="fade-up delay-1">
            <button
              onClick={() => navigate("/sell")}
              className="bg-white/90 backdrop-blur-md text-black font-bold py-4 px-14
                   uppercase tracking-widest rounded-[2rem] border border-white/40
                   transition-all duration-300
                   hover:bg-black hover:text-white hover:rounded-full hover:-translate-y-1
                   active:translate-y-0"
            >
              Start Selling
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
