"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import img5 from "../../../../../public/imagebebas/Gambar_WhatsApp_2025-11-05_pukul_23.46.30_f3b38eab-removebg-preview - Copy.png"
import Image from "next/image";




const FormSeminar = () => {
    const [showSidebar, setShowSidebar] = useState(false);


    const toggleSidebar = () => setShowSidebar(!showSidebar);

    const router = useRouter();
    const [title, settitle] = useState("");
    const [deskripsi, setdeskripsi] = useState("");
    const [image, setImage] = useState(null);
    const [link, setlink] = useState("");
    const [date, setdate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSeminar = async (e) => {
        e.preventDefault();
        setLoading(true);


        const formData = new FormData();
        formData.append("title", title);
        formData.append("imageBea", image);
        formData.append("deskrip", deskripsi);
        formData.append("deadl", date);
        formData.append("linkBe", link);

        try {
            const res = await fetch("../../../api/handleSeminar", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success(data.message || "Seminar baru😘");
                settitle("")
                setdeskripsi("")
                setlink("")
                setImage("")
                setdate("")
                setTimeout(() => router.push("/pages/Admin/FormSeminar"), 1500);
            } else if (res.status === 409) {
                toast.error(data.message || "Sayang sekali email sudah terdaftar😢");
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
            {/* HEADER */}
            <header className={styles.header}>
               <div className="flex items-center justify-center h-auto">
                               <Image src={img5} className="w-11 h-11" width={200} height={200} alt="Altaf"></Image>
                               <h1 className="font-light">Beasiswara</h1>
                               </div>
                <nav className={styles.nav}>
                    <Link href={"/"}>Beranda</Link>
                    <Link href={"/pages/Admin/FormBeasiswa"}>Seminar</Link>
                    <Link href={"/pages/Admin/FormSeminar"}>Seminar</Link>
                    <Link href={"/pages/Admin"}>Admin</Link>
                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
            </header>

            {/* SIDEBAR */}
            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href={"/"}>Beranda</Link>
                <Link href={"/pages/Admin/FormSeminar"}>Seminar</Link>
                <Link href={"/pages/Admin/FormSeminar"}>Seminar</Link>
                <Link href={"/pages/Admin"}>Admin</Link>
            </div>

            {/* FORM SECTION */}
            <section className={styles.formSection}>
                <h2>Form Pendaftaran Seminar</h2>
                <p>Isi data berikut untuk menambahkan informasi Seminar baru.</p>

                <form className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label>Judul Seminar</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="Masukkan judul Seminar"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            rows="4"
                            value={deskripsi}
                            onChange={(e) => setdeskripsi(e.target.value)}
                            placeholder="Tulis deskripsi singkat tentang Seminar"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Link Seminar</label>
                        <input
                            type="url"
                            name="link"
                            value={link}
                            onChange={(e) => setlink(e.target.value)}
                            placeholder="https://contohSeminar.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Tanggal Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Upload Gambar Seminar</label>
                        <input
                            type="file"
                            name="imageBea"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            required
                        />
                    </div>

                    <button type="submit" onClick={handleSeminar} className={styles.submitBtn}>
                        {loading ? "sedang upload Seminar" : "Upload Seminar"}
                    </button>
                </form>
            </section>

            {/* FOOTER */}
            <footer className={styles.footer}>
                © 2025 Learnify. Semua Hak Dilindungi.
            </footer>
        </div>
    );
};

export default FormSeminar;