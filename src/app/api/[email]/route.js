import { prisma } from "../../lib/prisma/prisma"

export async function GET(req, { params }) {
    try {
       
        const { email } = await params;

       
        const decodedEmail = decodeURIComponent(email);
        console.log("Email yang diterima:", decodedEmail);

        
        const user = await prisma.Account.findUnique({
            where: { email: decodedEmail },
            select: {
                username: true,
                email: true,
                image_Account: true,
            },
        });

        if (!user) {
            return Response.json({ message: "User tidak ditemukan!" }, { status: 404 });
        }

        return Response.json(user, { status: 200 });
    } catch (error) {
        console.error("Error get user:", error);
        return Response.json({ message: "Server error!" }, { status: 500 });
    }
}
