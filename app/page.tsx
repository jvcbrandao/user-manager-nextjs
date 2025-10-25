"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Gerenciador de Usuários</h1>
      <p className="text-lg mb-8">Para continuar, faça login ou cadastre-se.</p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cadastro
        </Link>
      </div>
    </div>
  );
}
