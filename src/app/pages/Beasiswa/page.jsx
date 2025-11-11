"use client";

import { useRouter } from "next/navigation";
import styles from "./beasiswa.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import img1 from "../../../../public/imagebebas/download.jpeg"
import img2 from "../../../../public/imagebebas/logo dice 25.png"
import img3 from "../../../../public/imagebebas/logo sensation.png"
import img4 from "../../../../public/imagebebas/PNUP (1).png"


const Beasiswa = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState("semua");
    const [logi, setlog] = useState(false)
    const limit = 6; // jumlah card per halaman

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const status = localStorage.getItem("sudahLogin");
            setTimeout(() => {
                setlog(status === "true");
            }, 0);
        }
    }, []);
   

    useEffect(() => {
       

        const fetchData = async () => {
            try {
                const url = `../../api/handlePanginationBeasiswa?page=${page}&limit=6${filter !== "semua" ? `&type=${filter}` : ""
                    }`;

                const res = await fetch(url, { cache: "no-store" });
                const result = await res.json();

                setData(result.data);
                setTotalPage(result.meta.totalPage);
            } catch (err) {
                console.error("Gagal memuat data", err);
            }
        };

        fetchData();
    }, [page, filter]);

    const handleFilter = (type) => {
        setFilter(type);
        setPage(1);
    };

    return (
        <div className={styles.body}>
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

            <section className={styles.heroSection}>
                            <div className={styles.heroContent}>
                                <h1>Beasiswa</h1>
                            </div>
                        </section>
            
                        <hr />

            <section className={styles.page}>
               

                {/* Filter Buttons */}
                <div className="flex justify-center flex-wrap gap-3 mb-6">
                    {["semua", "Pelajar", "S1", "S2", "S3"].map((item) => (
                        <button
                            key={item}
                            onClick={() => handleFilter(item)}
                            className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${filter === item
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white border-blue-400 text-blue-600 hover:bg-blue-100"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    {data && data.length > 0 ? (
                        data.map((datas) => (
                            <article
                                key={datas.id_Beasiswa}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="relative h-44 w-full overflow-hidden">
                                    <Image
                                        src={datas.image_Besiswa}
                                        width={300}
                                        height={300}
                                        alt="Gambar Beasiswa"
                                        className="object-cover w-full h-full brightness-90 hover:scale-105 transform transition-all duration-500"
                                    />
                                    <div className="absolute left-4 top-4 flex gap-2">
                                        <span className="text-xs font-medium bg-white/80 px-2 py-1 rounded-full shadow-sm">
                                            Beasiswa
                                        </span>
                                    </div>
                                    <div className="absolute right-4 top-4">
                                       
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-slate-800 leading-tight line-clamp-2">
                                        {datas.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {datas.provider || "Unknown"}
                                    </p>

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

                                        <button onClick={() => router.push(`/pages/Beasiswa/${datas.id_Beasiswa}`)} className="px-4 py-2 rounded-xl bg-[#ff8c1a] text-white text-sm font-semibold shadow  active:scale-95 transition-transform">
                                            Read More...
                                        </button>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                                        <span>Level: {datas.type}</span>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500">
                            Tidak ada data
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 disabled:opacity-50"
                    >
                        &laquo;
                    </button>

                    {Array.from({ length: totalPage }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded-lg border ${page === i + 1
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "border-gray-400 hover:bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                        disabled={page === totalPage}
                        className="px-3 py-1 rounded-lg border border-gray-400 hover:bg-gray-200 disabled:opacity-50"
                    >
                        &raquo;
                    </button>
                </div>

                <button
                    className={styles.backBtn}
                    onClick={() => router.push("/")}
                >
                    Kembali
                </button>
            </section>

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
    );
};

export default Beasiswa;
