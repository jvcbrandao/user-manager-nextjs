"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LogoutButton from "@/app/components/ui/LogoutButton"

interface User {
    id: string
    name: string
    email: string
    cep: string
    state: string
    city: string
    role: string
    createdAt: string
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [editFormData, setEditFormData] = useState<Partial<User>>({})
    const router = useRouter()

    useEffect(() => {
        const getUserData = async () => {
            try {
                const session = await fetch("/api/auth/session").then(res => res.json())

                if (!session.user || session.user.role !== "ADMIN") {
                    router.push("/dashboard")
                    return
                }

                await loadUsers()
            } catch (error) {
                console.error("Erro:", error)
                router.push("/dashboard")
            } finally {
                setLoading(false)
            }
        }

        getUserData()
    }, [router])

    const loadUsers = async () => {
        try {
            const res = await fetch("/api/users")
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.error("Erro ao carregar usuários:", error)
        }
    }

    const startEdit = (user: User) => {
        setEditingUser(user)
        setEditFormData({ ...user })
    }

    const cancelEdit = () => {
        setEditingUser(null)
        setEditFormData({})
    }

    const handleInputChange = (field: keyof User, value: string) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const saveEdit = async () => {
        if (!editingUser || !editFormData) return

        try {
            const response = await fetch(`/api/users/${editingUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editFormData),
            })

            if (response.ok) {
                await loadUsers()
                cancelEdit()
                alert("Usuário atualizado com sucesso!")
            } else {
                const error = await response.json()
                alert(`Erro ao atualizar usuário: ${error.error}`)
            }
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error)
            alert("Erro ao atualizar usuário")
        }
    }

    const deleteUser = async (userId: string, userName: string) => {
        if (!confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
            return
        }

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
            })

            if (response.ok) {
                await loadUsers()
                alert("Usuário excluído com sucesso!")
            } else {
                const error = await response.json()
                alert(`Erro ao excluir usuário: ${error.error}`)
            }
        } catch (error) {
            console.error("Erro ao excluir usuário:", error)
            alert("Erro ao excluir usuário")
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header com título e botão de sair */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Painel Administrativo</h1>
                        <p className="text-gray-600">Total de usuários: {users.length}</p>
                    </div>
                    <LogoutButton />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-700">Nome</th>
                                <th className="text-left p-4 font-medium text-gray-700">Email</th>
                                <th className="text-left p-4 font-medium text-gray-700">CEP</th>
                                <th className="text-left p-4 font-medium text-gray-700">Estado</th>
                                <th className="text-left p-4 font-medium text-gray-700">Cidade</th>
                                <th className="text-left p-4 font-medium text-gray-700">Função</th>
                                <th className="text-left p-4 font-medium text-gray-700">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4">
                                        {editingUser?.id === user.id ? (
                                            <input
                                                type="text"
                                                value={editFormData.name || ""}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            />
                                        ) : (
                                            <div className="font-medium text-gray-800">
                                                {user.name || 'Nome não informado'}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editingUser?.id === user.id ? (
                                            <input
                                                type="email"
                                                value={editFormData.email || ""}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            />
                                        ) : (
                                            <div className="text-gray-600">{user.email}</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editingUser?.id === user.id ? (
                                            <input
                                                type="text"
                                                value={editFormData.cep || ""}
                                                onChange={(e) => handleInputChange("cep", e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            />
                                        ) : (
                                            <div className="text-gray-600">{user.cep || 'Não informado'}</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editingUser?.id === user.id ? (
                                            <input
                                                type="text"
                                                value={editFormData.state || ""}
                                                onChange={(e) => handleInputChange("state", e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            />
                                        ) : (
                                            <div className="text-gray-600">{user.state || 'Não informado'}</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editingUser?.id === user.id ? (
                                            <input
                                                type="text"
                                                value={editFormData.city || ""}
                                                onChange={(e) => handleInputChange("city", e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            />
                                        ) : (
                                            <div className="text-gray-600">{user.city || 'Não informado'}</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editingUser?.id === user.id ? (
                                            <select
                                                value={editFormData.role || "USER"}
                                                onChange={(e) => handleInputChange("role", e.target.value)}
                                                className="border border-gray-300 rounded px-2 py-1 w-full text-black"
                                            >
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                        ) : (
                                            <span className={`px-2 py-1 text-xs rounded ${user.role === 'ADMIN'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editingUser?.id === user.id ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={saveEdit}
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => startEdit(user)}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.id, user.name || user.email)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Nenhum usuário cadastrado
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}