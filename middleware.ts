import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Se tentando acessar /dashboard/admin sem ser ADMIN
        if (path.startsWith("/dashboard/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }

        // Se tentando acessar /dashboard sem estar logado
        if (path.startsWith("/dashboard") && !token) {
            return NextResponse.redirect(new URL("/login", req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

export const config = {
    matcher: ["/dashboard/:path*"]
}