import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div
        data-slot="card"
        className="flex flex-col rounded-xl py-6 w-full max-w-lg shadow-lg border-0 bg-white/80"
      >
        <div data-slot="card-content" className="pt-8 pb-8 px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>

          <h2 className="text-xl text-slate-700 mb-4">Página não encontrada</h2>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoHome}
              className="vaporwave-button"
              aria-label="Saiba mais sobre MC Ju"
            >
              VOLTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
