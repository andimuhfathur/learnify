"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import img1 from "../../../../public/imagebebas/Foto wisuda.jpg"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Aos from "aos";
import "aos/dist/aos.css";
import img2 from "../../../../public/imagebebas/logo dice 25.png"
import img3 from "../../../../public/imagebebas/logo sensation.png"
import img4 from "../../../../public/imagebebas/PNUP (1).png"
import img5 from "../../../../public/imagebebas/Gambar_WhatsApp_2025-11-05_pukul_23.46.30_f3b38eab-removebg-preview - Copy.png"
import img6 from "../../../../public/imagebebas/Foto wisuda 1.jpg"


const Dashboard = () => {

    const router = useRouter()
    const [showSidebar, setShowSidebar] = useState(false);
    const [username, setusername] = useState("");
    const [isikomen, setisikomen] = useState("");
    const [loading, setLoading] = useState(false);
    const [logi, setlog] = useState(false)
    const [data, setdata] = useState([])

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        const status = localStorage.getItem("sudahLogin")
        if (status === "true") {
            setlog(true)
        } else {
            setlog(false)
        }

        const fetchData = async () => {
            const url = await fetch(`/api/handleKomentar`, { cache: "no-store" })
            const res = await url.json()
            setdata(res.data)
        }
        fetchData()

        Aos.init({
            duration: 800, 
            once: true,    
        });
    }, [])


    const handleKomen = async (e) => {
        e.preventDefault();
        setLoading(true);


        const formData = new FormData();
        formData.append("username", username);
        formData.append("komen", isikomen);


        try {
            const res = await fetch("../../api/handleKomentar?limit=3", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success(data.message || "Anjay Akun Baru😘");
                setusername("");
                setisikomen("");
                setTimeout(() => router.refresh(), 1500);

            } else if (res.status === 400) {
                toast.error(data.message || "Woi Data mu tidak lengkap🤬");
            } else {
                toast.error(data.message || "Gagal mendaftar!");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan pada server!");
            console.error("Error register:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles.page}>
            <Toaster position="top-center" />
            <header className={styles.header}>
                <div className="flex items-center justify-center h-auto">
                <Image src={img5} className="w-11 h-11" width={200} height={200} alt="Altaf"></Image>
                <h1 className="font-light">Beasiswara</h1>
                </div>
                <nav className={styles.nav}>
                    <Link href={"/"}>Beranda</Link>
                    <Link href={"../pages/IdCard"}>Team</Link>
                    <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                    <Link href={"../pages/Seminar"}>Seminar</Link>
                    {logi ? (<Link href={"../pages/Users"} className={styles.loginBtn}>Users</Link>) : (<Link href={"../pages/Login"} className={styles.loginBtn}>Login</Link>)}

                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
            </header>


            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href={"/"}>Beranda</Link>
                <Link href={"../pages/IdCard"}>Team</Link>
                <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                <Link href={"../pages/Seminar"}>Seminar</Link>
                {logi ? (<Link href={"../pages/Users"} className={styles.loginBtn}>Users</Link>) : (<Link href={"../pages/Login"} className={styles.loginBtn}>Login</Link>)}
            </div>

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>Temukan Beasiswa Impianmu </h1>
                    <p>
                        Beasiswara merupakan gabungan dari kata “Beasiswa” dan “Seminar”, yang berarti platform informasi tentang peluang beasiswa dan kegiatan seminar pendidikan. Nama ini mencerminkan semangat belajar dan pengembangan diri bagi pelajar dan mahasiswa.
                    </p>
                    <button onClick={() => router.push("#beasiswaraSec")}>Cari Sekarang</button>
                </div>

                <div className={styles.heroImage}>
                    <Image src={img6} className="object-cover h-80" width={340} height={340} alt="Beasiswara Hero" />
                </div>
            </section>

            <section className={styles.bannerAkhir}>
                <p>Satu Klik Untuk Beasiswa dan Wawasan Baru</p>
            </section>

            <section className={`${styles.beasiswaSection} border-b-2 border-[#ff8c1a]`} id = "beasiswaraSec" >
                <h2 data-aos="fade-up">Maju Bersama Beasiswara</h2>
                <div className={styles.stats}>
                </div>
{/* {logi ? (<Link href={"../pages/Users"} className={styles.loginBtn}>Users</Link>) : (<Link href={"../pages/Login"} className={styles.loginBtn}>Login</Link>)} */ }
                <div className={styles.cardContainer}>
                    <div data-aos="fade-left" className={`${styles.cardBox} ${styles.orange}`}>
                        <h3>Beasiswa Unggulan</h3>
                        <p>
                            Temukan berbagai beasiswa nasional maupun internasional untuk
                            mendukung pendidikanmu. Beasiswara membantu kamu menemukan peluang
                            terbaik sesuai jurusan dan minatmu.
                        </p>
                        <button className="text-black" onClick={() => router.push("/pages/Beasiswa")}>Jelajahi Beasiswa</button>
                    </div>

                    <div data-aos="fade-right" data-aos-delay="400" className={`${styles.cardBox} ${styles.blue}`}>
                        <h3>Seminar Edukatif</h3>
                        <p>
                            Ikuti seminar inspiratif dan edukatif dengan pembicara hebat dari
                            berbagai bidang. Kembangkan kemampuan dan perluas relasi.
                        </p>
                        <button onClick={() => router.push("/pages/Seminar")}>Lihat Seminar</button>
                    </div>


                </div >



            </section >

    <section className="bg-[#F5C542] border-b-2 border-[#ff8c1a]">
        {logi ?
            (
                <div data-aos="zoom-in" className={`${styles.commentBox} border-b-2 border-[#0b3d91]`} id={"komentar"}>
        <h3 className="font-bold text-xl">Bagaimana Pengalaman Anda ?</h3>
        <input className="text-black" type="text" placeholder="Nama kamu..." onChange={(e) => setusername(e.target.value)} />
        <textarea className="text-black" placeholder="Tulis komentar kamu..." onChange={(e) => setisikomen(e.target.value)}></textarea>
        <button onClick={handleKomen}>{loading ? "Kirim Komentar" : "Komentar"}</button>


        <div className={`${styles.commentList} `}>
        {data.map((datas) => {
            return (
                <div key={datas.idKomentar} className={styles.commentItem}>
                    <h4>{datas.username}</h4>
                    <p>{datas.isiKomentar}</p>
                </div>
            )
        })}


    </div>
                        </div >
                    ) : (
    <div data-aos="zoom-in" className={`${styles.commentBox} border-b-2 border-[#0b3d91]`}>
                            <h3 className="font-bold text-xl">Pengalaman Orang</h3>
                            <div className={`${styles.commentList} `}>
                                {data.map((datas) => {
                                    return (
                                        <div key={datas.idKomentar} className={styles.commentItem}>
                                            <h4>{datas.username}</h4>
                                            <p>{datas.isiKomentar}</p>
                                        </div>
                                    )
                                })}


                            </div>
                        </div >
                    )}
            </section >



            <section className={`${styles.tentangKami} border-b-2 `}>
                <h2 data-aos="fade-in">Tentang Kami</h2>
                <p data-aos="zoom-in" data-aos-delay="200">
                    Kami adalah kelompok yang berfokus pada pengembangan dan penyebaran informasi seputar beasiswa serta seminar pendidikan. Tujuan kami adalah membantu pelajar dan mahasiswa mendapatkan peluang belajar yang lebih luas dan bermanfaat.
                </p>
                <div className={styles.tentangGrid}>
                    <div data-aos="zoom-in" data-aos-delay="400">
                        <h3>🎯 Misi</h3>
                        <p>Meningkatkan akses pendidikan dan kesempatan bagi seluruh pelajar Indonesia.</p>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="600">
                        <h3>💡 Visi</h3>
                        <p>Menjadi pusat informasi dan pengembangan pendidikan nomor satu di Indonesia.</p>
                    </div>
                </div>
            </section>

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
                        <li><Link href={"../pages/Beasiswa"}>Beasiswa</Link></li>
                        <li><Link href={"../pages/Seminar"}>Seminar</Link></li>
                        <li><Link href={"../pages/IdCard"}>Team</Link></li>
                    </ul>
                </div>

                <div className={styles.footerCol}>
                    <h4>Hubungi Kami</h4>
                    <p>Jadwal: Senin–Minggu @ 08.00–22.00</p>
                    <p>Nomor: +62 851-7991-3755 (Admin 1 Argazora)</p>
                    <p>Nomor: +62 851-3591-3826 (Admin 2 Altaf )</p>
                    <p>Email: ✉ halo@Beasiswara.id</p>
                    <p>Kota: Makassar</p>
                </div>
            </footer>



        </div >
    );
}

export default Dashboard