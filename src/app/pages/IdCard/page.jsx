"use client";
import { useState, useEffect, useMemo } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img1 from "../../../../public/imagebebas/Gambar WhatsApp 2025-11-02 pukul 14.27.23_1406a9cc.jpg";
import img2 from "../../../../public/imagebebas/ac0b760b-26de-41ed-921b-d6ad32837f8b-1_all_99.jpg";
import img3 from "../../../../public/imagebebas/Gambar WhatsApp 2025-11-07 pukul 21.18.08_b0f3279d.jpg";

const TeamSection = () => {
    const [showTeam, setShowTeam] = useState(true);
    const [visibleCards, setVisibleCards] = useState([]);
    const router = useRouter();

    const team = useMemo(() => [
        {
            name: "Muh. Althaf Andriansyah",
            age: 18,
            image: img1,
            major: "Teknik Informatika dan Komputer",
            hobi: "Olahraga Basket",
        },
        {
            name: "Muh. Fathur Ramadhan",
            age: 18,
            image: img2,
            major: "Teknik Informatika dan Komputer",
            hobi: "Jogging",
        },
        {
            name: "Argazora Ziya Anindya",
            age: 18,
            image: img3,
            major: "Teknik Informatka dan Komputer",
            hobi: "Gamer",
        },
    ], []);

    useEffect(() => {
        let timeout;
        timeout = setTimeout(() => {
            if (showTeam) {
                setVisibleCards(team.map((_, i) => i));
            } else {
                setVisibleCards([]);
            }
        }, 0);

        return () => clearTimeout(timeout);
    }, [showTeam, team]);


    return (
        <div className={styles.teamSection}>
            <h2>The Altaf Pride Team</h2>
            <p className={styles.desc}>
                Di Balik Beasiswara ada tim kreatif yang berkomitmen menghadirkan akses
                beasiswa dan seminar untuk semua.
            </p>

            <button onClick={() => router.push("/")}>Kembali</button>

            {showTeam && (
                <div className={styles.teamGrid}>
                    {team.map((member, i) => (
                        <div
                            key={i}
                            className={`${styles.card} ${visibleCards.includes(i) ? styles.show : ""
                                }`}
                        >
                            <div className={styles.cardKonter}>
                                <Image width={300} height={300} src={member.image} alt={member.name} />
                                <div className={styles.cardTeamSagapung}>
                                    <h3>{member.name}</h3>
                                    <p>Umur: {member.age} tahun</p>
                                    <p>Jurusan: {member.major}</p>
                                    <p>Hobi: {member.hobi}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamSection;
