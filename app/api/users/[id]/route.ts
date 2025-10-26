import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route"; // 👈 IMPORTANTE

const prisma = new PrismaClient();

// 🔹 Atualizar usuário (somente ADMIN)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions); // 👈 Adiciona authOptions

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { name, email, cep, state, city, role } = await request.json();

    const userId = isNaN(Number(params.id)) ? params.id : Number(params.id);

    const updatedUser = await prisma.user.update({
      where: { id: userId as any },
      data: {
        name: name || null,
        email,
        cep: cep || null,
        state: state || null,
        city: city || null,
        role,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// 🔹 Excluir usuário (somente ADMIN)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions); // 👈 Adiciona authOptions

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userId = isNaN(Number(params.id)) ? params.id : Number(params.id);
    const sessionUserId = session.user.id;

    if (userId.toString() === sessionUserId.toString()) {
      return NextResponse.json(
        { error: "Não é possível excluir seu próprio usuário" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: userId as any },
    });

    return NextResponse.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
