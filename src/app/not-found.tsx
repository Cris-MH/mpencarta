import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span className="text-6xl mb-4" aria-hidden="true">🔍</span>
      <h1 className="text-4xl font-bold text-primary-700 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        ¡Ups! Esta página no existe
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-full hover:from-primary-700 hover:to-primary-800 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
