import { prisma } from "@/app/lib/prisma/prisma";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 3;

    const data = await prisma.beasiswa.findMany({
        take: limit,
        orderBy: { tanggalbea: "desc" },
    });

    return Response.json({ data });
}