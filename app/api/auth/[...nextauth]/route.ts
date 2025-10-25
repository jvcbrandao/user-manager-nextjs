import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const usuario = await prisma.user.findFirst({
                    where: { email: credentials.email },
                })

                if (!usuario) return null

                const isValid = await bcrypt.compare(credentials.password, usuario.password)
                if (!isValid) return null

                return {
                    id: String(usuario.id),
                    name: usuario.name || "Usuário",
                    email: usuario.email,
                    role: usuario.role || "USER",
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            // Correção: Adiciona id e role ao token
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            // Correção: Adiciona id e role à session
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
})

export { handler as GET, handler as POST }