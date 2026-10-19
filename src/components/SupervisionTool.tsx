import React, { useState, useEffect } from 'react';
import { VariableData, SupervisionRubricItem, SupervisionRecord } from '../types';
import { defaultModulAjarRubric, defaultObservationRubric } from '../data/interactiveData';
import { 
  subscribeSupervisionRecords, 
  saveSupervisionRecordToFirestore, 
  deleteSupervisionRecordFromFirestore 
} from '../lib/firebase';
import { 
  ClipboardCheck, 
  Award, 
  Plus, 
  Save, 
  Printer, 
  FileCheck2, 
  TrendingUp, 
  UserCheck, 
  Trash2,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  X
} from 'lucide-react';

interface SupervisionToolProps {
  variables: VariableData;
  onPrint: () => void;
}

const defaultInitialRecords: SupervisionRecord[] = [
  {
    id: 'rec-1',
    tanggal: '2026-08-10',
    namaGuru: 'Dra. Hajah Siti Aminah, M.Ag.',
    nipGuru: '19800315 200604 2 008',
    mataPelajaran: "Al-Qur'an Hadis",
    kelas: 'Kelas X (Fase E)',
    jenisSupervisi: 'Perencanaan (Modul Ajar)',
    skorTotal: 37,
    persentase: 92.5,
    predikat: 'Sangat Baik',
    catatanCatatanPositif: 'Sangat rapi dan memuat pilar Deep Learning secara utuh.',
    rekomendasiTindakLanjut: 'Dijadikan contoh modul ajar teladan pada MGMP Internal.',
  },
  {
    id: 'rec-2',
    tanggal: '2026-08-18',
    namaGuru: 'Drs. Rahmat Hidayat',
    nipGuru: '19760412 200501 1 004',
    mataPelajaran: 'Fikih',
    kelas: 'Kelas XI (Fase F)',
    jenisSupervisi: 'Pelaksanaan Pembelajaran',
    skorTotal: 34,
    persentase: 85.0,
    predikat: 'Baik',
    catatanCatatanPositif: 'Interaksi kelas aktif dan religius.',
    rekomendasiTindakLanjut: 'Perlu penguatan pilar Joyful Learning di awal KBM.',
  },
];

