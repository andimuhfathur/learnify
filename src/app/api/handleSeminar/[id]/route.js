"use server"

import { prisma } from "@/app/lib/prisma/prisma"

export async function GET(req, context) {
    try {
        const { id } = await context.params  

        const berita = await prisma.Seminar.findUnique({
            where: { idSeminar: id },
        })

        return Response.json({ data: berita }, { status: 200 })
    } catch (error) {
        console.error(error)
        return Response.json({ error: error.message }, { status: 500 })
    }finally {
        await prisma.$disconnect()
    }
}
