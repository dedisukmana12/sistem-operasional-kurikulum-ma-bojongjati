import React, { useState, useEffect } from 'react';
import { VariableData, SubjectJtm } from '../types';
import { initialSubjectJtmList } from '../data/interactiveData';
import { 
  subscribeSubjects, 
  saveSubjectToFirestore, 
  deleteSubjectFromFirestore, 
  resetSubjectsInFirestore 
} from '../lib/firebase';
import { 
  Calculator, 
  Calendar, 
  BookOpen, 
  Clock, 
  Filter, 
  CheckCircle2, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  X, 
  Save, 
  AlertTriangle, 
  CheckCircle 
} from 'lucide-react';

interface JtmCalculatorProps {
  variables: VariableData;
}

export const JtmCalculator: React.FC<JtmCalculatorProps> = ({ variables }) => {
  const [subjects, setSubjects] = useState<SubjectJtm[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeSubjects((list) => {
      setSubjects(list);
    });
    return () => unsubscribe();
  }, []);

  const [selectedKelompok, setSelectedKelompok] = useState<string>('Semua');

  // Semester Effective Weeks Simulator State
  const [totalWeeks, setTotalWeeks] = useState<number>(26);
  const [nonEffectiveWeeks, setNonEffectiveWeeks] = useState<number>(6);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);

  // CRUD Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCode, setEditingCode] = useState<string | null>(null); // null means adding new

  const [formData, setFormData] = useState<SubjectJtm>({
    code: '',
    namaMatpel: '',
    kelompok: 'Umum (Nasional)',
    jtmKelasX: 2,
    jtmKelasXI: 2,
    jtmKelasXII: 2,
    keterangan: '',
  });

  // Delete Confirmation Modal State
  const [subjectToDelete, setSubjectToDelete] = useState<SubjectJtm | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('waka_jtm_subjects', JSON.stringify(subjects));
    } catch (e) {
      console.error('Failed to save subjects to localStorage', e);
    }
  }, [subjects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const effectiveWeeks = Math.max(0, totalWeeks - nonEffectiveWeeks);
  const totalHariEfektif = effectiveWeeks * daysPerWeek;

  // Filter subjects
  const filteredSubjects = subjects.filter((subj) =>
    selectedKelompok === 'Semua' ? true : subj.kelompok === selectedKelompok
  );

  // Calculate Totals
  const totalJtmX = subjects.reduce((acc, curr) => acc + (Number(curr.jtmKelasX) || 0), 0);
  const totalJtmXI = subjects.reduce((acc, curr) => acc + (Number(curr.jtmKelasXI) || 0), 0);
  const totalJtmXII = subjects.reduce((acc, curr) => acc + (Number(curr.jtmKelasXII) || 0), 0);

  // Handle Open Add Modal
  const handleOpenAdd = () => {
    // Generate next MP code
    const existingNum = subjects
      .map((s) => {
        const match = s.code.match(/MP-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => !isNaN(n));
    const nextNum = existingNum.length > 0 ? Math.max(...existingNum) + 1 : 1;
    const nextCode = `MP-${nextNum < 10 ? '0' + nextNum : nextNum}`;

    setEditingCode(null);
    setFormData({
      code: nextCode,
      namaMatpel: '',
      kelompok: 'Umum (Nasional)',
      jtmKelasX: 2,
      jtmKelasXI: 2,
      jtmKelasXII: 2,
      keterangan: 'Mapel Baru',
    });
    setIsModalOpen(true);
  };

  // Handle Open Edit Modal
  const handleOpenEdit = (subj: SubjectJtm) => {
    setEditingCode(subj.code);
    setFormData({ ...subj });
    setIsModalOpen(true);
  };

  // Handle Save (Add or Update)
  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaMatpel.trim()) return;

    if (editingCode) {
      // Update
      const updatedSubject = { ...formData };
      saveSubjectToFirestore(updatedSubject);
      showToast(`Mata pelajaran ${formData.namaMatpel} berhasil diperbarui.`);
    } else {
      // Create
      const codeExists = subjects.some((s) => s.code.toLowerCase() === formData.code.toLowerCase());
      const finalCode = codeExists ? `${formData.code}-${Date.now().toString().slice(-3)}` : formData.code;
      const newSubject = { ...formData, code: finalCode };

      saveSubjectToFirestore(newSubject);
      showToast(`Mata pelajaran ${formData.namaMatpel} berhasil ditambahkan.`);
    }

    setIsModalOpen(false);
  };

  // Handle Confirm Delete
  const handleConfirmDelete = () => {
    if (!subjectToDelete) return;
    const deletedName = subjectToDelete.namaMatpel;
    deleteSubjectFromFirestore(subjectToDelete.code);
    setSubjectToDelete(null);
    showToast(`Mata pelajaran ${deletedName} berhasil dihapus.`);
  };

  // Handle Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan struktur JTM ke alokasi standar KMA 1503 / 2025?')) {
      resetSubjectsInFirestore();
      showToast('Struktur JTM berhasil dikembalikan ke standar awal KMA 1503.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      
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
      {subjectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white shadow-2xl border-t-4 border-rose-600 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-rose-100 p-2 text-rose-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                  KONFIRMASI HAPUS MATA PELAJARAN
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Apakah Anda yakin ingin menghapus alokasi jam pelajaran untuk mata pelajaran ini?
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 font-mono text-xs space-y-1 text-slate-800">
              <div><strong className="text-slate-500 uppercase">KODE:</strong> {subjectToDelete.code}</div>
              <div><strong className="text-slate-500 uppercase">NAMA MAPEL:</strong> {subjectToDelete.namaMatpel}</div>
              <div><strong className="text-slate-500 uppercase">KELOMPOK:</strong> {subjectToDelete.kelompok}</div>
              <div>
                <strong className="text-slate-500 uppercase">JTM (X/XI/XII):</strong> {subjectToDelete.jtmKelasX} / {subjectToDelete.jtmKelasXI} / {subjectToDelete.jtmKelasXII} JP
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 font-mono">
              <button
                type="button"
                onClick={() => setSubjectToDelete(null)}
                className="border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 uppercase transition"
              >
                BATAL
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 text-xs font-black uppercase tracking-wider transition shadow-sm inline-flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>YA, HAPUS MAPEL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white shadow-2xl border-t-4 border-slate-900 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white border-b-2 border-emerald-600">
              <h2 className="text-base font-black uppercase tracking-tight flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <span>{editingCode ? 'EDIT ALOKASI JTM MAPEL' : 'TAMBAH MATA PELAJARAN BARU'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSubject} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
                    Kode Mapel
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-mono text-xs focus:border-emerald-600 focus:bg-white focus:outline-none"
                    placeholder="Contoh: MP-20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
                    Kelompok Mapel
                  </label>
                  <select
                    value={formData.kelompok}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        kelompok: e.target.value as SubjectJtm['kelompok'],
                      })
                    }
                    className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-bold text-xs focus:border-emerald-600 focus:bg-white focus:outline-none"
                  >
                    <option value="Keagamaan (Kemenag)">Keagamaan (Kemenag)</option>
                    <option value="Umum (Nasional)">Umum (Nasional)</option>
                    <option value="Pilihan / Peminatan">Pilihan / Peminatan</option>
                    <option value="P5-PPRA">P5-PPRA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
                  Nama Mata Pelajaran
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaMatpel}
                  onChange={(e) => setFormData({ ...formData, namaMatpel: e.target.value })}
                  className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 text-xs font-bold uppercase focus:border-emerald-600 focus:bg-white focus:outline-none"
                  placeholder="Contoh: Riset & Karya Tulis Ilmiah"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[10px] mb-1">
                    JTM Kelas X
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.jtmKelasX}
                    onChange={(e) => setFormData({ ...formData, jtmKelasX: Number(e.target.value) })}
                    className="w-full border border-slate-300 bg-white p-2 text-slate-900 font-mono text-center font-bold focus:border-emerald-600 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-500 font-mono block text-center mt-0.5">JP / MINGGU</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[10px] mb-1">
                    JTM Kelas XI
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.jtmKelasXI}
                    onChange={(e) => setFormData({ ...formData, jtmKelasXI: Number(e.target.value) })}
                    className="w-full border border-slate-300 bg-white p-2 text-slate-900 font-mono text-center font-bold focus:border-emerald-600 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-500 font-mono block text-center mt-0.5">JP / MINGGU</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 uppercase text-[10px] mb-1">
                    JTM Kelas XII
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.jtmKelasXII}
                    onChange={(e) => setFormData({ ...formData, jtmKelasXII: Number(e.target.value) })}
                    className="w-full border border-slate-300 bg-white p-2 text-slate-900 font-mono text-center font-bold focus:border-emerald-600 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-500 font-mono block text-center mt-0.5">JP / MINGGU</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1">
                  Keterangan / Catatan Regulasi
                </label>
                <input
                  type="text"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 text-xs focus:border-emerald-600 focus:bg-white focus:outline-none"
                  placeholder="Contoh: Muatan Lokal / Program Keahlian"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 font-mono">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 uppercase transition"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-5 py-2 text-xs font-black uppercase tracking-wider transition shadow-md inline-flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingCode ? 'SIMPAN PERUBAHAN' : 'TAMBAH MAPEL'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-slate-900 p-6 text-white border-b-4 border-emerald-600 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-400/30 uppercase tracking-widest mb-2">
              <Calculator className="h-3.5 w-3.5" />
              STRUKTUR KURIKULUM KMA 1503 / 2025
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              KALKULATOR JTM & ANALISIS HARI EFEKTIF BELAJAR (HEB)
            </h2>
            <p className="text-xs text-emerald-400 font-mono mt-1 uppercase tracking-wider">
              ALOKASI JAM MENGAJAR {variables.NAMA_MADRASAH.toUpperCase()} FASE E (KELAS X) & FASE F (KELAS XI & XII)
            </p>
          </div>
        </div>

        {/* Quick Summary Stat Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-4 font-mono">
          <div className="bg-slate-800 p-4 border-l-4 border-emerald-500">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">TOTAL JTM KELAS X (FASE E)</span>
            <div className="text-2xl font-black text-white mt-1">{totalJtmX} JP / MINGGU</div>
            <span className="text-[10px] text-slate-400 uppercase">TERMASUK P5-PPRA</span>
          </div>

          <div className="bg-slate-800 p-4 border-l-4 border-emerald-500">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">TOTAL JTM KELAS XI (FASE F)</span>
            <div className="text-2xl font-black text-white mt-1">{totalJtmXI} JP / MINGGU</div>
            <span className="text-[10px] text-slate-400 uppercase">TERMASUK MAPEL PILIHAN</span>
          </div>

          <div className="bg-slate-800 p-4 border-l-4 border-emerald-500">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">TOTAL JTM KELAS XII (FASE F)</span>
            <div className="text-2xl font-black text-white mt-1">{totalJtmXII} JP / MINGGU</div>
            <span className="text-[10px] text-slate-400 uppercase">TERMASUK MAPEL PILIHAN</span>
          </div>
        </div>
      </div>

      {/* Simulator Hari Efektif Belajar (HEB) */}
      <div className="bg-white p-6 border-t-4 border-slate-900 shadow-sm">
        <h3 className="text-base font-black uppercase tracking-tight text-slate-900 mb-1 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-700" />
          <span>SIMULASI HARI EFEKTIF BELAJAR (HEB) SEMESTER</span>
        </h3>
        <p className="text-xs text-slate-500 font-mono mb-4 uppercase">
          PERHITUNGAN MINGGU EFEKTIF BELAJAR TA {variables.TAHUN_AJARAN}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 border border-slate-200 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Total Minggu Kalender</label>
            <input
              type="number"
              value={totalWeeks}
              onChange={(e) => setTotalWeeks(Number(e.target.value))}
              className="w-full border border-slate-300 p-2 text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Minggu Tidak Efektif</label>
            <input
              type="number"
              value={nonEffectiveWeeks}
              onChange={(e) => setNonEffectiveWeeks(Number(e.target.value))}
              className="w-full border border-slate-300 p-2 text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Sistem Hari Sekolah</label>
            <select
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="w-full border border-slate-300 p-2 text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
            >
              <option value={5}>5 Hari Sekolah / Minggu</option>
              <option value={6}>6 Hari Sekolah / Minggu</option>
            </select>
          </div>

          <div className="bg-slate-900 text-white p-4 border-l-4 border-emerald-500 flex flex-col justify-center font-mono">
            <span className="text-[10px] text-emerald-400 uppercase font-bold">HASIL PERHITUNGAN</span>
            <div className="text-xl font-black text-white mt-0.5">
              {effectiveWeeks} MINGGU EFEKTIF
            </div>
            <span className="text-[10px] text-slate-300 font-bold uppercase">({totalHariEfektif} HARI BELAJAR EFEKTIF)</span>
          </div>
        </div>
      </div>

      {/* Structure Table & Actions */}
      <div className="bg-white p-6 border-t-4 border-emerald-600 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-black uppercase tracking-tight text-slate-900">
              RINCIAN ALOKASI JTM PER MATA PELAJARAN (KMA 1503/2025)
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              1 JP = 45 MENIT TATAP MUKA • KELOLA KETETAPAN JAM MENGAJAR MADRASAH
            </p>
          </div>

          {/* Action Buttons: Add & Reset */}
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 uppercase transition"
              title="Reset ke struktur alokasi standar KMA 1503"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span>RESET STANDAR</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-4 py-1.5 text-xs font-black uppercase tracking-wider transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>TAMBAH MAPEL</span>
            </button>
          </div>
        </div>

        {/* Group Filter Buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 border border-slate-200 font-mono">
          {['Semua', 'Keagamaan (Kemenag)', 'Umum (Nasional)', 'Pilihan / Peminatan', 'P5-PPRA'].map((group) => (
            <button
              key={group}
              onClick={() => setSelectedKelompok(group)}
              className={`px-3 py-1 text-[10px] font-bold uppercase transition ${
                selectedKelompok === group
                  ? 'bg-slate-900 text-emerald-400 font-black'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {group === 'Keagamaan (Kemenag)' ? 'Keagamaan' : group === 'Umum (Nasional)' ? 'Umum' : group}
            </button>
          ))}
        </div>

        {/* JTM Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider border-b-2 border-emerald-600">
                <th className="p-3 font-bold">KODE</th>
                <th className="p-3 font-bold">MATA PELAJARAN</th>
                <th className="p-3 font-bold">KELOMPOK</th>
                <th className="p-3 font-bold text-center">KELAS X</th>
                <th className="p-3 font-bold text-center">KELAS XI</th>
                <th className="p-3 font-bold text-center">KELAS XII</th>
                <th className="p-3 font-bold">KETERANGAN</th>
                <th className="p-3 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-mono text-xs uppercase">
                    Tidak ada mata pelajaran ditemukan.
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subj) => (
                  <tr key={subj.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-slate-700">{subj.code}</td>
                    <td className="p-3 font-bold text-slate-900 uppercase">{subj.namaMatpel}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                          subj.kelompok === 'Keagamaan (Kemenag)'
                            ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                            : subj.kelompok === 'Umum (Nasional)'
                            ? 'bg-slate-200 text-slate-950 border border-slate-300'
                            : subj.kelompok === 'P5-PPRA'
                            ? 'bg-amber-100 text-amber-950 border border-amber-300'
                            : 'bg-purple-100 text-purple-950 border border-purple-300'
                        }`}
                      >
                        {subj.kelompok}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold font-mono text-slate-900">
                      {subj.jtmKelasX > 0 ? `${subj.jtmKelasX} JP` : '-'}
                    </td>
                    <td className="p-3 text-center font-bold font-mono text-slate-900">
                      {subj.jtmKelasXI > 0 ? `${subj.jtmKelasXI} JP` : '-'}
                    </td>
                    <td className="p-3 text-center font-bold font-mono text-slate-900">
                      {subj.jtmKelasXII > 0 ? `${subj.jtmKelasXII} JP` : '-'}
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{subj.keterangan}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1 font-mono">
                        <button
                          onClick={() => handleOpenEdit(subj)}
                          className="p-1.5 text-slate-700 hover:bg-slate-200 border border-transparent hover:border-slate-300 transition"
                          title="Edit Alokasi JTM"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setSubjectToDelete(subj)}
                          className="p-1.5 text-rose-600 hover:bg-rose-100 border border-transparent hover:border-rose-300 transition"
                          title="Hapus Mapel"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