export const SupervisionTool: React.FC<SupervisionToolProps> = ({
  variables,
  onPrint,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'modul' | 'observasi' | 'riwayat'>('modul');

  // Teacher Form State
  const [teacherName, setTeacherName] = useState<string>('Dra. Hajah Siti Aminah, M.Ag.');
  const [teacherNip, setTeacherNip] = useState<string>('19800315 200604 2 008');
  const [subject, setSubject] = useState<string>("Al-Qur'an Hadis");
  const [className, setClassName] = useState<string>('Kelas X (Fase E)');
  const [obsDate, setObsDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Rubrics State
  const [modulRubric, setModulRubric] = useState<SupervisionRubricItem[]>([...defaultModulAjarRubric]);
  const [obsRubric, setObsRubric] = useState<SupervisionRubricItem[]>([...defaultObservationRubric]);

  // Overall Feedback State
  const [positiveNotes, setPositiveNotes] = useState<string>(
    'Guru menguasai materi dengan sangat baik, mengintegrasikan nilai Rahmatan Lil Alamin (PPRA) secara alami, serta menerapkan pola pilar Deep Learning (Mindful & Meaningful Learning).'
  );
  const [recommendations, setRecommendations] = useState<string>(
    'Meningkatkan penggunaan media asesmen digital interaktif (misal: Quizizz / Canva) pada saat asesmen formatif di akhir KBM.'
  );

  // Saved Records from Firestore
  const [records, setRecords] = useState<SupervisionRecord[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeSupervisionRecords((list) => {
      setRecords(list);
    });
    return () => unsubscribe();
  }, []);

  // State for delete modal and toast notification
  const [recordToDelete, setRecordToDelete] = useState<SupervisionRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle Score Change
  const handleScoreChange = (type: 'modul' | 'obs', id: string, newScore: number) => {
    if (type === 'modul') {
      setModulRubric((prev) =>
        prev.map((item) => (item.id === id ? { ...item, skor: newScore } : item))
      );
    } else {
      setObsRubric((prev) =>
        prev.map((item) => (item.id === id ? { ...item, skor: newScore } : item))
      );
    }
  };

  // Handle Catatan Change
  const handleNoteChange = (type: 'modul' | 'obs', id: string, newNote: string) => {
    if (type === 'modul') {
      setModulRubric((prev) =>
        prev.map((item) => (item.id === id ? { ...item, catatan: newNote } : item))
      );
    } else {
      setObsRubric((prev) =>
        prev.map((item) => (item.id === id ? { ...item, catatan: newNote } : item))
      );
    }
  };

  // Calculate Scores
  const currentRubric = activeSubTab === 'modul' ? modulRubric : obsRubric;
  const totalSkor = currentRubric.reduce((acc, curr) => acc + curr.skor, 0);
  const maxSkor = currentRubric.length * 4;
  const persentase = Math.round((totalSkor / maxSkor) * 1000) / 10;

  const getPredikat = (pct: number): 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' => {
    if (pct >= 90) return 'Sangat Baik';
    if (pct >= 80) return 'Baik';
    if (pct >= 70) return 'Cukup';
    return 'Perlu Bimbingan';
  };

  const currentPredikat = getPredikat(persentase);

  // Save Current Assessment to History
  const handleSaveAssessment = () => {
    const newRecord: SupervisionRecord = {
      id: `rec-${Date.now()}`,
      tanggal: obsDate,
      namaGuru: teacherName,
      nipGuru: teacherNip,
      mataPelajaran: subject,
      kelas: className,
      jenisSupervisi: activeSubTab === 'modul' ? 'Perencanaan (Modul Ajar)' : 'Pelaksanaan Pembelajaran',
      skorTotal: totalSkor,
      persentase,
      predikat: currentPredikat,
      catatanCatatanPositif: positiveNotes,
      rekomendasiTindakLanjut: recommendations,
    };

    saveSupervisionRecordToFirestore(newRecord);
    setToastMessage(`Hasil supervisi ${teacherName} berhasil disimpan ke Riwayat Rekapitulasi!`);
    setTimeout(() => setToastMessage(null), 4000);
    setActiveSubTab('riwayat');
  };

  // Confirm and delete record
  const confirmDeleteRecord = () => {
    if (!recordToDelete) return;
    const deletedName = recordToDelete.namaGuru;
    deleteSupervisionRecordFromFirestore(recordToDelete.id);
    setRecordToDelete(null);
    setToastMessage(`Data rekap supervisi ${deletedName} berhasil dihapus.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-4">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-600 text-slate-950 p-3.5 border-l-4 border-slate-900 shadow-md font-mono text-xs font-black uppercase tracking-wider flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-slate-950" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-emerald-700 transition">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {recordToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white shadow-2xl border-t-4 border-rose-600 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-rose-100 p-2 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                  KONFIRMASI HAPUS REKAP SUPERVISI
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Apakah Anda yakin ingin menghapus data hasil supervisi guru ini?
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 font-mono text-xs space-y-1 text-slate-800">
              <div><strong className="text-slate-500 uppercase">GURU:</strong> {recordToDelete.namaGuru}</div>
              <div><strong className="text-slate-500 uppercase">MATA PELAJARAN:</strong> {recordToDelete.mataPelajaran} ({recordToDelete.kelas})</div>
              <div><strong className="text-slate-500 uppercase">JENIS:</strong> {recordToDelete.jenisSupervisi}</div>
              <div><strong className="text-slate-500 uppercase">TANGGAL:</strong> {recordToDelete.tanggal}</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 font-mono">
              <button
                type="button"
                onClick={() => setRecordToDelete(null)}
                className="border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 uppercase transition"
              >
                BATAL
              </button>
              <button
                type="button"
                onClick={confirmDeleteRecord}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-xs font-black uppercase tracking-wider transition shadow-sm inline-flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>YA, HAPUS DATA</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Top Section Banner */}
      <div className="mb-6 bg-slate-900 p-6 text-white border-b-4 border-emerald-600 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-400/30 uppercase tracking-widest mb-2">
              <ClipboardCheck className="h-3.5 w-3.5" />
              INSTRUMEN RESMI WAKA KURIKULUM
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              INSTRUMEN & KALKULATOR SUPERVISI AKADEMIK GURU
            </h2>
            <p className="text-xs text-emerald-400 font-mono mt-1 max-w-2xl uppercase tracking-wider">
              BERBASIS KMA 1503 TAHUN 2025 • DEEP LEARNING (MINDFUL, MEANINGFUL, & JOYFUL)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-2 bg-emerald-600 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-emerald-500 transition shadow-lg uppercase tracking-wider"
            >
              <Printer className="h-4 w-4" />
              <span>CETAK HASIL SUPERVISI</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-6 flex flex-wrap gap-1 border-t border-slate-800 pt-4 font-mono">
          <button
            onClick={() => setActiveSubTab('modul')}
            className={`px-4 py-2 text-xs font-bold uppercase transition ${
              activeSubTab === 'modul'
                ? 'bg-emerald-600 text-slate-950 font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            01. MODUL AJAR (PERENCANAAN)
          </button>
          <button
            onClick={() => setActiveSubTab('observasi')}
            className={`px-4 py-2 text-xs font-bold uppercase transition ${
              activeSubTab === 'observasi'
                ? 'bg-emerald-600 text-slate-950 font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            02. OBSERVASI KELAS (KBM)
          </button>
          <button
            onClick={() => setActiveSubTab('riwayat')}
            className={`px-4 py-2 text-xs font-bold uppercase transition ${
              activeSubTab === 'riwayat'
                ? 'bg-emerald-600 text-slate-950 font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            03. REKAPITULASI RIWAYAT ({records.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeSubTab !== 'riwayat' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left / Top Teacher Data Form & Live Score Scorecard */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Teacher Info Card */}
            <div className="bg-white p-5 border-t-4 border-slate-900 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <UserCheck className="h-4 w-4 text-emerald-600" />
                <span>IDENTITAS GURU TER-SUPERVISI</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">Nama Guru</label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">NIP / NPT</label>
                  <input
                    type="text"
                    value={teacherNip}
                    onChange={(e) => setTeacherNip(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">Mata Pelajaran</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">Kelas/Fase</label>
                    <input
                      type="text"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase tracking-wider text-[10px]">Tanggal Observasi</label>
                  <input
                    type="date"
                    value={obsDate}
                    onChange={(e) => setObsDate(e.target.value)}
                    className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Scorecard Widget */}
            <div className="bg-slate-900 text-white p-6 border-t-4 border-emerald-500 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 font-mono">
                  HASIL REAL-TIME
                </span>
                <Award className="h-6 w-6 text-amber-400" />
              </div>

              <div className="mt-4 text-center">
                <div className="text-4xl font-black text-white font-mono">
                  {totalSkor} <span className="text-lg text-emerald-400 font-normal">/ {maxSkor}</span>
                </div>
                <div className="mt-1 text-2xl font-black text-amber-400 font-mono">
                  {persentase}%
                </div>
                
                <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-600 text-slate-950 px-4 py-1.5 text-xs font-black uppercase tracking-wider">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>PREDIKAT: {currentPredikat}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-4 text-xs font-mono text-slate-300 space-y-1">
                <p>• 90% - 100%: <strong className="text-emerald-400">SANGAT BAIK (A)</strong></p>
                <p>• 80% - 89%: <strong className="text-white">BAIK (B)</strong></p>
                <p>• 70% - 79%: <strong className="text-amber-400">CUKUP (C)</strong></p>
                <p>• &lt; 70%: <strong className="text-rose-400">PERLU BIMBINGAN (D)</strong></p>
              </div>

              <button
                onClick={handleSaveAssessment}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-emerald-600 px-4 py-3 text-xs font-black text-slate-950 hover:bg-emerald-500 transition shadow-md uppercase tracking-wider"
              >
                <Save className="h-4 w-4" />
                <span>SIMPAN HASIL SUPERVISI</span>
              </button>
            </div>

          </div>

          {/* Right Rubric Items Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 border-t-4 border-emerald-600 shadow-sm">
              
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight text-slate-900">
                    {activeSubTab === 'modul'
                      ? 'RUBRIK PENILAIAN MODUL AJAR (PERENCANAAN)'
                      : 'RUBRIK PENILAIAN OBSERVASI KELAS (PELAKSANAAN)'}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Skor: 1 (Kurang), 2 (Cukup), 3 (Baik), 4 (Sangat Baik)
                  </p>
                </div>
                <span className="bg-slate-900 text-white font-mono text-[10px] px-2.5 py-1 uppercase font-bold">
                  10 Indikator
                </span>
              </div>

              {/* Rubric Items List */}
              <div className="space-y-4">
                {currentRubric.map((item, idx) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-[10px] font-bold text-white">
                            {idx + 1}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                            {item.aspek}
                          </span>
                        </div>
                        <h4 className="mt-1 text-xs font-bold text-slate-900">
                          {item.indikator}
                        </h4>
                      </div>

                      {/* Skor Selector Buttons */}
                      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shrink-0">
                        {[1, 2, 3, 4].map((score) => (
                          <button
                            key={score}
                            onClick={() => handleScoreChange(activeSubTab === 'modul' ? 'modul' : 'obs', item.id, score)}
                            className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold transition ${
                              item.skor === score
                                ? 'bg-emerald-800 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Catatan Per Indikator */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Catatan / bukti fisik / temuan supervisor..."
                        value={item.catatan}
                        onChange={(e) => handleNoteChange(activeSubTab === 'modul' ? 'modul' : 'obs', item.id, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Findings Text Areas */}
              <div className="mt-6 border-t border-slate-200 pt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Catatan Kelebihan / Temuan Positif Supervisor
                  </label>
                  <textarea
                    rows={2}
                    value={positiveNotes}
                    onChange={(e) => setPositiveNotes(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Rekomendasi / Rencana Tindak Lanjut Penjaminan Mutu
                  </label>
                  <textarea
                    rows={2}
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* History & Summary Tab */
        <div className="bg-white p-6 border-t-4 border-slate-900 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                REKAPITULASI HASIL SUPERVISI AKADEMIK GURU {variables.NAMA_MADRASAH.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5 uppercase tracking-wide">
                TAHUN AJARAN {variables.TAHUN_AJARAN} • PEMBINAAN MUTU BERKELANJUTAN
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('modul')}
              className="inline-flex items-center gap-1.5 bg-emerald-600 px-4 py-2 text-xs font-black text-slate-950 hover:bg-emerald-500 uppercase tracking-wider transition shadow-sm font-mono"
            >
              <Plus className="h-4 w-4" />
              <span>SUPERVISI BARU</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider border-b-2 border-emerald-600">
                  <th className="p-3 font-bold">NO</th>
                  <th className="p-3 font-bold">TANGGAL</th>
                  <th className="p-3 font-bold">NAMA GURU & NIP</th>
                  <th className="p-3 font-bold">MATA PELAJARAN</th>
                  <th className="p-3 font-bold">JENIS SUPERVISI</th>
                  <th className="p-3 font-bold">SKOR / NILAI</th>
                  <th className="p-3 font-bold">PREDIKAT</th>
                  <th className="p-3 font-bold text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-500 font-mono text-xs uppercase">
                      Belum ada data rekapitulasi supervisi. Klik tombol "Supervisi Baru" di atas untuk menambah data.
                    </td>
                  </tr>
                ) : (
                  records.map((rec, idx) => (
                    <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-700">{idx + 1}</td>
                      <td className="p-3 font-mono text-slate-600">{rec.tanggal}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{rec.namaGuru}</div>
                        <div className="text-[11px] font-mono text-slate-500">{rec.nipGuru}</div>
                      </td>
                      <td className="p-3 text-slate-800 font-medium">{rec.mataPelajaran} ({rec.kelas})</td>
                      <td className="p-3 font-mono">
                        <span className="bg-slate-100 border border-slate-300 px-2 py-0.5 text-[10px] font-bold text-slate-800 uppercase">
                          {rec.jenisSupervisi}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-950">
                        {rec.skorTotal} ({rec.persentase}%)
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-mono px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                            rec.predikat === 'Sangat Baik'
                              ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                              : rec.predikat === 'Baik'
                              ? 'bg-teal-100 text-teal-950 border border-teal-300'
                              : 'bg-amber-100 text-amber-950 border border-amber-300'
                          }`}
                        >
                          {rec.predikat}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setRecordToDelete(rec)}
                          className="p-1.5 text-rose-600 hover:bg-rose-100 border border-transparent hover:border-rose-300 transition"
                          title="Hapus Record Supervisi"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
