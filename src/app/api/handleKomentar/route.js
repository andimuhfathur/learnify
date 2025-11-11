`use server`

import { prisma } from "@/app/lib/prisma/prisma"

export async function POST(req) {
    try {

        const formData = await req.formData()
        const nsme = await formData.get("username")
        const isikomen = await formData.get("komen")
       
        if (!isikomen || !nsme) {
            console.log("data yang masukkan tidak lengkap");
            return Response.json({message : "Data yang anda masukkan tidak lengkap"}, {status : 400})
        }
      

        const createkomen = await prisma.Komentar.create({
            data: {
                username :nsme,
                isiKomentar: isikomen
            }
        })

        if (createkomen) {
            console.log("komentar Berhasil Terupload");
            return Response.json({ message: "komentar Berhasil Di Upload" }, { status: 201 })
        }

    } catch (err) {
        console.log("komentar Gagal Terupload", err);
        return Response.json({ message: "komentar Gagal Di Upload" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function GET(req) {
    try {
        const dataBea = await prisma.Komentar.findMany()

        if (dataBea.length > 0) {
            console.log(`data Bea : \n ${dataBea}`);
            return Response.json({ message: "data Bea ada", data : dataBea }, { status: 202 })
        }

        console.log("data belum ada")
        return Response.json({ message: "data belum ada" }, { status: 404 })

    } catch (err) {
        console.log(`data Bea : \n `,err);
        return Response.json({ message: "masalah bang" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
