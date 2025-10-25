"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const session = await fetch("/api/auth/session").then((res) => res.json())
        setUserData(session.user)
      } catch (error) {
        console.log("Erro:", error)
      } finally {
        setLoading(false)
      }
    }

    getUserData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">
          Não foi possível carregar os dados do usuário
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Bem-vindo(a) ao Dashboard
        </h1>

        <div className="text-gray-700 mb-6">
          <p className="mb-2">
            <strong>Nome:</strong> {userData.name || "Não informado"}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="mb-4">
            <strong>Função:</strong> {userData.role}
          </p>
        </div>

        {userData.role === "ADMIN" && (
          <div className="flex justify-center">
            <a
              href="/dashboard/admin"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Acessar Painel Admin
            </a>
          </div>
        )}
      </div>

      <p className="text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} — Dashboard Padrão
      </p>
    </div>
  )
}
