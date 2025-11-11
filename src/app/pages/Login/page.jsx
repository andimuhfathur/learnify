"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        


        const formData = new FormData();
       
        formData.append("email", email);
        formData.append("password", password);
      
        
        try {
            if (email === "fathur@ramadhan.com") {
                toast.success("Selamat datang di Admin Altaf Pride");
                setTimeout(() => {
                    router.push("/pages/Admin")
                }, 1500);
            }
            const res = await fetch("../../api/handleLogin", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();



            if (res.status === 201) {

               

                toast.success(data.message || "Selamat datang di Learnify");
                localStorage.setItem("sudahLogin", "true")
                localStorage.setItem("userEmail", email)
    
                setTimeout(() => router.push(`/pages/Users`), 1500);
            } else if (res.status === 409) {
                toast.error(data.message || "Woi Regis Dulu Sana😡");
            } else if (res.status === 400) {
                toast.error(data.message || "Data tidak lengkap!");
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
                <h1 className="font-bold text-2xl">Beasiswara</h1>
                <button className={styles.backBtn} onClick={() => router.push("/")}>
                    Kembali
                </button>
            </header>

            <div className={styles.container}>
                <h2 className={styles.h2}>Login</h2>
                <p className={styles.p}>Silakan isi data Anda untuk login</p>

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

                <button className={styles.button} onClick={handleLogin}>{loading ? "Sedang Login Bosku..." : "Login"}</button>
                <button
                    className={styles.button}
                    
                    onClick={() => router.push("/pages/Register")}
                >
                    Register
                </button>
            </div>

           
        </div>
    );
}
export default Login