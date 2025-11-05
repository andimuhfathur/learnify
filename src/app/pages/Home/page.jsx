"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import img1 from "../../../../public/imagebebas/Gambar WhatsApp 2025-11-02 pukul 14.27.23_1406a9cc.jpg"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { ReactTyped } from "react-typed";




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
            const url = await fetch( `/api/handlelimitbeasiswa`, { cache: "no-store" })
            const res = await url.json()
            setdata(res.data)
        }
        fetchData()
    }, [])


    const handleKomen = async (e) => {
        e.preventDefault();
        setLoading(true);


        const formData = new FormData();
        formData.append("username", username);
        formData.append("komen", isikomen);


        try {
            const res = await fetch("../../api/handleKomentar", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success(data.message || "Anjay Akun Baru😘");
                setusername("");
                setisikomen("");
                setTimeout(() => router.push("/"), 1500);
                
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
        <div className={styles.body}>
            <Toaster position="top-center" />
            <header className={styles.header}>
                <h1>Beasiswara</h1>
                <nav className={styles.nav}>
                    <Link href={"/"}>Beranda</Link>
                    <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                    <Link href={"../pages/Seminar"}>Seminar</Link>
                    <Link href={"#komentar"}>Komentar</Link>
                    {logi ? (<Link href={"../pages/Users"} className={styles.loginBtn}>Users</Link>) : (<Link href={"../pages/Login"} className={styles.loginBtn}>Login</Link>)}
                    
                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
            </header>


            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href={"/"}>Beranda</Link>
                <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                <Link href={"../pages/Seminar"}>Seminar</Link>
                <Link href={"#komentar"}>Komentar</Link>
                <Link href={"../pages/Login"} >Login</Link>
            </div>


            {/* <section className={styles.hero}>
                <div className={styles.heroText}>
                    <h2 className="font-bold">Belajar, Berkembang, dan Raih Beasiswa Impianmu</h2>
                    <p>
                        Learnify membantu siswa dan mahasiswa menemukan berbagai informasi
                        beasiswa serta seminar edukatif yang bermanfaat.
                    </p>
                    <button onClick={() => router.push("#akucintakamu")}>Mulai Sekarang</button>
                </div>
                <Image src={img1} width={300} height={300} alt="gambar Dahboard"></Image>
            </section> */}

            <section className={styles.hero}>
                <div className={styles.parallax}></div>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h2 className="font-bold">Belajar, Berkembang, dan Raih Beasiswa Impianmu</h2>
                        <p>
                            Learnify membantu siswa dan mahasiswa menemukan berbagai informasi
                            beasiswa serta seminar edukatif yang bermanfaat.
                        </p>
                        <button onClick={() => router.push("#akucintakamu")}>
                            Mulai Sekarang
                        </button>
                    </div>
                    {/* <Image
                        src={img1}
                        width={300}
                        height={300}
                        alt="gambar Dahboard"
                        className={styles.heroImage}
                    /> */}
                </div>
            </section>





            <section className={styles.container} id="akucintakamu">
                <h3 className="font-bold">Jelajahi Beasiswara</h3>
                <div className={styles.cardGrid}>
                    <div className={styles.card} onClick={() => router.push("../pages/Beasiswa")}>🎓Beasiswa</div>
                    <div className={styles.card} onClick={() => router.push("../pages/Seminar")}>📚Seminar</div>
                </div>
                <br />
                {/* <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                    {data.map((iloveyou) => {
                        return (
                            <div className="bg-teal-800 text-white rounded-2xl w-64 h-auto shadow-lg p-8 " key={iloveyou.id_Beasiswa}>
                                <h2 className="text-2xl font-bold mb-4">
                                    {iloveyou.title}
                                </h2>
                                <p className="text-base leading-relaxed mb-6">
                                    {iloveyou.deskripsi}
                                </p>
                                <button className="bg-white text-teal-800 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all">
                                    Kami Siap Membantumu
                                </button>
                            </div>
)
                    })}
                   
                    
                </div> */}
            </section>


            <section className={styles.komentar} id="komentar">
                <h3 className="font-bold">Bagiamana Pengalaman Anda ?</h3>
                <form>
                    <input type="text" placeholder="Nama Anda" value={username} onChange={(e) => setusername(e.target.value)} required />
                    <textarea rows="4" placeholder="Tulis komentar..." value={isikomen} onChange={(e) => setisikomen(e.target.value)} required></textarea>
                    <button type="submit" onClick={handleKomen}>{loading ? "Mengirim Komen" : "Kirim Komentar"}</button>
                </form>
            </section>


            <section className={styles.about} id="tentang">
                <h3>Tentang Kami</h3>
                <p>
                    Learnify adalah platform pendidikan yang menyediakan informasi beasiswa
                    dan seminar untuk membantu pelajar dan mahasiswa mengembangkan potensi
                    diri. Kami berkomitmen untuk menjadi jembatan antara siswa dan peluang
                    pendidikan terbaik.
                </p>
            </section>


            <footer className={styles.footer}>
                © 2025 Learnify. Semua Hak Dilindungi.
            </footer>
        </div>
    );
}

export default Dashboard