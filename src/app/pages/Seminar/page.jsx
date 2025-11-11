"use client";

import { useRouter } from "next/navigation";
import styles from "./seminar.module.css";
import img1 from "../../../../public/imagebebas/download.jpeg";
import img2 from "../../../../public/imagebebas/logo dice 25.png"
import img3 from "../../../../public/imagebebas/logo sensation.png"
import img4 from "../../../../public/imagebebas/PNUP (1).png"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Seminar = () => {
    const router = useRouter();
    const [showSidebar, setShowSidebar] = useState(false);
    const [data, setData] = useState([]);
    const [logi, setLog] = useState(false);

    // pagination states
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const status = localStorage.getItem("sudahLogin");
            setTimeout(() => {
                setLog(status === "true");
            }, 0);
        }
    }, []);

    // fetch data seminar dari API pagination
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`../../api/handlePaginationSeminar?page=${page}&limit=6`, {
                    cache: "no-store",
                });
                const result = await res.json();
                setData(result.data);
                setTotalPage(result.meta.totalPage);
            } catch (err) {
                console.error("Gagal memuat data:", err);
            }
        };
        fetchData();
    }, [page]);

    // tombol pagination
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPage) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className={styles.body}>
            {/* Header */}
            <header className={styles.header}>
                <h1>Beasiswara</h1>
                <nav className={styles.nav}>
                    <Link href={"/"}>Beranda</Link>
                    <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                    <Link href={"../pages/Seminar"}>Seminar</Link>
                    {logi ? (
                        <Link href={"../pages/Users"} className={styles.loginBtn}>
                            Users
                        </Link>
                    ) : (
                        <Link href={"../pages/Login"} className={styles.loginBtn}>
                            Login
                        </Link>
                    )}
                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>
                    ☰
                </span>
            </header>

            {/* Sidebar */}
            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href={"/"}>Beranda</Link>
                <Link href={"../pages/Beasiswa"}>Beasiswa</Link>
                <Link href={"../pages/Seminar"}>Seminar</Link>
                {logi ? (
                    <Link href={"../pages/Users"} className={styles.loginBtn}>
                        Users
                    </Link>
                ) : (
                    <Link href={"../pages/Login"} className={styles.loginBtn}>
                        Login
                    </Link>
                )}
            </div>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>Seminar</h1>
                </div>
            </section>

            <hr />

            {/* Daftar Seminar */}
            <section className={styles.page}>
                <div className={styles.card}>
                    <ul className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2">
                       
                        {data.length > 0 ? (
                            data.map((datas) => (
                                <article
                                    key={datas.idSeminar}
                                    className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <div className="relative h-44 w-full overflow-hidden">
                                        <Image
                                            src={datas.imageSem}
                                            width={300}
                                            height={300}
                                            alt={datas.title}
                                            className="object-cover w-full h-full brightness-90 hover:scale-105 transform transition-all duration-500"
                                        />
                                        <div className="absolute left-4 top-4 flex gap-2">
                                            <span className="text-xs font-medium bg-white/80 px-2 py-1 rounded-full shadow-sm">
                                                Seminar
                                            </span>
                                        </div>
                                        <div className="absolute right-4 top-4">
                                            
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold text-slate-800 leading-tight line-clamp-2">
                                            {datas.title}
                                        </h3>
                                        

                                        <p className="text-sm text-slate-600 mt-3 mb-4 line-clamp-3">
                                            {datas.deskripsi}
                                        </p>

                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-xs text-slate-500">Batas waktu</p>
                                                <p
                                                    className={`text-sm font-medium ${new Date(datas.deadline) < new Date() ? "text-red-600" : "text-green-600"
                                                        }`}
                                                >
                                                    {new Date(datas.deadline).toISOString().split("T")[0]}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        router.push(`/pages/Seminar/${datas.idSeminar}`)
                                                    }
                                                    className="px-4 py-2 rounded-xl  text-white text-sm font-semibold shadow bg-[#ff8c1a] active:scale-95 transition-transform"
                                                >
                                                    Read More...
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                                          
                                            <span>Level: S1</span>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center w-full">
                                Tidak ada seminar ditemukan.
                            </p>
                        )}
                    </ul>
                </div>

                {/* Pagination Buttons */}
                <div className="flex justify-center mt-8 mb-10 gap-2">
                    <button
                        className={`${styles.pageButton}`}
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        &laquo; Prev
                    </button>

                    {Array.from({ length: totalPage }, (_, i) => (
                        <button
                            key={i}
                            className={`${styles.pageButton} ${page === i + 1 ? styles.activePage : ""
                                }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className={`${styles.pageButton}`}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPage}
                    >
                        Next &raquo;
                    </button>
                </div>
            </section>

            {/* Footer */}
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
                    <p>Senin–Minggu 08.00–22.00</p>
                    <p>📱 +62 851-7991-3755 (Admin 1 Argazora)</p>
                    <p>📱 +62 851-3591-3826 (Admin 2 Altaf )</p>
                    <p>✉ halo@Beasiswara.id</p>
                    <p>📍 Sulawesi Selatan</p>
                </div>
            </footer>
        </div>
    );
};

export default Seminar;