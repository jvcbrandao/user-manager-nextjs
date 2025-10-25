"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const getUserData = async () => {
            try {
                const session = await fetch("/api/auth/session").then((res) => res.json())

                if (!session.user || session.user.role !== "ADMIN") {
                    router.push("/dashboard")
                    return
                }

                setUserData(session.user)
            } catch (error) {
                console.log("Erro:", error)
                router.push("/dashboard")
            } finally {
                setLoading(false)
            }
        }

        getUserData()
    }, [router])

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
                <p className="text-gray-600 text-lg">Redirecionando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            

            
        </div>
    )
}
