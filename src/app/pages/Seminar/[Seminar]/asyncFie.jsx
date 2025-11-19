"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import styles from "./styles.module.css"
import img1 from "../../../../../public/imagebebas/download.jpeg"
import img2 from "../../../../../public/imagebebas/logo dice 25.png"
import img3 from "../../../../../public/imagebebas/logo sensation.png"
import img4 from "../../../../../public/imagebebas/PNUP (1).png"
import img5 from "../../../../../public/imagebebas/Gambar_WhatsApp_2025-11-05_pukul_23.46.30_f3b38eab-removebg-preview - Copy.png"


export default function HalNew({ seminarId }) {
    const router = useRouter()
    const [sem, setSem] = useState(null)
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
        if (!seminarId) return; // pastikan ID valid dulu
        console.log(seminarId);


        const getSeminar = async () => {
            try {
                const url = await fetch(`/api/handleSeminar/${seminarId}`, { cache: "no-store" });
                const res = await url.json();
                if (res?.data) setSem(res.data);
                console.log(res.data);

            } catch (err) {
                console.error("Gagal fetch data:", err);
            }
        };


        getSeminar();
    }, [seminarId]);

    const toggleSidebar = () => setShowSidebar(!showSidebar)

    return (
        <div className="bg-white text-black">
            <header className={styles.header}>
                <div className="flex items-center justify-center h-auto">
                                <Image src={img5} className="w-11 h-11" width={200} height={200} alt="Altaf"></Image>
                                <h1 className="font-light">Beasiswara</h1>
                                </div>
                <nav className={styles.nav}>
                    <Link href="/">Beranda</Link>
                    <Link href="/pages/Beasiswa">Beasiswa</Link>
                    <Link href="/pages/Seminar">Seminar</Link>
                    <Link href="/pages/Seminar">Kembali</Link>
                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
            </header>

            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href="/">Beranda</Link>
                <Link href="/pages/Beasiswa">Beasiswa</Link>
                <Link href="/pages/Seminar">Seminar</Link>
                <Link href="/pages/Seminar">Kembali</Link>
            </div>

            {sem && (
                <div>
                    <div className="p-4">
                        <div className="text-[1.3rem] font-semibold">{sem.title}</div>
                    </div>

                    <div className="flex gap-8 p-4">
                        <Image
                            src={sem.imageSem}
                            width={200}
                            height={200}
                            className="w-auto h-auto object-cover shadow-2xl rounded-xl"
                            priority
                            alt="seminar"
                        />
                    </div>

                    <div className="p-4">
                        <div className="md:w-200 w-[20rem] whitespace-pre-line">{sem.deskripsi}</div>
                    </div>

                    <div className="px-4">
                        <button className="p-4 bg-blue-900 text-white rounded-2xl" onClick={() => router.push(sem.linkSem)}>Daftar Sekarang</button>
                    </div>
                </div>
            )}

            <br />


            <footer className={styles.footerNew}>
                <div className={styles.footerCol}>
                    <h4>Relationship Partner</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <Image src={img4} className="w-8 h-8 object-cover" alt="Logo Beasiswara" width="130" />
                        <Image src={img3} className="w-8 h-8 object-cover" alt="Logo Beasiswara" width="130" />
                        <Image src={img2} className="w-8 h-8 object-cover" alt="Logo Beasiswara" width="130" />
                    </div>

                </div>

                <div className={styles.footerCol}>
                    <h4>Beasiswara</h4>
                    <ul>
                        <li><Link href={"/"}>Beranda</Link></li>
                        <li><Link href={"../../pages/Beasiswa"}>Beasiswa</Link></li>
                        <li><Link href={"../../pages/Seminar"}>Seminar</Link></li>
                        <li><Link href={"../../pages/IdCard"}>Team</Link></li>
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h4>Hubungi Kami</h4>
                    <p>Jadwal : Senin–Minggu 08.00–22.00</p>
                    <Link href={"https://wa.me/082156779245?text=Halo%20kak%20Ganteng!"}>Nomor : +62 821-5677-9245 (Admin 1 Argazora)</Link> <br />
                    <Link href={"https://wa.me/081355442332?text=Halo%20kak%20Tampan!"}>Nomor : +62 813-5544-2332 (Admin 2 Altaf )</Link>
                    <p>Provinsi : Sulawesi Selatan</p>
                </div>
            </footer>
        </div>
    )
}
