import React, { useState, useEffect } from 'react';
import { VariableData, ProgramItem, RabItem } from '../types';
import { initialProgramItems } from '../data/interactiveData';
import { subscribeProgramItems, saveProgramItemToFirestore } from '../lib/firebase';
import { Calendar, CheckCircle2, Clock, DollarSign, Plus, Check, Filter, Layers, AlertCircle } from 'lucide-react';

interface ProgramManagerProps {
  variables: VariableData;
}

export const ProgramManager: React.FC<ProgramManagerProps> = ({ variables }) => {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeProgramItems((list) => {
      setPrograms(list);
    });
    return () => unsubscribe();
  }, []);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [activeStatus, setActiveStatus] = useState<string>('Semua');

  // Modal / Add state
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newProgName, setNewProgName] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Tahunan' | 'Semesteran' | 'Bulanan' | 'Mingguan'>('Tahunan');
  const [newBudget, setNewBudget] = useState<number>(1000000);
  const [newTarget, setNewTarget] = useState<string>('');
  const [newPj, setNewPj] = useState<string>('Waka Kurikulum');

  // Handle status toggle
  const handleStatusChange = (id: string, newStatus: 'Belum Mulai' | 'Dalam Proses' | 'Selesai') => {
    const target = programs.find((p) => p.id === id);
    if (target) {
      saveProgramItemToFirestore({ ...target, status: newStatus });
    }
  };

  // Add new program item
  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgName.trim()) return;

    const newItem: ProgramItem = {
      id: `prog-${Date.now()}`,
      code: `PG-0${programs.length + 1}`,
      kategori: newCategory,
      namaKegiatan: newProgName,
      tujuan: 'Peningkatan mutu operasional kurikulum',
      sasaran: newTarget || 'Guru & Siswa MA Bojongjati',
      waktuPelaksanaan: 'Sesuai Matriks',
      penanggungJawab: newPj,
      anggaran: newBudget,
      indikatorHasil: 'Tercapainya target IKU Kurikulum',
      status: 'Belum Mulai',
    };

    saveProgramItemToFirestore(newItem);
    setIsAdding(false);
    setNewProgName('');
  };

  // Filtered Programs
  const filteredPrograms = programs.filter((p) => {
    const matchCat = activeCategory === 'Semua' ? true : p.kategori === activeCategory;
    const matchStat = activeStatus === 'Semua' ? true : p.status === activeStatus;
    return matchCat && matchStat;
  });

  // Calculate Budget Metrics
  const totalBudget = programs.reduce((acc, curr) => acc + curr.anggaran, 0);
  const completedCount = programs.filter((p) => p.status === 'Selesai').length;
  const inProgressCount = programs.filter((p) => p.status === 'Dalam Proses').length;
  const notStartedCount = programs.filter((p) => p.status === 'Belum Mulai').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 p-6 text-white border-b-4 border-emerald-600 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-400/30 uppercase tracking-widest mb-2">
              <Calendar className="h-3.5 w-3.5" />
              PROGRAM KERJA OPERASIONAL {variables.TAHUN_AJARAN}
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              MATRIKS PROGRAM KERJA & RENCANA ANGGARAN (RAB)
            </h2>
            <p className="text-xs text-emerald-400 font-mono mt-1 uppercase tracking-wider">
              PEMANTAUAN INDIKATOR KINERJA UTAMA (IKU) WAKA KURIKULUM MA BOJONGJATI
            </p>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-emerald-500 transition shadow-lg uppercase tracking-wider"
          >
            <Plus className="h-4 w-4" />
            <span>TAMBAH PROGRAM KERJA</span>
          </button>
        </div>

        {/* Quick Stat Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-slate-800 pt-4 font-mono">
          <div className="bg-slate-800 p-3 border-l-4 border-emerald-500">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">TOTAL ANGGARAN</span>
            <div className="text-lg font-black text-white mt-0.5">
              Rp {totalBudget.toLocaleString('id-ID')}
            </div>
            <span className="text-[10px] text-slate-400 uppercase">SUMBER: BOS & KOMITE</span>
          </div>

          <div className="bg-slate-800 p-3 border-l-4 border-emerald-500">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">PROGRAM SELESAI</span>
            <div className="text-2xl font-black text-white mt-0.5">{completedCount} KEGIATAN</div>
            <span className="text-[10px] text-slate-400 uppercase">{Math.round((completedCount/programs.length)*100)}% KETERCAPAIAN</span>
          </div>

          <div className="bg-slate-800 p-3 border-l-4 border-amber-500">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">DALAM PROSES</span>
            <div className="text-2xl font-black text-white mt-0.5">{inProgressCount} KEGIATAN</div>
            <span className="text-[10px] text-slate-400 uppercase">MONITORING AKTIF</span>
          </div>

          <div className="bg-slate-800 p-3 border-l-4 border-rose-500">
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">BELUM MULAI</span>
            <div className="text-2xl font-black text-white mt-0.5">{notStartedCount} KEGIATAN</div>
            <span className="text-[10px] text-slate-400 uppercase">AGENDA DATANG</span>
          </div>
        </div>
      </div>

      {/* Add Form Modal */}
      {isAdding && (
        <div className="rounded-2xl bg-white p-6 shadow-md border border-emerald-300 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Tambah Program Kerja Baru</h3>
          <form onSubmit={handleAddProgram} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Nama Kegiatan Program Kerja</label>
              <input
                type="text"
                value={newProgName}
                onChange={(e) => setNewProgName(e.target.value)}
                placeholder="Contoh: Workshop Penulisan Soal HOTS & RDM"
                className="w-full rounded-lg border border-slate-300 p-2 text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kategori Periodesasi</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 p-2 text-slate-900"
              >
                <option value="Tahunan">Tahunan</option>
                <option value="Semesteran">Semesteran</option>
                <option value="Bulanan">Bulanan</option>
                <option value="Mingguan">Mingguan</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Estimasi Anggaran (Rp)</label>
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 p-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sasaran / Peserta</label>
              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="Guru / Siswa Kelas XII"
                className="w-full rounded-lg border border-slate-300 p-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Penanggung Jawab</label>
              <input
                type="text"
                value={newPj}
                onChange={(e) => setNewPj(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 text-slate-900"
              />
            </div>

            <div className="md:col-span-3 flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-lg border px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-800 px-5 py-2 font-bold text-white hover:bg-emerald-700"
              >
                Simpan Program
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Program Tasks List Card */}
      <div className="bg-white p-6 border-t-4 border-slate-900 shadow-sm">
        
        {/* Filter Controls */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-1.5 font-mono">
            <span className="text-xs font-bold text-slate-500 mr-1 uppercase">Periodesasi:</span>
            {['Semua', 'Tahunan', 'Semesteran', 'Bulanan', 'Mingguan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase transition ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-emerald-400 font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-xs font-bold text-slate-500 mr-1 uppercase">Status:</span>
            {['Semua', 'Belum Mulai', 'Dalam Proses', 'Selesai'].map((stat) => (
              <button
                key={stat}
                onClick={() => setActiveStatus(stat)}
                className={`px-2.5 py-1 text-xs font-bold uppercase transition ${
                  activeStatus === stat
                    ? 'bg-emerald-600 text-slate-950 font-black'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {stat}
              </button>
            ))}
          </div>
        </div>

        {/* Program Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-mono uppercase">
                <th className="p-3 font-bold">KODE</th>
                <th className="p-3 font-bold">NAMA PROGRAM KERJA</th>
                <th className="p-3 font-bold">KATEGORI</th>
                <th className="p-3 font-bold">PENANGGUNG JAWAB</th>
                <th className="p-3 font-bold">WAKTU / TARGET</th>
                <th className="p-3 font-bold">ANGGARAN</th>
                <th className="p-3 font-bold">PROGRESS</th>
                <th className="p-3 font-bold">UBAH STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPrograms.map((prog) => (
                <tr key={prog.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-600">{prog.code}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{prog.namaKegiatan}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{prog.indikatorHasil}</div>
                  </td>
                  <td className="p-3">
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {prog.kategori}
                    </span>
                  </td>
                  <td className="p-3 text-slate-800 font-medium">{prog.penanggungJawab}</td>
                  <td className="p-3 text-slate-600">{prog.waktuPelaksanaan}</td>
                  <td className="p-3 font-bold text-slate-900">
                    Rp {prog.anggaran.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        prog.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prog.status === 'Dalam Proses'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {prog.status === 'Selesai' ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Clock className="h-3 w-3 text-amber-600" />
                      )}
                      <span>{prog.status}</span>
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={prog.status}
                      onChange={(e) => handleStatusChange(prog.id, e.target.value as any)}
                      className="rounded border border-slate-300 p-1 text-[11px] font-semibold text-slate-800 focus:outline-none"
                    >
                      <option value="Belum Mulai">Belum Mulai</option>
                      <option value="Dalam Proses">Dalam Proses</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
