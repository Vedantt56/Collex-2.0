import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((current) => [
      ...current,
      { id, message, type },
    ]);

    window.setTimeout(() => {
      setToasts((current) =>
        current.filter((toast) => toast.id !== id)
      );
    }, 3500);
  };

  const value = useMemo(
    () => ({ showToast }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-20 z-[60] space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-80 max-w-[calc(100vw-2rem)] rounded-lg border px-4 py-3 text-sm font-semibold shadow-lg ${
              toast.type === "error"
                ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
                : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
