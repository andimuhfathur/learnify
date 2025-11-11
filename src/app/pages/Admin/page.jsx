"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

const AdminPage = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [users, setUsers] = useState([]);
    const [beasiswa, setbeasiswa] = useState([]);
    const [seminar, setseminar] = useState([]);

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    
    useEffect(() => {

        const datauser = async () => {
            const url = await fetch("../../api/handleAccount")
            const res = await url.json()
            setUsers(res.data)
        }
        datauser()
        const databea = async () => {
            const url = await fetch("../../api/handleBeasiswa")
            const res = await url.json()
            setbeasiswa(res.data)
        }
        databea()
        const datasem = async () => {
            const url = await fetch("../../api/handleSeminar")
            const res = await url.json()
            setseminar(res.data)
        }
        datasem()

        
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

          {/* table User */}
            <section className={styles.adminContainer}>
                <h2>Daftar User Beasiswara</h2>
            
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
                        {users ? (
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id_Account}>
                                        <td>{user.id_Account}</td>
                                        <td>
                                            <Image
                                                src={user.image_Account}
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
                                        <td>{new Date(user.tanggalAccount)
                                            .toISOString()
                                            .split("T")[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                                <tbody className=""><tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        Maaf, data beasiswa belum ada.
                                    </td>
                                </tr></tbody> 
                        )}
                        
                    </table>
                </div>
            </section>

            {/* table beasiswa */}
            <section className={styles.adminContainer}>
                <h2>Daftar Beasiswa Beasiswara</h2>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Foto</th>
                                <th>Title</th>
                                <th>Deskripsi</th>
                                <th>Type</th>
                                <th>Link</th>
                                <th>deadline</th>
                            </tr>
                        </thead>
                        
                            {beasiswa ? (
                            <tbody>
                                    {beasiswa.map((user) => (
                                        <tr key={user.id_Beasiswa}>
                                            <td>{user.id_Beasiswa}</td>
                                            <td>
                                                <Image
                                                    src={user.image_Besiswa}
                                                    alt={user.title}
                                                    width={45}
                                                    height={45}
                                                    className={styles.userImage}
                                                />
                                            </td>
                                            <td>{user.title}</td>
                                            <td className="w-20 whitespace-nowrap text-ellipsis font-normal overflow-hidden">{user.deskripsi}</td>
                                            <td>{user.type}</td>
                                            <td>{user.linkBea}</td>
                                            <td>{new Date(user.deadline)
                                                .toISOString()
                                                .split("T")[0]}</td>
                                        </tr>
                                    ))}
                            </tbody>
                            ) : (
                                <tbody className=""><tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        Maaf, data beasiswa belum ada.
                                    </td>
                                </tr></tbody>
                            )}
                            
                       
                    </table>
                </div>
            </section>

            {/* table seminar */}
            <section className={styles.adminContainer}>
                <h2>Daftar seminar Beasiswara</h2>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Foto</th>
                                <th>Title</th>
                                <th>Deskripsi</th>
                                <th>Link</th>
                                <th>deadline</th>
                            </tr>
                        </thead>
                        {seminar ? (
                            <tbody>
                                {seminar.map((user) => (
                                    <tr key={user.idSeminar}>
                                        <td>{user.idSeminar}</td>
                                        <td>
                                            <Image
                                                src={user.imageSem}
                                                alt={user.title}
                                                width={45}
                                                height={45}
                                                className={styles.userImage}
                                            />
                                        </td>
                                        <td>{user.title}</td>
                                        <td className="w-20 whitespace-nowrap text-ellipsis font-normal overflow-hidden">{user.deskripsi}</td>
                                        <td>{user.linkSem}</td>
                                        <td>{new Date(user.deadline)
                                            .toISOString()
                                            .split("T")[0]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                                <tbody><tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        Maaf, data beasiswa belum ada.
                                    </td>
                                </tr></tbody>
                        )}
                        
                    </table>
                </div>
            </section>


            <footer className={styles.footer}>
                © 2025 Admin Beasiswara Altaf Pride.
            </footer>
        </div>
    );
};

export default AdminPage;