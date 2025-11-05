"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

const AdminPage = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    
    useEffect(() => {

        const datauser = async () => {
            setUsers([
                {
                    id: 1,
                    image: "/imagebebas/download.jpeg",
                    username: "nia_rpl",
                    email: "nia@example.com",
                    password: "•••••••",
                    role: "User",
                    createdAt: "2025-11-02",
                },
                {
                    id: 2,
                    image: "/imagebebas/download.jpeg",
                    username: "admin_learnify",
                    email: "admin@learnify.com",
                    password: "•••••••",
                    role: "Admin",
                    createdAt: "2025-10-29",
                },
            ]);
            
        }
        datauser()

        
    }, []);

    return (
        <div className={styles.body}>
            
            <header className={styles.header}>
                <h1>Learnify Admin</h1>
                <nav className={styles.nav}>
                    <Link href={"/"}>Beranda</Link>
                    <Link href={"/pages/Admin/FormBeasiswa"}>Beasiswa</Link>
                    <Link href={"/pages/Admin/FormSeminar"}>Seminar</Link>
                    <Link href={"/pages/Login"} className={styles.loginBtn}>Logout</Link>
                </nav>
                <span className={styles.menuIcon} onClick={toggleSidebar}>☰</span>
            </header>

         
            <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
                <Link href={"/"}>Beranda</Link>
                <Link href={"/pages/Admin/FormBeasiswa"}>Beasiswa</Link>
                <Link href={"/pages/Admin/FormSeminar"}>Seminar</Link>
                <Link href={"/pages/Login"}>Logout</Link>
            </div>

          
            <section className={styles.adminContainer}>
                <h2>Daftar User Learnify</h2>
            
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Foto</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Tanggal Akun</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <Image
                                            src={user.image}
                                            alt={user.username}
                                            width={45}
                                            height={45}
                                            className={styles.userImage}
                                        />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <span
                                            className={
                                                user.role === "Admin"
                                                    ? styles.roleAdmin
                                                    : styles.roleUser
                                            }
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <footer className={styles.footer}>
                © 2025 Learnify Admin Dashboard.
            </footer>
        </div>
    );
};

export default AdminPage;