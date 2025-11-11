"use client"
import Image from "next/image"
import styles from "./style.module.css"
import img from "../../../../public/imagebebas/Gambar WhatsApp 2025-11-02 pukul 14.27.23_1406a9cc.jpg"
import { useRouter } from "next/navigation"

const Uji = () => {
    const router = useRouter()
    return (
    <div className={styles.page}>
{/* ======= Bar Cari Semua di Learnify ======= */}
<section className={styles.heroSection}>
  <div className={styles.heroContent}>
    <h1>Temukan Beasiswa Impianmu 🎓</h1>
    <p>
      Satu langkah menuju masa depanmu! Cari beasiswa, seminar, dan peluang terbaik di Beasiswara.
    </p>
    <button>Cari Sekarang</button>
  </div>

  <div className={styles.heroImage}>
    <Image src={img} width={340} height={340} alt="Beasiswara Hero" />
  </div>
</section>

{/* ======= Bar CTA ======= */}
<section className={styles.bannerAkhir}>
  <p>Cobain Semua di Learnify — Temukan Beasiswa, Seminar, dan Karier Impianmu!</p>
</section>

{/* ======= Bagian Beasiswa & Seminar ======= */}
<section className={styles.beasiswaSection}>
  <h2>Maju Bersama Learnify</h2>
  <div className={styles.stats}>
    <div>
      <h3>12.540+</h3>
      <p>Total Beasiswa & Seminar</p>
    </div>
    <div>
      <h3>3.200+</h3>
      <p>Partner & Organisasi Terdaftar</p>
    </div>
    <div>
      <h3>2.500.000+</h3>
      <p>Mahasiswa & Pelajar Aktif</p>
    </div>
  </div>

  <div className={styles.cardContainer}>
    <div className={`${styles.cardBox} ${styles.orange}`}>
      <h3>🎓 Beasiswa Unggulan</h3>
      <p>
        Temukan berbagai beasiswa nasional maupun internasional untuk
        mendukung pendidikanmu. Beasiswara membantu kamu menemukan peluang
        terbaik sesuai jurusan dan minatmu.
      </p>
      <button className="text-black">Jelajahi Beasiswa</button>
    </div>

    <div className={`${styles.cardBox} ${styles.teal}`}>
      <h3>🚀 The Beasiswara Team</h3>
      <p>
        Kami bukan sekadar tim — kami adalah sekelompok pemimpi dan pembuat perubahan.
        Dari ide kecil hingga jadi platform edukasi digital, setiap anggota Beasiswara berkontribusi untuk membantu generasi muda menemukan peluang belajar tanpa batas. 
      </p>
      <button onClick={() => router.push('pages/IDCard')}>Lihat Team</button>
    </div>

    <div className={`${styles.cardBox} ${styles.blue}`}>
      <h3>📚 Seminar Edukatif</h3>
      <p>
        Ikuti seminar inspiratif dan edukatif dengan pembicara hebat dari
        berbagai bidang. Kembangkan kemampuan dan perluas relasi.
      </p>
      <button>Lihat Seminar</button>
    </div >

    
  </div >
</section >




    {/* ======= Komen ======= */ }
    <div className = { styles.commentBox } >
      <h3>Tinggalkan Komentar</h3>
      <input type="text" placeholder="Nama kamu..." />
      <textarea placeholder="Tulis komentar kamu..."></textarea>
      <button>Kirim</button>

      <div className={styles.commentList}>
        <div className={styles.commentItem}>
          <h4>ArgaZoya Ganteng</h4>
          <p>Website Beasiswara-nya sangat membantu! 🔥</p>
        </div>
        <div className={styles.commentItem}>
          <h4>Fathur Keceh</h4>
          <p>Desainnya clean dan modern, suka banget tampilannya 😍</p>
        </div>
      </div>
    </div >

    {/* ======= Tentang Kami ======= */ }
    < section className = { styles.tentangKami } >
  <h2>Tentang Kami</h2>
  <p>
    Beasiswara adalah platform pendidikan yang menyediakan informasi beasiswa dan seminar untuk membantu pelajar dan mahasiswa mengembangkan potensi diri. Kami berkomitmen untuk menjadi jembatan antara siswa dan peluang pendidikan terbaik.
  </p>
  <div className={styles.tentangGrid}>
    <div>
      <h3>🎯 Misi</h3>
      <p>Meningkatkan akses pendidikan dan kesempatan bagi seluruh pelajar Indonesia.</p>
    </div>
    <div>
      <h3>💡 Visi</h3>
      <p>Menjadi pusat informasi dan pengembangan pendidikan nomor satu di Indonesia.</p>
    </div>
  </div>
</ section>


    {/* ======= Footer ======= */ }
    <footer className = { styles.footerNew } >
  <div className={styles.footerCol}>
    <h4>Beasiswara</h4>
    <Image src={img} alt="Logo Beasiswara" width="300" height={300}/>
  </div>

  <div className={styles.footerCol}>
    <h4>Beasiswara</h4>
    <ul>
      <li>Tentang Kami</li>
      <li>Kerja Sama</li>
      <li>Karier</li>
      <li>Kebijakan Privasi</li>
      <li>Syarat & Ketentuan</li>
    </ul>
  </div>

  <div className={styles.footerCol}>
    <h4>Hubungi Kami</h4>
    <p>Senin–Minggu @ 08.00–22.00</p>
    <p>📱 +62 851-7991-3755 (Admin 1 Arga)</p>
    <p>📱 +62 851-3591-3826 (Admin 2 Fathur)</p>
    <p>✉ halo@Beasiswara.id</p>
    <p>📍 Sulawesi Selatan</p>
  </div>
</footer >

    </div >
  )
}

export default Uji