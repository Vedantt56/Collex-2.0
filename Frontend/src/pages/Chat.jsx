import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Chat() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const seller = searchParams.get("seller") || "Seller";
  const product = searchParams.get("product") || "Item";

  const [messages, setMessages] = useState([
    { id: 1, from: "seller", text: "Yes it is! I'm on campus today if you want to see it." },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "seller",
          text: "Sounds good! Let me know when you'd like to meet.",
        },
      ]);
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      {/* CHAT HEADER */}
      <header className="bg-white dark:bg-collex-dark border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-xl text-gray-600 hover:text-black"
            >
              ←
            </button>

            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                {seller}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[220px]">
                {product}
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white font-bold text-sm hover:bg-green-600">
            📞 CALL
          </button>
        </div>
      </header>

      {/* CHAT BODY */}
      <section
        id="chatMessages"
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-8"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {/* SYSTEM MESSAGE */}
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full text-xs uppercase tracking-wide bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              Conversation started
            </span>
          </div>

          {/* INITIAL USER MESSAGE */}
          <div className="flex justify-end">
            <div className="bg-collex-teal text-white px-5 py-3 rounded-2xl rounded-br-sm max-w-md shadow">
              Hi! Is this still available?
              <p className="text-[10px] text-right mt-1 opacity-80">
                Just now
              </p>
            </div>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.from === "user" ? (
                <div className="bg-collex-teal text-white px-5 py-3 rounded-2xl rounded-br-sm max-w-md shadow">
                  {m.text}
                  <p className="text-[10px] text-right mt-1 opacity-80">
                    Just now
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl rounded-bl-sm max-w-md border shadow-sm text-gray-800 dark:text-gray-200">
                  {m.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CHAT INPUT */}
      <footer className="bg-white dark:bg-collex-dark border-t border-gray-200 dark:border-gray-800 sticky bottom-0">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <input
            id="chatInput"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-5 py-3 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none text-sm"
          />

          <button
            onClick={sendMessage}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-collex-teal text-white text-xl hover:scale-105 transition"
          >
            ➤
          </button>
        </div>
      </footer>
    </div>
  );
}
