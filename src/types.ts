export interface VariableData {
  TAHUN_AJARAN: string;
  NAMA_MADRASAH: string;
  NSM_NPSN: string;
  ALAMAT_MADRASAH: string;
  KOTA_MADRASAH: string;
  NAMA_KEPALA: string;
  NIP_KEPALA: string;
  NAMA_WAKA: string;
  NIP_WAKA: string;
  NAMA_KOMITE: string;
  TANGGAL_DOKUMEN: string;
  EMAIL_MADRASAH: string;
  TELEPON_MADRASAH: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string; // Markdown text with variable placeholders
}

export interface Chapter {
  id: number;
  code: string;
  title: string;
  summary: string;
  sections: ChapterSection[];
}

export interface ProgramItem {
  id: string;
  code: string;
  kategori: 'Tahunan' | 'Semesteran' | 'Bulanan' | 'Mingguan';
  namaKegiatan: string;
  tujuan: string;
  sasaran: string;
  waktuPelaksanaan: string;
  penanggungJawab: string;
  anggaran: number;
  indikatorHasil: string;
  status: 'Belum Mulai' | 'Dalam Proses' | 'Selesai';
}

export interface RabItem {
  id: string;
  kategori: string;
  kegiatan: string;
  rincianVolume: string;
  satuan: string;
  hargaSatuan: number;
  total: number;
  sumberDana: 'BOS' | 'BOP' | 'Komite' | 'Lainnya';
}

export interface SupervisionRubricItem {
  id: string;
  aspek: string;
  indikator: string;
  skor: number; // 1 - 4
  catatan: string;
}

export interface SupervisionRecord {
  id: string;
  tanggal: string;
  namaGuru: string;
  nipGuru: string;
  mataPelajaran: string;
  kelas: string;
  jenisSupervisi: 'Perencanaan (Modul Ajar)' | 'Pelaksanaan Pembelajaran' | 'Asesmen';
  skorTotal: number;
  persentase: number;
  predikat: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
  catatanCatatanPositif: string;
  rekomendasiTindakLanjut: string;
}

export interface SubjectJtm {
  code: string;
  namaMatpel: string;
  kelompok: 'Keagamaan (Kemenag)' | 'Umum (Nasional)' | 'Pilihan / Peminatan' | 'P5-PPRA';
  jtmKelasX: number; // JTM per minggu
  jtmKelasXI: number;
  jtmKelasXII: number;
  keterangan: string;
}
