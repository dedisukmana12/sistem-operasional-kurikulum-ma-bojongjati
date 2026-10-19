import React, { useState } from 'react';
import { VariableData } from '../types';
import { X, Save, RotateCcw, CheckCircle2, HelpCircle } from 'lucide-react';
import { defaultVariables } from '../data/defaultVariables';

interface VariableEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  variables: VariableData;
  onSave: (updated: VariableData) => void;
}

export const VariableEditorModal: React.FC<VariableEditorModalProps> = ({
  isOpen,
  onClose,
  variables,
  onSave,
}) => {
  const [formData, setFormData] = useState<VariableData>({ ...variables });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (key: keyof VariableData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData({ ...defaultVariables });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 1500);
  };

  const fields: { key: keyof VariableData; label: string; placeholder: string; helper?: string }[] = [
    { key: 'TAHUN_AJARAN', label: 'Tahun Ajaran [TAHUN_AJARAN]', placeholder: '2026/2027', helper: 'Contoh: 2026/2027' },
    { key: 'NAMA_MADRASAH', label: 'Nama Madrasah [NAMA_MADRASAH]', placeholder: 'Madrasah Aliyah Bojongjati' },
    { key: 'NAMA_KEPALA', label: 'Nama Kepala Madrasah [NAMA_KEPALA]', placeholder: 'Drs. H. Ahmad Sanusi, M.Pd.I.' },
    { key: 'NIP_KEPALA', label: 'NIP Kepala Madrasah [NIP_KEPALA]', placeholder: '19750812 200212 1 003' },
    { key: 'NAMA_WAKA', label: 'Nama Waka Kurikulum [NAMA_WAKA]', placeholder: 'M. Rizqi Mubarok, S.Pd.I., M.Pd.' },
    { key: 'NIP_WAKA', label: 'NIP Waka Kurikulum [NIP_WAKA]', placeholder: '19880514 201403 1 002' },
    { key: 'TANGGAL_DOKUMEN', label: 'Tanggal Pengesahan [TANGGAL_DOKUMEN]', placeholder: '14 Juli 2026' },
    { key: 'NSM_NPSN', label: 'NSM / NPSN Madrasah [NSM_NPSN]', placeholder: 'NSM: 131232040088 / NPSN: 69982104' },
    { key: 'KOTA_MADRASAH', label: 'Kota / Kabupaten [KOTA_MADRASAH]', placeholder: 'Bandung' },
    { key: 'ALAMAT_MADRASAH', label: 'Alamat Lengkap Madrasah [ALAMAT_MADRASAH]', placeholder: 'Jl. Raya Bojongjati No. 45' },
    { key: 'EMAIL_MADRASAH', label: 'Email Resmi [EMAIL_MADRASAH]', placeholder: 'kurikulum.ma.bojongjati@gmail.com' },
    { key: 'TELEPON_MADRASAH', label: 'Telepon Madrasah [TELEPON_MADRASAH]', placeholder: '(022) 5940123' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white shadow-2xl border-t-4 border-slate-900 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white border-b-2 border-emerald-600">
          <div>
            <h2 className="text-base font-black uppercase tracking-tight flex items-center gap-2">
              PENGATURAN VARIABEL DOKUMEN KURIKULUM
            </h2>
            <p className="text-xs text-emerald-400 font-mono mt-0.5 uppercase tracking-wide">
              NILAI VARIABLE OTOMATIS MERESAP KE BAB I-V, SURAT PENGESAHAN, & SUPERVISI
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-slate-100 border-l-4 border-emerald-600 p-3 text-xs text-slate-800 flex items-start gap-2.5 font-mono">
            <HelpCircle className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>INFORMASI VARIABEL:</strong> Teks bertanda <code>[TAHUN_AJARAN]</code> atau <code>[NAMA_WAKA]</code> di seluruh dokumen otomatis berubah mengikuti form di bawah ini.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1">
                <label className="block font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                  {f.label}
                </label>
                <input
                  type="text"
                  value={formData[f.key]}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 font-mono text-xs focus:border-emerald-600 focus:bg-white focus:outline-none transition"
                  required
                />
                {f.helper && <p className="text-[10px] font-mono text-slate-500">{f.helper}</p>}
              </div>
            ))}
          </div>

          {savedSuccess && (
            <div className="bg-emerald-600 text-slate-950 p-3 text-xs flex items-center justify-center gap-2 font-black uppercase tracking-wider animate-in zoom-in-95">
              <CheckCircle2 className="h-4 w-4" />
              <span>VARIABEL BERHASIL DIPERBARUI! MEMPERBARUI DOKUMEN...</span>
            </div>
          )}

          {/* Modal Footer */}
          <div className="sticky bottom-0 pt-4 bg-white border-t-2 border-slate-900 flex items-center justify-between font-mono">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-rose-600 font-bold uppercase transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>RESET DEFAULT MA BOJONGJATI</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 uppercase transition"
              >
                BATAL
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-emerald-600 px-5 py-2 text-xs font-black text-slate-950 hover:bg-emerald-500 uppercase tracking-wider transition shadow-md"
              >
                <Save className="h-4 w-4" />
                <span>SIMPAN VARIABEL</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
