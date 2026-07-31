import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div
        data-slot="card"
        className="flex w-full max-w-lg flex-col rounded-xl border-0 bg-white/80 py-6 shadow-lg"
      >
        <div data-slot="card-content" className="px-6 pt-8 pb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-red-100" />
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold text-slate-900">404</h1>

          <h2 className="mb-4 text-xl text-slate-700">Página não encontrada</h2>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={handleGoHome}
              className="vaporwave-button"
              aria-label="Saiba mais sobre Ju MC"
            >
              VOLTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
