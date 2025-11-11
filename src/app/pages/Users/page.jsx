"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import img5 from "../../../../public/imagebebas/Gambar_WhatsApp_2025-11-05_pukul_23.46.30_f3b38eab-removebg-preview - Copy.png"



const UserPage = () => {
   
    const router = useRouter();
    const [user, setUser] = useState(null);
     const [showSidebar, setShowSidebar] = useState(false);
     

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {

                const email = localStorage.getItem("userEmail")

                if (!email) {
                    toast.error("Silakan login terlebih dahulu!");
                    router.push("/pages/Login");
                    return;
                }

                console.log("Email dari localStorage:", email); // cek dulu di console


                const res = await fetch(`/api/${encodeURIComponent(email)}`);
                const data = await res.json();

                if (res.ok) {
                    setUser(data);
                    toast.success(`Selamat datang, ${data.email}!`, {
                        duration: 3000,
                        position: "top-center",
                    });
                } else {
                    toast.error(data.message || "Gagal memuat data user!");
                    router.push("/pages/Login");
                }
            } catch (err) {
                toast.error("Server error!");
                router.push("/pages/Login");
            }
        };
        

        if (typeof window !== "undefined") {
            fetchUser();
        }
    }, [router]);

    const handleLogout = () => {
        toast("Berhasil logout 👋", { icon: "👋" });
        localStorage.removeItem("sudahLogin");
        localStorage.removeItem("userEmail");
        router.push("/");
    };

    if (!user) return null;

    return (
        <div>
            <Toaster position="top-center" />
            <header className={styles.header}>
                            <div className="flex items-center justify-center h-auto">
                                            <Image src={img5} className="w-11 h-11" width={200} height={200} alt="Altaf"></Image>
                                            <h1 className="font-light">Beasiswara</h1>
                                            </div>
                            <nav className={styles.nav}>
                                <Link href={"/"}>Beranda</Link>
                                <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                                <Link href={"../pages/Seminar"}>Seminar</Link>
                                <Link href={"#komentar"}>Komentar</Link>
                    <button className={styles.backBtn} onClick={handleLogout}>
                        Logout
                    </button>
                            </nav>
                            <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
                        </header>
            
            
                        <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                            <Link href={"/"}>Beranda</Link>
                            <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                            <Link href={"../pages/Seminar"}>Seminar</Link>
                            <Link href={"#komentar"}>Komentar</Link>
                <button className={styles.backBtn} onClick={handleLogout}>
                    Logout
                </button>
                        </div>
            {/* <header className={styles.header}>
                <h1>Profil Pengguna</h1>
                
                <Link href={"/"}>Beranda</Link>
                <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                <Link href={"../pages/Seminar"}>Seminar</Link>
                <button className={styles.backBtn} onClick={handleLogout}>
                    Logout
                </button>
            </header> */}

            <div className={styles.container}>
                <Image
                    className={styles.profilePic}
                    src={user.image_Account || "/imagebebas/download.jpeg"}
                    width={300}
                    height={300}
                    alt="Foto Profil"
                />
                <h2 className={styles.h2}>{user.username}</h2>
                <p className={styles.p}>{user.email}</p>
            </div>

            
        </div>
    );
};

export default UserPage;