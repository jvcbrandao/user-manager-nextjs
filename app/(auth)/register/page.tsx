"use client";

import { useState, FormEvent, useRef } from "react";

export default function Page() {
    const [senha, setSenha] = useState<string>("");
    const [confirmaSenha, setConfirmaSenha] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const completaEndereco = useRef<HTMLInputElement>(null);

    async function handleCepBlur() {

        const cep = completaEndereco.current?.value.replace(/\D/g, "");


        if (!cep || cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                (document.getElementById("inputEstado") as HTMLInputElement).value = data.uf;
                (document.getElementById("inputCidade") as HTMLInputElement).value = data.localidade;
            } else {
                alert("CEP não encontrado.");
            }
        } catch (err) {
            console.error("Erro ao buscar CEP:", err);
        }
    }
    function validarSenha(senha: string, confirmaSenha: string): string[] {
        const erros: string[] = [];

        if (senha.length < 8) erros.push("A senha deve ter pelo menos 8 caracteres.");
        if (!/[A-Z]/.test(senha)) erros.push("A senha deve ter pelo menos uma letra maiúscula.");
        if (!/[a-z]/.test(senha)) erros.push("A senha deve ter pelo menos uma letra minúscula.");
        if (!/[0-9]/.test(senha)) erros.push("A senha deve ter pelo menos um número.");
        if (!/[!@#$%^&*]/.test(senha)) erros.push("A senha deve ter pelo menos um caractere especial (!@#$%^&*).");
        if (senha !== confirmaSenha) erros.push("As senhas não coincidem.");

        return erros;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const erros = validarSenha(senha, confirmaSenha);
        setErrors(erros);

        if (erros.length === 0) {
            const formData = {
                name: (document.getElementById("inputNome") as HTMLInputElement).value,
                email: (document.getElementById("inputEmail") as HTMLInputElement).value,
                password: senha,
                cep: (document.getElementById("inputCep") as HTMLInputElement).value,
                state: (document.getElementById("inputEstado") as HTMLInputElement).value,
                city: (document.getElementById("inputCidade") as HTMLInputElement).value,
            };

            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Usuário criado com sucesso!");
            } else {
                alert("Erro ao criar usuário.");
            }
        }
    };

    return (
        <div className="bg-white flex justify-center items-center min-h-screen flex-col">
            <form
                onSubmit={handleSubmit}
                className="rounded-lg bg-[#f9f6f2] gap-4 text-black flex flex-col w-[400px] p-6"
            >
                <div>
                    <label htmlFor="inputNome">Insira o seu nome:</label>
                    <input required className="rounded border px-4 py-2 w-full bg-white" type="text" id="inputNome" />
                </div>

                <div>
                    <label htmlFor="inputEmail">Insira o seu e-mail:</label>
                    <input required className="rounded border px-4 py-2 w-full bg-white"
                        type="email" id="inputEmail" />
                </div>

                <div>
                    <label htmlFor="inputSenha">Insira a sua senha:</label>
                    <input
                        required
                        className="rounded border px-4 py-2 w-full bg-white"
                        type="password"
                        id="inputSenha"
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="confirmaSenha">Confirme sua senha:</label>
                    <input
                        required
                        className="rounded border px-4 py-2 w-full bg-white"
                        type="password"
                        id="confirmaSenha"
                        onChange={(e) => setConfirmaSenha(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="inputCep">Informe o seu CEP:</label>
                    <input className="rounded border px-4 py-2 w-full bg-white"
                        onBlur={handleCepBlur}
                        ref={completaEndereco} type="text" id="inputCep" />
                </div>

                <div>
                    <label htmlFor="inputEstado">Informe seu estado:</label>
                    <input className="rounded border px-4 py-2 w-full bg-white" type="text" id="inputEstado" />
                </div>

                <div>
                    <label htmlFor="inputCidade">Informe sua cidade:</label>
                    <input className="rounded border px-4 py-2 w-full bg-white" type="text" id="inputCidade" />
                </div>

                {errors.length > 0 && (
                    <ul className="text-red-500 text-sm list-disc list-inside">
                        {errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                )}

                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-colors">
                    Enviar
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-2">
                Já tem uma conta?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                    Login
                </a>
            </p>
        </div>
    );
}