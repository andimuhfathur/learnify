"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";

export default function KontenBeasiswa() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/beasiswa/${id}`);
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Gagal mengambil data beasiswa:", error);
            }
        };
        fetchData();
    }, [id]);

    if (!data) return <p className={styles.loading}>Memuat data...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.deskripsi}>{data.deskrip}</p>

            <div className={styles.infoBox}>
                <p><strong>Link Beasiswa:</strong> <a href={data.linkBea} target="_blank" rel="noopener noreferrer">{data.linkBea}</a></p>
                <p><strong>Deadline:</strong> {new Date(data.deadline).toLocaleDateString("id-ID")}</p>
            </div>
        </div>
    );
}