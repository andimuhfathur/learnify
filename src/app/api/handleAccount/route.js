`use server`
import { existsSync, mkdirSync, writeFileSync } from "fs"
import path from "path"
import { prisma } from "../../lib/prisma/prisma"
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function POST(req) {
    try {

        // Pengambilan Data
        const formData = await req.formData()

        const username = formData.get("username")
        const image = formData.get("image")
        const email = formData.get("email")
        const password = formData.get("password")

        // penegecekan jika user tidak mengisi form

        if (!username || !image || !email || !password) {
            console.log("data user tidak lengkap");
            return Response.json({message : "Permisi Data Anda Tidak Lengkap"}, {status: 400})
        }

        const cekuser = await prisma.Account.findUnique({
            where: {
                email : email
            }
        })

        if (cekuser) {
            console.log("Data user sudah ada");
            return Response.json({message : "data sudah ada"}, {status : 409})
        }

        const buffer = Buffer.from(await image.arrayBuffer());
        const base64 = buffer.toString("base64");
        const dataUri = `data:${image.type};base64,${base64}`;


        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "account", // semua gambar disimpan di folder "beasiswa"
        });

        const createAccount = await prisma.Account.create({
            data: {
                username: username,
                image_Account: uploadResult.secure_url,
                email: email,
                password : password
            }
        })

        if(createAccount){
            console.log(`Data Berhasil Di simpan : \n ${createAccount.data}`);
            return Response.json({message : "Account berhasil dibuat"}, {status : 201})
        }


    } catch (error) {
        console.log("Register Gagal", error);
        
        return Response.json({message : "Gagal Register"}, {status : 500})
       
    } finally {
       await prisma.$disconnect()
    }
}

export async function GET(req) {

    try {
        const dataAccount = await prisma.Account.findMany()

        if (dataAccount) {
            console.log(`data user : \n ${dataAccount}`);
            
            return Response.json({ message: "data user ada", data : dataAccount }, {status: 202})
        }
    } catch (err) {
        console.error("data user gagal diperlihatkan", err);
        return Response.json({ message: "data user tidak ada" }, { status: 500 })
    } finally {
       await prisma.$disconnect()
   }

}

export async function PUT(req) {
    try {
        const formData = await req.formData()

        const id_Pas = await formData.get("id")
        const newPass = await formData.get("password")

        if (!id_Pas || !newPass) {
            console.log("id pass tidak terisi");
            return Response.json({message : "password, tidak di temukan"}, {status: 400})
        }

        const cekmel = await prisma.Account.findUnique({
            where: {
                email : id_Pas
            }
        })

        if (!cekmel) {
            console.log("Email tidak temukan");
            return Response.json({message : "email anda tidak di temukan"}, {status: 404})
        }

        const updatePass = await prisma.Account.update({
            where: {
                email : id_Pas
            }, 
            data: {
                password : newPass
            }
        })

        if (updatePass) {
            console.log("password berhasil diupdate");
            return Response.json({message : "password berhasil diupdate"}, {status : 201})
        }
    } catch (err) {
        console.log("password gagal diupdate",err);
        return Response.json({ message: "password gagal diupdate" }, { status: 500 })
    } finally {
      await  prisma.$disconnect()
    }
}