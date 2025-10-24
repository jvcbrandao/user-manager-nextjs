"use client";

export default function Login() {
  return (
    <main className="min-h-screen bg-[#f9f6f2] flex items-center justify-center text-black">
      <section className="bg-white rounded-lg shadow-md w-[360px] p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center mb-2">Login</h1>

        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-sm font-medium">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-2">
          Ainda não tem conta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </section>
    </main>
  );
}
