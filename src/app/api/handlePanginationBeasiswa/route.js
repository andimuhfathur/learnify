"use server"
import { prisma } from "@/app/lib/prisma/prisma"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        
        const page = parseInt(searchParams.get('page') || '1', 10)
        const limit = parseInt(searchParams.get('page') || '10', 12)

        if (page < 1 || limit < 1) {
            console.log("data salah");
            return Response.json({message : "data salah"}, {status: 409})
            
        }

        const skip = (page - 1) * limit
        
        const [posts, total] = await Promise.all([
            prisma.Beasiswa.findMany({
                skip,
                take: limit,
                orderBy: { tanggalbea: 'desc' },
            }),
            prisma.Beasiswa.count()
        ])

        const totalPage = Math.ceil(total / limit)

        console.log("paginationBerhasil");
        

        return Response.json({
            data: posts,
            meta: {
                page,
                limit,
                total,
                totalPage
            }
        }, { status: 201 })
        
       
        
    } catch (err) {
        console.log("pagination gagal");
        return Response.json({message : "maaf pagination gagal"}, {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}