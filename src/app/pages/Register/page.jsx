"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        
        const formData = new FormData();
        formData.append("username", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        try {
            const res = await fetch("../../api/handleAccount", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success(data.message || "Anjay Akun Baru😘");
                setTimeout(() => router.push("/pages/Login"), 1500);
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
        <div>
            <Toaster position="top-center" />
            <header className={styles.header}>
                <h1>Learnify Register</h1>
                <button className={styles.backBtn} onClick={() => router.push("/")}>
                    Kembali
                </button>
            </header>

            <div className={styles.container}>
                <h2 className={styles.h2}>Daftar ke Learnify</h2>
                <p className={styles.p}>Isi data Anda untuk membuat akun baru</p>

                <input
                className={styles.input}
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                className={styles.input}
                    type="file"
                    placeholder="Image"
                   
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} 
                />
               

                <button className={styles.button} onClick={handleRegister}>{loading ? "Sedang Daftar Bosku" : "Daftar"}</button>
            </div>

            <footer className={styles.footer}>
                &copy; 2025 Learnify. Semua Hak Dilindungi.
            </footer>
        </div>
    );
}


export default Register