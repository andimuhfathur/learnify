`use server`
import { prisma } from "../../lib/prisma/prisma"

export async function POST(req) {
    try {
        const formData = await req.formData()
        const email = await formData.get("email")
        const password = await formData.get("password")

        if (!email || !password) {
            console.log("USer Tidak Mengisi Form");
            return Response.json({message : "user belum memberi data"}, {status: 400}) 
        }

       

        const cekemail = await prisma.Account.findUnique({
            where: {
                email : email
            }
        })

        if (!cekemail) {
            console.log("useer belum login");
            return Response.json({message : "user belum login"}, {status: 409})
        }

        console.log("user sudah login");
        return Response.json({message : "user telah login", data : cekemail.email}, {status: 201})
    } catch (err) {
        console.log("user gagal login");
        return Response.json({ message: "user gagal login" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}