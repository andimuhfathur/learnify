"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";




const FormBeasiswa = () => {
    const [showSidebar, setShowSidebar] = useState(false);


    const toggleSidebar = () => setShowSidebar(!showSidebar);

    const router = useRouter();
    const [title, settitle] = useState("");
    const [deskripsi, setdeskripsi] = useState("");
    const [image, setImage] = useState(null);
    const [link, setlink] = useState("");
    const [date, setdate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBeasiswa = async (e) => {
        e.preventDefault();
        setLoading(true);


        const formData = new FormData();
        formData.append("title", title);
        formData.append("imageBea", image);
        formData.append("deskrip", deskripsi);
        formData.append("deadl", date);
        formData.append("linkBe", link);

        try {
            const res = await fetch("../../../api/handleBeasiswa", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success(data.message || "Seminar baru😘");
                settitle("")
                setdeskripsi("")
                setlink("")
                setImage(null)
                setdate("")
                setTimeout(() => router.push("/pages/Admin/FormBeasiswa"), 1500);
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
                <h1>Learnify</h1>
                <nav className={styles.nav}>
                    <Link href={"/"}>Beranda</Link>
                    <Link href={"/pages/Beasiswa"}>Beasiswa</Link>
                    <Link href={"/pages/Seminar"}>Seminar</Link>
                    <Link href={"/pages/Admin"}>Admin</Link>
                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
            </header>

            {/* SIDEBAR */}
            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href={"/"}>Beranda</Link>
                <Link href={"/pages/Beasiswa"}>Beasiswa</Link>
                <Link href={"/pages/Seminar"}>Seminar</Link>
                <Link href={"/pages/Admin"}>Admin</Link>
            </div>

            {/* FORM SECTION */}
            <section className={styles.formSection}>
                <h2>Form Pendaftaran Beasiswa</h2>
                <p>Isi data berikut untuk menambahkan informasi beasiswa baru.</p>

                <form className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label>Judul Beasiswa</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="Masukkan judul beasiswa"
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
                            placeholder="Tulis deskripsi singkat tentang beasiswa"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Link Beasiswa</label>
                        <input
                            type="url"
                            name="link"
                            value={link}
                            onChange={(e) => setlink(e.target.value)}
                            placeholder="https://contohbeasiswa.com"
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
                        <label>Upload Gambar Beasiswa</label>
                        <input
                            type="file"
                            name="imageBea"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            required
                        />
                    </div>

                    <button type="submit" onClick={handleBeasiswa} className={styles.submitBtn}>
                        {loading ? "sedang upload beasiswa" : "Upload Beasiswa"}
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

export default FormBeasiswa;