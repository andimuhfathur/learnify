`use server`
 
import path from "path"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import { prisma } from "@/app/lib/prisma/prisma"
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




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

        // const cekSemTitle = await prisma.Seminar.findUnique({
        //     where: {
        //        title : title 
        //     }
        // })

        // if (cekSemTitle) {
        //     console.log("Beasiswa sudah ada");
        //     return Response.json({ message: "Beasiswa sudah ada" }, { status: 409 })
        // }

        const buffer = Buffer.from(await imageBea.arrayBuffer());
        const base64 = buffer.toString("base64");
        const dataUri = `data:${imageBea.type};base64,${base64}`;


        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "seminar", // semua gambar disimpan di folder "beasiswa"
        });

        const createSem = await prisma.Seminar.create({
            data: {
                title: title,
                imageSem: uploadResult.secure_url,
                deskripsi: deskrip,
                linkSem: linkBe,
                deadline: new Date(deadl)
            }
        })

        if (createSem) {
            console.log("Seminar Berhasil Terupload");
            return Response.json({ message: "Seminar Berhasil Di Upload" }, { status: 201 })
        }

    } catch (err) {
        console.log("Seminar Gagal Terupload", err);
        return Response.json({ message: "Seminar Gagal Di Upload" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function GET(req) {
    try {
        const dataSem = await prisma.Seminar.findMany()

        if (dataSem.length > 0) {
            console.log(`data Sem : \n ${dataSem}`);
            return Response.json({ message: "data Bea ada", data : dataSem }, { status: 202 })
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
            const letakFile = path.join(process.cwd(), '/public/iamgeSeminar', nameFile)
            const ubahBuffer = await imageBea.arrayBuffer()

            writeFileSync(letakFile, Buffer.from(ubahBuffer))

            dataUpdate.imageSem = `/imageBeasiswa/${nameFile}`
        } 
        if (deskrip) dataUpdate.deskripsi = deskrip
        if (linkBe) dataUpdate.linkSem = linkBe
        if (deadl) dataUpdate.deadline = deadl
        
        const updateData = await prisma.Seminar.update({
            where: {
                idSeminar : idBea
            },
            data: dataUpdate
        })

        if (updateData) {
            console.log("Seminar Berhasil Terupdate");
            return Response.json({ message: "Seminar Berhasil Di Update" }, { status: 201 })
        }

 
    } catch (err) {
        console.log("Seminar Gagal Terupdate");
        return Response.json({ message: "Seminar Gagal Di Update" }, { status: 500 })
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

        const deleteSem = await prisma.Seminar.delete({
            where: {
                idSeminar : idDel
            }
        })

        if (deleteSem) {
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