import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password, cep, state, city, role } = body;


        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Nome, e-mail e senha são obrigatórios." },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "E-mail já cadastrado." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                cep,
                state,
                city,
                role,
            },

            select: {
                id: true,
                name: true,
                email: true,
                cep: true,
                state: true,
                city: true,
                role: true
            },
        });

        return NextResponse.json(
            { message: "Usuário criado com sucesso!", user },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor." },
            { status: 500 }
        );
    }
}
