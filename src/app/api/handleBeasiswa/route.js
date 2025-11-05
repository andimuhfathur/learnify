`use server`
import path from "path"
import { writeFileSync } from "fs"
import { prisma } from "@/app/lib/prisma/prisma"

export async function POST(req) {
    try {

        const formData = await req.formData()

        const title = await formData.get("title")
        const imageBea = await formData.get("imageBea")
        const deskrip = await formData.get("deskrip")
        const linkBe = await formData.get("linkBe")
        const deadl = await formData.get("deadl")

        if (!title || !imageBea || !deskrip || !linkBe || !deadl) {
            console.log("data yang masukkan tidak lengkap");
            return Response.json({message : "Data yang anda masukkan tidak lengkap"}, {status : 400})
        }

        // const cekBeaTitle = await prisma.Beasiswa.findUnique({
        //     where: {
        //        title : title 
        //     }
        // })

        // if (cekBeaTitle) {
        //     console.log("Beasiswa sudah ada");
        //     return Response.json({ message: "Beasiswa sudah ada" }, { status: 409 })
        // }

        const nameFile = `${Date.now()}-${imageBea.name}`
        const letakFile = path.join(process.cwd(), '/public/imageBeasiswa', nameFile)
        const ubahBuffer = await imageBea.arrayBuffer()

        writeFileSync(letakFile, Buffer.from(ubahBuffer))

        const createBea = await prisma.Beasiswa.create({
            data: {
                title: title,
                image_Besiswa: `/imageBeasiswa/${nameFile}`,
                deskripsi: deskrip,
                linkBea: linkBe,
                deadline: new Date(deadl)
            }
        })

        if (createBea) {
            console.log("Beasiswa Berhasil Terupload");
            return Response.json({ message: "Beasiswa Berhasil Di Upload" }, { status: 201 })
        }

    } catch (err) {
        console.log("Beasiswa Gagal Terupload", err);
        return Response.json({ message: "Beasiswa Gagal Di Upload" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function GET(req) {
    try {
        const dataBea = await prisma.Beasiswa.findMany()

        if (dataBea.length > 0) {
            console.log(`data Bea : \n ${dataBea}`);
            return Response.json({ message: "data Bea ada", data : dataBea }, { status: 202 })
        }
    } catch (err) {
        console.log(`data Bea : \n `,err);
        return Response.json({ message: "masalah bang" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function PUT(req) {
    try {
        const formData = await req.formData()

        const idBea = await (Number(formData.get("id") ) || 0)
        const title = await formData.get("titlePut")
        const imageBea = await formData.get("imageBeaPut")
        const deskrip = await formData.get("deskripPut")
        const linkBe = await formData.get("linkBePut")
        const deadl = await formData.get("deadlPut")

        

        const dataUpdate = {}

        if(title) dataUpdate.title = title
        if (imageBea) {
            const nameFile = `${Date.now()}-${imageBea.name}`
            const letakFile = path.join(process.cwd(), '/public/imageBeasiswa', nameFile)
            const ubahBuffer = await imageBea.arrayBuffer()

            writeFileSync(letakFile, Buffer.from(ubahBuffer))

            dataUpdate.imageBea = `/imageBeasiswa/${nameFile}`
        } 
        if(deskrip) dataUpdate.deskrip = deskrip
        if(linkBe) dataUpdate.linkBe = linkBe
        if (deadl) dataUpdate.deadl = deadl
        
        const updateData = await prisma.Beasiswa.update({
            where: {
                id_Beasiswa : idBea
            },
            data: dataUpdate
        })

        if (updateData) {
            console.log("Beasiswa Berhasil Terupdate");
            return Response.json({ message: "Beasiswa Berhasil Di Update" }, { status: 201 })
        }

 
    } catch (err) {
        console.log("Beasiswa Gagal Terupdate");
        return Response.json({ message: "Beasiswa Gagal Di Update" }, { status: 500 })
    } finally {
await prisma.$disconnect()
    }
}

export async function DELETE(req) {
    try {
        const formData = await req.formData()
        const idDel = await (Number(formData.get("id")) || 0)

        if (!idDel) {
            console.log("maaf id tidak di temukan");
            return Response.json({message : "id tidak ditemukan"}, {status: 400})
        }

        const deleteBea = await prisma.Beasiswa.delete({
            where: {
                id_Beasiswa : idDel
            }
        })

        if (deleteBea) {
            console.log("delete berhasil");
            return Response.json({ message: "delete berhasil" }, { status: 201 })
        }
    } catch (err) {
        console.log("delete gagal");
        return Response.json({ message: "delete gagal" }, { status: 500 })
    } finally {
await prisma.$disconnect()
    }
}