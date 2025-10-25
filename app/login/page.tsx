"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function loginUsuario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            await signIn("credentials", {
                email,
                password: senha,
                redirect: true,
                callbackUrl: "/dashboard" // Sempre redireciona para /dashboard primeiro
            });
        } catch (error) {
            console.log("Erro no login:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="min-h-screen bg-[#f9f6f2] flex items-center justify-center text-black">
            <section className="bg-white rounded-lg shadow-md w-[360px] p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-center mb-2">Login</h1>

                <form onSubmit={loginUsuario} className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium">
                            E-mail:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha"
                            className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar"}
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