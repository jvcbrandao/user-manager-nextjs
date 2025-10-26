"use client"

import { useEffect, useState } from "react"
import LogoutButton from "@/app/components/ui/LogoutButton"

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard do Usuário</h1>
            <p className="text-gray-600">Bem-vindo(a) ao sistema</p>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Seus Dados
          </h2>

          <div className="text-gray-700 mb-6">
            <p className="mb-3">
              <strong>Nome:</strong> {userData.name || "Não informado"}
            </p>
            <p className="mb-3">
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

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} — Dashboard Padrão
          </p>
        </div>
      </div>
    </div>
  )
}