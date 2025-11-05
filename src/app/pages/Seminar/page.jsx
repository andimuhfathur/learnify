"use client";

import { useRouter } from "next/navigation";
import styles from "./seminar.module.css";
import img1 from "../../../../public/imagebebas/download.jpeg"
import Image from "next/image";
import { useEffect, useState } from "react";

const Beasiswa = () => {
    const router = useRouter();

    const [data, setdata] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const url = await fetch('../../api/handleSeminar', { cache: "no-store" })
            const res = await url.json()
            setdata(res.data)
        }
        fetchData()
    },[])

    return (
        <div className={styles.body}>
            <header className={styles.header}>
                <h1 className="font-bold md:text-[1.5rem] text-[1rem]">Beasiswara</h1>
            </header>

            <section className={styles.page}>
                <h2 className="font-bold text-[1.5rem] justify-center">Daftar Seminar</h2>
                

                <div className={styles.card}>
                    {/* <h3>Daftar Beasiswa</h3> */}
                    <ul className="grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2 ">
                        {data.map((datas) => {
                            return (
                                <li key={datas.idSeminar} className="bg-white rounded-md shadow-none scale-100 transition-all hover:shadow-2xl hover:scale-105 p-4">
                                    <Image src={datas.imageSem} width={300} height={300} alt="sfsf"></Image>
                                    <div className={styles.text}>
                                        <strong className="md:w-64 w-96 md:text-[1rem]  text-sm p-2 text-justify whitespace-nowrap text-ellipsis font-bold overflow-hidden">{datas.title}</strong>
                                        <p className="md:w-64 w-96 md:text-[0.7rem] text-sm p-2 text-justify whitespace-normal text-ellipsis font-normal overflow-hidden">{datas.deskripsi}</p>
                                    </div>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>

                <button className={styles.backBtn} onClick={() => router.push("/")}>
                    Kembali
                </button>
            </section>

            <footer className={styles.footer}>
                &copy; 2025 Learnify. Semua Hak Dilindungi.
            </footer>
        </div>
    );
}

export default Beasiswa