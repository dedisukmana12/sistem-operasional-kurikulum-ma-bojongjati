import { Chapter } from '../types';

export const curriculumChapters: Chapter[] = [
  {
    id: 1,
    code: 'BAB I',
    title: 'PENDAHULUAN & LANDASAN KERJA KURIKULUM',
    summary: 'Latar Belakang, Dasar Hukum Kemenag RI, Visi Misi Kurikulum MA Bojongjati, serta Target Capaian & Indikator Kinerja Utama (IKU).',
    sections: [
      {
        id: 'bab1-1',
        title: '1.1 Latar Belakang & Filosofi Kurikulum',
        content: `### 1.1 Latar Belakang & Filtrasi Filosofis Pendidikan

Pendidikan pada **[NAMA_MADRASAH]** memegang peranan strategis dalam membina generasi muda Muslim yang tidak hanya memiliki keunggulan akademis dan literasi digital, tetapi juga kokoh dalam aqidah, berakhlaqul karimah, serta memiliki pandangan keagamaan yang moderat (*wasathiyah*). Memasuki Tahun Ajaran **[TAHUN_AJARAN]**, **[NAMA_MADRASAH]** mengintegrasikan **Kurikulum Merdeka Deep Learning** yang diamanatkan oleh **KMA No. 1503 Tahun 2025** jo. **Regulasi BSKAP No. 46 Tahun 2025** dan Juknis Direktorat Jenderal Pendidikan Islam Kemenag RI.

Filosofi pembelajaran di **[NAMA_MADRASAH]** mengusung tiga pilar *Deep Learning* (*Mindful, Meaningful, & Joyful Learning*) yang diselaraskan dengan spirit **Kurikulum Berbasis Cinta (KBC)**. Pendekatan ini memastikan bahwa proses pembelajaran agama Islam (Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab) serta Ilmu Pengetahuan Umum dan Peminatan tidak sekadar transfer pengetahuan hafalan (*surface learning*), melainkan pembelajaran mendalam yang membangun penalaran kritis, pemahaman kontekstual, dan pembentukan nilai-nilai Rahmatan Lil 'Alamin.

Wakil Kepala Madrasah Bidang Kurikulum bertindak sebagai *Master Strategis Akademik* yang bertanggung jawab memastikan seluruh perangkat perencanaan, proses pembelajaran, asesmen, hingga penjaminan mutu guru berjalan terukur, akuntabel, dan berkesinambungan.`
      },
      {
        id: 'bab1-2',
        title: '1.2 Dasar Hukum & Landasan Regulasi Kemenag RI',
        content: `### 1.2 Dasar Hukum & Landasan Regulasi

Penyusunan dan Pelaksanaan Dokumen Sistem Administrasi dan Program Kerja Kurikulum **[NAMA_MADRASAH]** Tahun Ajaran **[TAHUN_AJARAN]** berlandaskan pada hirarki peraturan perundang-undangan berikut:

1. **Undang-Undang Republik Indonesia Nomor 20 Tahun 2003** tentang Sistem Pendidikan Nasional.
2. **Peraturan Pemerintah Nomor 4 Tahun 2022** tentang Perubahan atas PP Nomor 57 Tahun 2021 tentang Standar Nasional Pendidikan.
3. **Keputusan Menteri Agama (KMA) Nomor 1503 Tahun 2025** tentang Pedoman Implementasi Kurikulum pada Madrasah (Kurikulum Merdeka Deep Learning).
4. **Keputusan Menteri Agama (KMA) Nomor 183 dan 184 Tahun 2019** tentang Kurikulum PAI dan Bahasa Arab pada Madrasah.
5. **Peraturan BSKAP Kemendikdasmen Nomor 032/H/KR/2024 jo. BSKAP No. 46 Tahun 2025** tentang Capaian Pembelajaran pada Ekosistem PAUD, Dasar, dan Menengah.
6. **Peraturan BSKAP Nomor 038/H/KR/2024** tentang Pedoman Pelaksanaan Projek Penguatan Profil Pelajar Pancasila dan Profil Pelajar Rahmatan Lil 'Alamin (P5-PPRA).
7. **Keputusan Direktur Jenderal Pendidikan Islam Kemenag RI** tentang Petunjuk Teknis Penyusunan Kalender Pendidikan dan Kalender Akademik Madrasah Tahun Ajaran **[TAHUN_AJARAN]**.
8. **Keputusan Kepala Madrasah Aliyah Bojongjati Nomor: MA.Bjt/01/KP/07/[TAHUN_AJARAN]** tentang Pembagian Tugas Mengajar dan Tugas Tambahan Guru.`
      },
      {
        id: 'bab1-3',
        title: '1.3 Visi, Misi, dan Target Mutu Kurikulum MA Bojongjati',
        content: `### 1.3 Visi, Misi, dan Target Mutu Kurikulum

#### A. Visi Kurikulum
> **"Terwujudnya Lulusan Madrasah Aliyah yang Unggul Berbasis Deep Learning, Berakhlaqul Karimah, Berwawasan Wasathiyah, dan Menguasai Teknologi Informasi."**

#### B. Misi Bidang Kurikulum
1. Menyelenggarakan proses pembelajaran berkualitas (*Mindful, Meaningful, Joyful*) dengan penguatan pendidikan Karakter dan Moderasi Beragama.
2. Mengoptimalkan capaian pembelajaran PAI, Bahasa Arab, Sains, dan Peminatan melalui Kurikulum Merdeka Terintegrasi.
3. Mengembangkan iklim riset, literasi digital, dan kemampuan *High Order Thinking Skills* (HOTS) siswa.
4. Mendorong profesionalisme dan kompetensi pedagogik guru melalui supervisi akademik klinis dan program In-House Training (IHT).
5. Mengelola sistem asesmen yang obyektif, otentik, serta akuntabel berbasis digital (*Computer Based Test / CBT*).

#### C. Target Capaian Mutu Kurikulum Tahun Ajaran [TAHUN_AJARAN]

| No | Indikator Sasaran Mutu | Target Kuantitatif | Strategi Pencapaian |
|---|---|---|---|
| 1 | Kelengkapan Perangkat Ajar Guru (Modul Ajar / RPP Deep Learning) | 100% Guru menyerahkan tepat waktu sebelum KBM dimulai | Supervisi Perangkat & Pendampingan MGMP Internal |
| 2 | Ketercapaian Target Kurikulum Seluruh Mata Pelajaran | minimal 95% Ketuntasan | Pemantauan bulanan daya serap & jatah jam efektif |
| 3 | Rata-Rata Nilai Asesmen Sumatif Akhir Semester (ASAS) | ≥ 80,00 | Remedial teaching terstruktur & Tryout berkala |
| 4 | Tingkat Kelulusan Siswa Kelas XII pada Asesmen Madrasah (AM) | 100% Lulus Kriteria Ketuntasan Minimal | Bimbingan Belajar Intensif & Try Out CBT |
| 5 | Proporsi Lulusan Diterima di PTN / PTKIN (SNBP, SNBT, SPAN-PTKIN) | minimal 45% dari Total Lulusan | Program Bimbingan Khusus Perguruan Tinggi & Konseling |
| 6 | Capaian Kejuaraan KSM (Kompetisi Sains Madrasah) & MYRES | Minimal Juara Tingkat Kabupaten/Provinsi | Kelompok Belajar Unggulan & Intensif Klinik Sains |
| 7 | Predikat Supervisi Akadimik Guru (Observasi Kelas) | Minimal 85% Guru berpredikat "Baik" / "Sangat Baik" | Supervisi Terjadwal 2 Kali/Tahun & Klinik Pembelajaran |`
      }
    ]
  },
  {
    id: 2,
    code: 'BAB II',
    title: 'PROGRAM KERJA MANAJERIAL & RENCANA ANGGARAN',
    summary: 'Matriks Program Kerja Tahunan, Semesteran, Bulanan, Mingguan, Indikator Kinerja Utama (IKU), dan Rencana Anggaran Biaya (RAB).',
    sections: [
      {
        id: 'bab2-1',
        title: '2.1 Matriks Program Kerja Waka Kurikulum',
        content: `### 2.1 Matriks Program Kerja Operasional

Program kerja Waka Kurikulum **[NAMA_MADRASAH]** disusun secara sistematis berdasarkan periodesasi pelaksanaan:

#### A. Program Kerja Tahunan
- **Penyusunan Kurikulum Operasional Madrasah (KOM)** Tahun Ajaran **[TAHUN_AJARAN]** bersama Tim Pengembang Kurikulum.
- **Penyusunan Pembagian Tugas Mengajar & Jadwal Pelajaran** berbasis SIKAP Kemenag dan SIMPATIKA.
- **Penyelenggaraan In-House Training (IHT)** Implementasi Kurikulum Merdeka Deep Learning & Digital Pedagogy.
- **Rapat Koordinasi Evaluasi Kurikulum Semester I & II**.
- **Pelaksanaan Asesmen Madrasah (AM) Kelas XII** dan Wisuda/Pelepasan Lulusan.

#### B. Program Kerja Semesteran
- **Penyusunan Kalender Pendidikan Madrasah** & Analisis Hari Efektif Belajar (HEB).
- **Rapat Pembagian Beban Kerja Guru & Pencetakan Jadwal Resmi**.
- **Pelaksanaan Supervisi Perencanaan & Pembelajaran di Kelas** (Gelombang I & Gelombang II).
- **Penyelenggaraan Asesmen Sumatif Tengah Semester (ASTS)** dan **Asesmen Sumatif Akhir Semester (ASAS)** / **AAT**.
- **Pengolahan & Pembagian Rapor Digital Madrasah (RDM)**.
- **Evaluasi Daya Serap Siswa & Ketuntasan Tujuan Pembelajaran (TP)**.

#### C. Program Kerja Bulanan
- **Rapat Rutin Bulanan MGMP Tingkat Madrasah** (Setiap Minggu ke-2).
- **Rekapitulasi Kehadiran & Jurnal Mengajar Guru** via sistem RDM/Absensi Digital.
- **Klinik Pembelajaran & Pendampingan Guru** hasil supervisi.
- **Analisis Ketercapaian Target Jam Tatap Muka (JTM)**.

#### D. Program Kerja Mingguan
- **Pemantauan KBM Harian & Jadwal Guru Inval** (Guru Pengganti).
- **Pemeriksaan Jurnal Kelas & Catatan Asesmen Formatif**.
- **Laporan Mingguan Kendala Kurikulum** kepada Kepala Madrasah **[NAMA_KEPALA]**.`
      },
      {
        id: 'bab2-2',
        title: '2.2 Indikator Kinerja Utama (IKU) Waka Kurikulum',
        content: `### 2.2 Indikator Kinerja Utama (IKU) Waka Kurikulum

| No | Kode IKU | Sasaran Strategis | Indikator Kinerja Utama | Formula / Metode Ukur | Target [TAHUN_AJARAN] |
|---|---|---|---|---|---|
| 1 | IKU-KUR-01 | Kualitas Dokumen Perencanaan | Ketersediaan Dokumen KOM & Kalender Pendidikan Valid | Pengesahan Kemenag Kab/Kota | 100% Lengkap sebelum Juli |
| 2 | IKU-KUR-02 | Kepatuhan Administrasi Guru | Persentase Modul Ajar/RPP Guru terverifikasi | (Jumlah Modul Ajar Sah / Total Guru) x 100% | 100% Guru |
| 3 | IKU-KUR-03 | Penjaminan Mutu Pembelajaran | Persentase Guru Ter-supervisi dengan Nilai ≥ 80 | (Guru Skor ≥ 80 / Total Guru) x 100% | ≥ 85% Guru |
| 4 | IKU-KUR-04 | Ketuntasan Asesmen & RDM | Ketepatan waktu input RDM & pembagian Rapor | Bebas kendala teknis & sesuai jadwal | 100% Tepat Waktu |
| 5 | IKU-KUR-05 | Capaian KSM & Akademik | Jumlah medali/trofi KSM & Karya Ilmiah Remaja | Laporan Prestasi Madrasah | Minimal 3 Medali Kab/Prov |
| 6 | IKU-KUR-06 | Kelulusan & PTN | Persentase Lulusan masuk Perguruan Tinggi Negeri | (Siswa Diterima PTN / Total Lulusan) x 100% | ≥ 45% Lulusan |`
      },
      {
        id: 'bab2-3',
        title: '2.3 Rencana Anggaran Biaya (RAB) Kegiatan Kurikulum',
        content: `### 2.3 Rencana Anggaran Biaya (RAB) Kegiatan Kurikulum

Berikut adalah perkiraan Rencana Anggaran Biaya (RAB) Operasional Kurikulum **[NAMA_MADRASAH]** Tahun Ajaran **[TAHUN_AJARAN]**:

| No | Uraian Kegiatan | Volume / Frekuensi | Satuan | Harga Satuan (Rp) | Total Anggaran (Rp) | Sumber Dana |
|---|---|---|---|---|---|---|
| **1** | **Pengembangan Kurikulum & KOM** | | | | | |
| 1.1 | Workshop Penyusunan KOM & Kalender Pendidikan | 1 Paket | Kegiatan | 4.500.000 | 4.500.000 | BOS |
| 1.2 | Cetak & Penggandaan Dokumen KOM & Perangkat | 10 Eksemplar | Paket | 250.000 | 2.500.000 | BOS |
| **2** | **In-House Training (IHT) & Bimtek Guru** | | | | | |
| 2.1 | IHT Kurikulum Merdeka Deep Learning & Digital | 2 Hari x 2 Narasumber | Orang/Hari | 1.500.000 | 6.000.000 | BOS / BOP |
| 2.2 | Konsumsi & ATK Peserta IHT (40 Guru) | 40 Orang x 2 Hari | Orang/Hari | 50.000 | 4.000.000 | BOS |
| **3** | **Penyelenggaraan Asesmen Pembelajaran** | | | | | |
| 3.1 | Asesmen Sumatif Tengah Semester (ASTS) I & II | 2 Semester x 450 Siswa | Siswa | 25.000 | 22.500.000 | BOS |
| 3.2 | Asesmen Sumatif Akhir Semester (ASAS / AAT) | 2 Semester x 450 Siswa | Siswa | 35.000 | 31.500.000 | BOS |
| 3.3 | Asesmen Madrasah (AM) Kelas XII (CBT & Praktik) | 150 Siswa Kelas XII | Siswa | 120.000 | 18.000.000 | BOS |
| **4** | **Program Unggulan & Pengayaan Akademik** | | | | | |
| 4.1 | Bimbingan Intensif KSM & Kompetisi Sains | 3 Bulan x 6 Mapel | Bulan/Mapel | 500.000 | 9.000.000 | Komite/BOS |
| 4.2 | Bimbingan Sukses PTN / PTKIN (Tryout SNBT & SPAN) | 4 Kali Tryout x 150 Siswa | Paket/Siswa | 40.000 | 24.000.000 | Komite |
| 4.3 | Pelaksanaan Projek P5-PPRA (Gelaran Karya) | 2 Kali / Tahun | Kegiatan | 7.500.000 | 15.000.000 | BOS |
| **5** | **Supervisi & Penjaminan Mutu** | | | | | |
| 5.1 | Konsumsi & Transport Pendampingan MGMP Internal | 12 Bulan x 4 Kelompok | Kegiatan | 300.000 | 14.400.000 | BOS |
| **TOTAL RENCANA ANGGARAN KURIKULUM** | | | | | **Rp 151.400.000** | |`
      }
    ]
  },
  {
    id: 3,
    code: 'BAB III',
    title: 'PENGATURAN PEMBELAJARAN & KALENDER AKADEMIK',
    summary: 'Struktur Kurikulum Merdeka Deep Learning, Pembagian Tugas Mengajar, Analisis Hari Efektif Belajar, dan Strategi P5-PPRA.',
    sections: [
      {
        id: 'bab3-1',
        title: '3.1 Struktur Kurikulum Merdeka Deep Learning MA Bojongjati',
        content: `### 3.1 Struktur Kurikulum & Beban Jam Tatap Muka (JTM)

Sesuai dengan **KMA No. 1503 Tahun 2025**, struktur kurikulum pada **[NAMA_MADRASAH]** terbagi atas **Fase E (Kelas X)** dan **Fase F (Kelas XI dan XII)**.

#### Tabel Struktur Kurikulum & Alokasi JTM Per Minggu (KMA 1503/2025)

| Kelompok Mata Pelajaran | Alokasi JTM Kelas X (Fase E) | Alokasi JTM Kelas XI (Fase F) | Alokasi JTM Kelas XII (Fase F) | Keterangan & Karakteristik |
|---|---|---|---|---|
| **A. KELOMPOK MATA PELAJARAN PAI & BAHASA ARAB (KEMENAG)** | | | | |
| 1. Al-Qur'an Hadis | 2 JP | 2 JP | 2 JP | Deep Learning Integratif & Tadabbur |
| 2. Akidah Akhlak | 2 JP | 2 JP | 2 JP | Penguatan Karakter & Akhlaqul Karimah |
| 3. Fikih | 2 JP | 2 JP | 2 JP | Fikih Muamalah & Kebangsaan |
| 4. Sejarah Kebudayaan Islam (SKI) | 2 JP | 2 JP | 2 JP | Nilai Historis & Moderasi Beragama |
| 5. Bahasa Arab | 4 JP | 2 JP | 2 JP | Kemampuan Komunikasi & Literasi Kitab |
| **B. KELOMPOK MATA PELAJARAN UMUM (NASIONAL)** | | | | |
| 6. Pendidikan Pancasila | 2 JP | 2 JP | 2 JP | Pancasila dalam Kehidupan Berbangsa |
| 7. Bahasa Indonesia | 3 JP | 3 JP | 3 JP | Literasi & Logika Berpikir Bahasa |
| 8. Matematika | 3 JP | 3 JP | 3 JP | Numerasi & Problem Solving |
| 9. Bahasa Inggris | 3 JP | 3 JP | 3 JP | Komunikasi Global & Digital |
| 10. Ilmu Pengetahuan Alam (Fisika, Kimia, Biologi) | 6 JP (Terpadu) | - | - | Dasar Sains & Metode Ilmiah |
| 11. Ilmu Pengetahuan Sosial (Sosiologi, Ekonomi, Geografi, Sejarah) | 8 JP (Terpadu) | - | - | Dasar Sosial & Kebijakan |
| 12. Pendidikan Jasmani, Olahraga, & Kesehatan (PJOK) | 2 JP | 2 JP | 2 JP | Kebugaran & Olahraga Sunnah |
| 13. Informatika | 2 JP | - | - | Literasi Komputer & AI Ethics |
| 14. Seni dan Budaya / Prakarya | 2 JP | 2 JP | 2 JP | Kreativitas & Entrepreneurship |
| **C. KELOMPOK MATA PELAJARAN PILIHAN / PEMINATAN (FASE F)** | | | | |
| *Mata Pelajaran Pilihan (Biologi/Kimia/Fisika/Ekonomi/Sosiologi/Geografi/Bahasa Arab Lanjut/Tafsir/Hadis/Informatika Lanjut)* | - | 20 JP (4 Mapel @5JP) | 20 JP (4 Mapel @5JP) | Dipilih sesuai minat bakat & Karir PTN/PTKIN |
| **D. KELOMPOK PROJEK P5-PPRA** | | | | |
| Projek Penguatan Profil Pelajar Pancasila & PPRA | 6 JP (Kokurikuler) | 4 JP (Kokurikuler) | 4 JP (Kokurikuler) | Terintegrasi Tema Wasathiyah & Lingkungan |
| **TOTAL JAM PER MINGGU** | **51 JP** | **51 JP** | **51 JP** | **Alokasi Jam Efektif Terstruktur** |`
      },
      {
        id: 'bab3-2',
        title: '3.2 Analisis Hari Efektif Belajar (HEB) & Kalender Akademik',
        content: `### 3.2 Analisis Hari Efektif Belajar (HEB)

Berdasarkan Juknis Kalender Pendidikan Kemenag RI Tahun Ajaran **[TAHUN_AJARAN]**:

#### Semester I (Ganjil)
- **Jumlah Minggu Kalender**: 26 Minggu
- **Minggu Tidak Efektif** (MATSAMA, ASTS I, ASAS I, Libur Semester I, PHBN): 6 Minggu
- **Minggu Efektif Belajar (MEB)**: 20 Minggu
- **Total Hari Efektif Belajar (HEB)**: 100 Hari Belajar Efektif (Sistem 5 Hari Sekolah) / 120 Hari (Sistem 6 Hari Sekolah).

#### Semester II (Genap)
- **Jumlah Minggu Kalender**: 26 Minggu
- **Minggu Tidak Efektif** (ASTS II, Asesmen Madrasah XII, AAT/ASAS II, Libur Idul Fitri & Libur Akhir TA): 7 Minggu
- **Minggu Efektif Belajar (MEB) Kelas X & XI**: 19 Minggu
- **Minggu Efektif Belajar (MEB) Kelas XII**: 14 Minggu (Disesuaikan jadwal AM)

#### Ringkasan Kegiatan Akademik Utama Tahun Ajaran [TAHUN_AJARAN]

| No | Nama Kegiatan Akademik | Perkiraan Pelaksanaan | Keterangan |
|---|---|---|---|
| 1 | Masa Ta'aruf Siswa Madrasah (MATSAMA) | Minggu ke-3 Juli [TAHUN_AJARAN] | Pengenalan Budaya Madrasah |
| 2 | Asesmen Sumatif Tengah Semester (ASTS) I | Minggu ke-4 September [TAHUN_AJARAN] | Evaluasi Tengah Semester I |
| 3 | Asesmen Sumatif Akhir Semester (ASAS) I | Minggu ke-1 & 2 Desember [TAHUN_AJARAN] | Evaluasi Akhir Semester I |
| 4 | Pembagian Rapor Digital Madrasah (RDM) Semester I | Minggu ke-3 Desember [TAHUN_AJARAN] | Pelaporan Hasil Belajar |
| 5 | Asesmen Sumatif Tengah Semester (ASTS) II | Minggu ke-1 Maret [TAHUN_AJARAN] | Evaluasi Tengah Semester II |
| 6 | Asesmen Madrasah (AM) Utama Kelas XII | Minggu ke-3 & 4 Maret [TAHUN_AJARAN] | Penilaian Akhir Jenjang XII |
| 7 | Asesmen Sumatif Akhir Tahun (ASAT / AAT) Kelas X & XI | Minggu ke-1 & 2 Juni [TAHUN_AJARAN] | Kenaikan Kelas Fase E & F |
| 8 | Pembagian Rapor Digital Madrasah (RDM) Semester II | Minggu ke-4 Juni [TAHUN_AJARAN] | Penyerahan Rapor Kenaikan |`
      },
      {
        id: 'bab3-3',
        title: '3.3 Strategi Pengelolaan P5-PPRA (Projek Rahmatan Lil Alamin)',
        content: `### 3.3 Strategi Pengelolaan P5-PPRA

Pelaksanaan Projek Penguatan Profil Pelajar Pancasila dan Profil Pelajar Rahmatan Lil 'Alamin (P5-PPRA) di **[NAMA_MADRASAH]** menggunakan model **Sistem Blok Mingguan/Bulanan**.

#### Nilai-Nilai Utama PPRA Kemenag RI:
1. **Berkeadaban (*Ta'addub*)** - Menjunjung tinggi akhlak mulia dan kesopanan.
2. **Keteladanan (*Qudwah*)** - Menjadi panutan positif bagi sesama.
3. **Kewarganegaraan dan Kebangsaan (*Muwathanah*)** - Mencintai tanah air dan patuh hukum.
4. **Mengambil Jalan Tengah (*Tawasuth*)** - Memiliki kebiasaan bersikap moderat dan tidak ekstrem.
5. **Berimbang (*Tawazun*)** - Seimbang antara spiritual, intelektual, dan sosial.
6. **Lurus dan Tegas (*I'tidal*)** - Adil dan memegang teguh kebenaran.
7. **Kesetaraan (*Musawah*)** - Menghargai perbedaan tanpa diskriminasi.
8. **Musyawarah (*Syura*)** - Mengutamakan dialog dan mufakat.
9. **Toleransi (*Tasamuh*)** - Menghormati perbedaan keyakinan dan pandangan.
10. **Dinamis dan Inovatif (*Tathawwur wa Ibtikar*)** - Berpikir kreatif dan maju.

#### Tema Projek P5-PPRA [TAHUN_AJARAN]:
- **Tema 1 (Semester I)**: *"Gaya Hidup Berkelanjutan: Pengelolaan Sampah Organic & Green Eco-Madrasah"* (Fokus PPRA: *Tawazun* & *Tathawwur wa Ibtikar*).
- **Tema 2 (Semester II)**: *"Bhinneka Tunggal Ika & Moderasi Beragama: Gelar Budaya & Toleransi Nusantara"* (Fokus PPRA: *Tasamuh*, *Muwathanah*, & *Musawah*).`
      }
    ]
  },
  {
    id: 4,
    code: 'BAB IV',
    title: 'INSTRUMEN EVALUASI & SUPERVISI AKADEMIK',
    summary: 'Rubrik Supervisi Perangkat Pembelajaran (Modul Ajar), Rubrik Observasi Kelas Deep Learning, dan Form Analisis Daya Serap Siswa.',
    sections: [
      {
        id: 'bab4-1',
        title: '4.1 Rubrik Supervisi Perencanaan Pembelajaran (Modul Ajar)',
        content: `### 4.1 Rubrik Supervisi Perencanaan Pembelajaran (Modul Ajar / RPP)

**Nama Guru**: [NAMA_GURU] | **NIP**: [NIP] | **Mata Pelajaran**: [MATA_PELAJARAN] | **Kelas/Fase**: [KELAS]

#### Format Rubrik Penilaian Perangkat Ajar

| No | Komponen Administrasi & Modul Ajar | Skor Maks (1-4) | Indikator Kepatuhan & Kualitas |
|---|---|---|---|
| **I** | **Kelengkapan Administrasi Umum** | | |
| 1 | Kalender Pendidikan, Analisis Alokasi Waktu, & HEB | 4 | Tepat hitungan minggu efektif dan sinkron dengan Kemenag |
| 2 | Program Tahunan (Prota) dan Program Semester (Prosem) | 4 | Pemetaan TP terstruktur sesuai urutan logis |
| 3 | Alur Tujuan Pembelajaran (ATP) & Capaian Pembelajaran (CP) | 4 | ATP memuat Elemen, CP, TP, dan kriteria ketuntasan |
| **II** | **Komponen Inti Modul Ajar Deep Learning** | | |
| 4 | Identitas, Pemetaan Assesmen Awal (Diagnostic) | 4 | Memuat profil siswa dan pemetaan kemampuan awal |
| 5 | Tiga Pilar Deep Learning (*Mindful, Meaningful, Joyful*) | 4 | Kegiatan pembelajaran mendorong kesadaran, makna, dan kegembiraan |
| 6 | Integrasi Karakter & Nilai Moderasi Beragama (PPRA) | 4 | Menyisipkan nilai akhlak/wasathiyah secara alami |
| 7 | Strategi Pembelajaran HOTS & Media Digital | 4 | Menggunakan metode interaktif, media digital/AI |
| 8 | Asesmen Formatif & Asesmen Sumatif | 4 | Dilengkapi rubrik penilaian otentik dan instrumen soal |
| **III** | **Lampiran Perangkat** | | |
| 9 | Lembar Kerja Peserta Didik (LKPD) & Bahan Bacaan | 4 | LKPD kontekstual, menarik, dan menantang daya nalar |
| 10 | Instrumen Remedial & Pengayaan | 4 | Sesuai dengan variasi tingkat ketuntasan siswa |
| **TOTAL SKOR MAX = 40** | | | |

#### Kriteria Predikat Penilaian Perangkat:
- **91% - 100% (Skor 37-40)**: Sangat Baik (A)
- **81% - 90% (Skor 33-36)**: Baik (B)
- **71% - 80% (Skor 29-32)**: Cukup (C)
- **< 71% (Skor < 29)**: Perlu Bimbingan (D)`
      },
      {
        id: 'bab4-2',
        title: '4.2 Rubrik Observasi Pembelajaran di Kelas (Deep Learning)',
        content: `### 4.2 Rubrik Observasi Pembelajaran di Kelas

Observasi kelas mengukur 3 Tahapan Utama Pembelajaran (*Kegiatan Pendahuluan, Kegiatan Inti Deep Learning, dan Kegiatan Penutup*).

#### Lembar Penilaian Observasi Kelas

| No | Indikator Pengamatan Pembelajaran di Kelas | Skor (1-4) | Catatan / Temuan Supervisor |
|---|---|---|---|
| **A** | **KEGIATAN PENDAHULUAN** | | |
| 1 | Pembukaan dengan Salam, Doa, dan Tadarus Al-Qur'an / Asmaul Husna | [ ] | Budaya religius madrasah |
| 2 | Apersepsi, Pengkondisian Kelas *Mindful*, dan Motivasi Belajar | [ ] | Kesiapan mental siswa |
| 3 | Penyampaian Tujuan Pembelajaran & Relevance (*Meaningful*) | [ ] | Pemahaman arah belajar |
| **B** | **KEGIATAN INTI (DEEP LEARNING PROCESS)** | | |
| 4 | Penguasaan Materi Pembelajaran & Kebenaran Konsep | [ ] | Tidak terjadi miskonsepsi |
| 5 | Penerapan Pendekatan *Deep Learning* (Eksplorasi Mendalam) | [ ] | Penalaran kritis siswa |
| 6 | Penggunaan Media Pembelajaran Digital / ICT & Alat Peraga | [ ] | Interaktivitas kelas |
| 7 | Integrasi Nilai Wasathiyah / Karakter PPRA dalam Pembelajaran | [ ] | Internalisasi nilai agama |
| 8 | Manajemen Kelas, Interaksi Positif & Lingkungan *Joyful* | [ ] | Keaktifan & inklusivitas |
| 9 | Pelaksanaan Asesmen Formatif saat Proses KBM | [ ] | Monitoring pemahaman |
| **C** | **KEGIATAN PENUTUP** | | |
| 10 | Fasilitasi Refleksi Pembelajaran Bersama Siswa | [ ] | Umpan balik langsung |
| 11 | Penyimpulan Materi & Pemberian Tugas/Remedial/Pengayaan | [ ] | Ketuntasan belajar |
| 12 | Penutupan dengan Doa Kaffaratul Majlis & Salam | [ ] | Penutup religius |`
      },
      {
        id: 'bab4-3',
        title: '4.3 Form Analisis Daya Serap & Ketuntasan Belajar Siswa',
        content: `### 4.3 Form Analisis Daya Serap & Target Kurikulum

Setiap akhir semester, Waka Kurikulum mengumpulkan rekapitulasi Analisis Daya Serap (ADS) dan Target Kurikulum (TK) dari seluruh guru mata pelajaran:

#### Rumus Perhitungan:
1. **Target Kurikulum (TK)** = $\\frac{\\text{Jumlah TP/Materi yang Terlaksana}}{\\text{Total TP/Materi yang Direncanakan}} \\times 100\\%$
2. **Daya Serap Siswa (DS)** = $\\frac{\\text{Rata-Rata Nilai Asesmen Siswa}}{\\text{Skor Maksimal (100)}} \\times 100\\%$
3. **Persentase Ketuntasan (PK)** = $\\frac{\\text{Jumlah Siswa Nilai } \\ge \\text{KKTP}}{\\text{Total Siswa dalam Kelas}} \\times 100\\%$

#### Format Laporan Rekapitulasi Per Mata Pelajaran:

| No | Mata Pelajaran | KKM / KKTP | Jumlah Siswa | Target Kurikulum (%) | Daya Serap (%) | Ketuntasan (%) | Kendala Utama | Solusi / Tindak Lanjut |
|---|---|---|---|---|---|---|---|---|
| 1 | Al-Qur'an Hadis | 78 | 150 | 100% | 84,5% | 92,0% | Kemampuan Tajwid bervariasi | Program Peer Tutoring / Bimbingan Al-Qur'an |
| 2 | Bahasa Arab | 75 | 150 | 95% | 78,2% | 85,3% | Kosa kata (Mufradat) minim | Pembiasaan *Yaumul Lughah* & Aplikasi Quiz |
| 3 | Matematika | 75 | 150 | 92% | 74,1% | 78,0% | Prasyarat aljabar lemah | Klinik Matematika & Asesmen Diagnostik |
| 4 | Fisika | 75 | 150 | 90% | 76,5% | 81,2% | Visualisasi konsep abstrak | Praktikum Virtual Simulasi PhET |`
      }
    ]
  },
  {
    id: 5,
    code: 'BAB V',
    title: 'PROGRAM TINDAK LANJUT & PENJAMINAN MUTU',
    summary: 'Penguatan MGMP Madrasah, In-House Training (IHT), Program Remedial/Pengayaan, dan Format Laporan Evaluasi Kurikulum.',
    sections: [
      {
        id: 'bab5-1',
        title: '5.1 Program Penguatan MGMP Tingkat Madrasah',
        content: `### 5.1 Program Penguatan MGMP Tingkat Madrasah

Untuk memelihara budaya profesionalisme berkesinambungan, **[NAMA_MADRASAH]** memfasilitasi Musyawarah Guru Mata Pelajaran (MGMP) tingkat madrasah yang terbagi dalam 4 Kelompok Utama:

1. **MGMP Rumpun PAI & Bahasa Arab** (Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab).
2. **MGMP Rumpun Bahasa & Humaniora** (Bahasa Indonesia, Bahasa Inggris, Pendidikan Pancasila, Sejarah, Seni Budaya).
3. **MGMP Rumpun MIPA & Teknolog** (Matematika, Fisika, Kimia, Biologi, Informatika).
4. **MGMP Rumpun IPS & Ekonomi** (Ekonomi, Sosiologi, Geografi, BK, PJOK).

#### Agenda Wajib Rutin MGMP Internal:
- **Minggu ke-1**: Reviu & Analisis Alur Tujuan Pembelajaran (ATP) dan Perancangan Modul Ajar Deep Learning.
- **Minggu ke-2**: Pembuatan Bank Soal Asesmen Formatif & Sumatif Berbasis HOTS & Moderasi Beragama.
- **Minggu ke-3**: *Peer Teaching* & Lesson Study (Praktik Mengajar antarguru).
- **Minggu ke-4**: Evaluasi Hasil Asesmen & Penyusunan Media Pembelajaran Digital.`
      },
      {
        id: 'bab5-2',
        title: '5.2 Rencana Pelatihan Internal (In-House Training / IHT)',
        content: `### 5.2 Rencana Pelatihan Internal (In-House Training / IHT)

#### Jadwal & Judul Pelatihan Guru Tahun Ajaran [TAHUN_AJARAN]

| No | Nama Kegiatan IHT | Waktu Pelaksanaan | Sasaran Peserta | Narasumber / Fasilitator | Output / Produk Pelatihan |
|---|---|---|---|---|---|
| 1 | **IHT 1**: Workshop Penyusunan Modul Ajar *Deep Learning* & Kurikulum Berbasis Cinta | Minggu ke-1 Juli [TAHUN_AJARAN] | Seluruh Guru MA Bojongjati | Widyaiswara BDK / Pengawas Kemenag | Modul Ajar Deep Learning 1 Semester |
| 2 | **IHT 2**: Pelatihan Pembuatan Soal HOTS & Kisi-Kisi CBT RDM Kemenag | Minggu ke-3 Oktober [TAHUN_AJARAN] | Seluruh Guru Mata Pelajaran | Tim Pengembang Soal Kemenag | Bank Soal HOTS Terverifikasi |
| 3 | **IHT 3**: Bimtek Pemanfaatan Artificial Intelligence (AI) untuk Pembelajaran Interaktif | Minggu ke-2 Januari [TAHUN_AJARAN] | Seluruh Guru MA Bojongjati | Pakar Teknologi Pendidikan / Dosen | Prompts AI & Media Pembelajaran AI |
| 4 | **IHT 4**: Workshop Penulisan Karya Tulis Ilmiah (PTK) & Publikasi Guru | Minggu ke-2 April [TAHUN_AJARAN] | Guru PNS & Non-PNS | Tim Pengawas Madrasah | Draft Laporan Penelitian Tindakan Kelas |`
      },
      {
        id: 'bab5-3',
        title: '5.3 Program Remedial, Pengayaan, & Kelompok Belajar Unggulan',
        content: `### 5.3 Program Remedial, Pengayaan, & KBU

#### A. Strategi Program Remedial
Siswa yang belum mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) berhak mengikuti program remedial dengan ketentuan:
1. **Remedial Teaching (Pembelajaran Ulang)**: Jika > 50% siswa dalam satu kelas tidak tuntas.
2. **Tugas Kelompok / Peer Tutoring**: Jika 20% - 50% siswa tidak tuntas.
3. **Bimbingan Perorangan**: Jika < 20% siswa tidak tuntas.

#### B. Program Pengayaan
Siswa yang telah melampaui KKTP diberikan pengayaan berupa:
- Pendalaman materi tingkat lanjut (*HOTS Level 3*).
- Menjadi tutor sebaya dalam kelompok belajar.
- Penugasan proyek mandiri berbasis riset sederhana.

#### C. Kelompok Belajar Unggulan (KBU)
Dalam rangka meningkatkan daya saing madrasah, dibentuk 3 Kelompok Belajar Unggulan:
1. **KBU KSM (Kompetisi Sains Madrasah)**: Pembinaan intensif Matematika, Fisika, Kimia, Biologi, Ekonomi, dan Geografi terintegrasi keagamaan.
2. **KBU Tahfizh Al-Qur'an & Kitab Kuning**: Target hafalan minimal 3 Juz dan pemahaman dasar fiqih/nahwu sharaf.
3. **KBU MYRES (Madrasah Young Researchers Supercamp)**: Pembimbingan karya tulis ilmiah siswa bidang Sosial Humaniora, Keagamaan, dan Sains Teknik.`
      },
      {
        id: 'bab5-4',
        title: '5.4 Format Laporan Evaluasi Semester & Pengesahan Dokumen',
        content: `### 5.4 Format Laporan Evaluasi & Lembar Pengesahan

Setiap akhir semester, Waka Kurikulum menyusun **Laporan Evaluasi Kurikulum** yang disampaikan kepada Kepala Madrasah **[NAMA_KEPALA]** dan Pengawas Pembina Kementerian Agama RI.

---

### LEMBAR PENGESAHAN DOKUMEN KURIKULUM

Dokumen Master Administrasi & Program Kerja Wakil Kepala Madrasah Bidang Kurikulum **[NAMA_MADRASAH]** Tahun Ajaran **[TAHUN_AJARAN]** ini telah diperiksa, disetujui, dan disahkan pada:

**Hari / Tanggal**: [TANGGAL_DOKUMEN]  
**Tempat**: [KOTA_MADRASAH]

---

<br/>

| Mengetahui / Menyetujui: | Disusun Oleh: |
|---|---|
| **Kepala [NAMA_MADRASAH]** | **Waka Bidang Kurikulum** |
| <br/><br/><br/> | <br/><br/><br/> |
| **[NAMA_KEPALA]** | **[NAMA_WAKA]** |
| NIP. [NIP_KEPALA] | NIP. [NIP_WAKA] |

<br/>

| Mengetahui & Mengesahkan: |
|---|
| **Pengawas Pembina Madrasah Aliyah Kemenag** |
| <br/><br/><br/> |
| **(________________________________________)** |
| NIP. _____________________________________ |`
      }
    ]
  }
];
