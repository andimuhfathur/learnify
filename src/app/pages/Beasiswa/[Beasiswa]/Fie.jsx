"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import styles from "./style.module.css"
import img1 from "../../../../../public/imagebebas/download.jpeg"
import img2 from "../../../../../public/imagebebas/logo dice 25.png"
import img3 from "../../../../../public/imagebebas/logo sensation.png"
import img4 from "../../../../../public/imagebebas/PNUP (1).png"

export default function HalNew({ seminarId }) {
    const router = useRouter()
    const [sem, setSem] = useState(null)
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
        if (!seminarId) return; // pastikan ID valid dulu
        console.log(seminarId);


        const getSeminar = async () => {
            try {
                const url = await fetch(`/api/handleBeasiswa/${seminarId}`, { cache: "no-store" });
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
                <h1>Beasiswara</h1>
                <nav className={styles.nav}>
                    <Link href="/">Beranda</Link>
                    <Link href="/pages/Beasiswa">Beasiswa</Link>
                    <Link href="/pages/Seminar">Seminar</Link>
                    <Link href="/pages/Beasiswa">Kembali</Link>
                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
            </header>

            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href="/">Beranda</Link>
                <Link href="/pages/Beasiswa">Beasiswa</Link>
                <Link href="/pages/Seminar">Seminar</Link>
                <Link href="/pages/Beasiswa">Kembali</Link>
            </div>

            {sem && (
                <div>
                    <div className="p-4">
                        <div className="text-[1.3rem] font-semibold">{sem.title}</div>
                    </div>

                    <div className="flex gap-8 p-4">
                        <Image
                            src={sem.image_Besiswa}
                            width={200}
                            height={200}
                            className="w-200 h-100 object-cover shadow-2xl rounded-xl"
                            priority
                            alt="seminar"
                        />
                    </div>

                    <div className="p-4">
                        <p className="md:w-200 w-[20rem] whitespace-pre-line">{sem.deskripsi}</p>
                    </div>

                    <div className="px-4">
                        <button className="p-4 bg-blue-900 text-white rounded-2xl" onClick={() => router.push(sem.linkBea)}>Daftar Sekarang</button>
                    </div>
                </div>
            )}

            <br />


            <footer className={styles.footerNew}>
                <div className={styles.footerCol}>
                    <h4>Relationship Partner</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <Image src={img2} className="w-8 h-8 object-cover" alt="Logo Beasiswara" width="130" />
                        <Image src={img3} className="w-8 h-8 object-cover" alt="Logo Beasiswara" width="130" />
                        <Image src={img4} className="w-8 h-8 object-cover" alt="Logo Beasiswara" width="130" />
                    </div>

                </div>

                <div className={styles.footerCol}>
                    <h4>Beasiswara</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Kerja Sama</li>
                        <li>Karier</li>
                        <li>Kebijakan Privasi</li>
                        <li>Syarat & Ketentuan</li>
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h4>Hubungi Kami</h4>
                    <p>Senin–Minggu @ 08.00–22.00</p>
                    <p>📱 +62 851-7991-3755 (Admin 1 Argazora)</p>
                    <p>📱 +62 851-3591-3826 (Admin 2 Altaf )</p>
                    <p>✉ halo@Beasiswara.id</p>
                    <p>📍 Sulawesi Selatan</p>
                </div>
            </footer>
        </div>
    )
}
