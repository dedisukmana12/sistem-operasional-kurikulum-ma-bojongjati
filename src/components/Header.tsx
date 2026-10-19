import React from 'react';
import { VariableData } from '../types';
import { 
  BookOpen, 
  Settings, 
  Printer, 
  FileText, 
  ClipboardCheck, 
  Calculator, 
  Calendar, 
  Sparkles,
  Building2,
  Award
} from 'lucide-react';

interface HeaderProps {
  variables: VariableData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenVariableModal: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  variables,
  activeTab,
  setActiveTab,
  onOpenVariableModal,
  onPrint,
}) => {
  const navItems = [
    { id: 'dokumen', code: '01', label: 'DOKUMEN MASTER (BAB I-V)', icon: FileText, badge: 'LENGKAP' },
    { id: 'supervisi', code: '02', label: 'SUPERVISI AKADEMIK', icon: ClipboardCheck, badge: 'INTERAKTIF' },
    { id: 'jtm', code: '03', label: 'ANALISIS JTM & HEB', icon: Calculator, badge: 'KMA 1503' },
    { id: 'program', code: '04', label: 'PROGRAM KERJA & RAB', icon: Calendar, badge: 'IKU' },
    { id: 'ai', code: '05', label: 'ASISTEN AI KURIKULUM', icon: Sparkles, badge: 'GEMINI 2.5' },
  ];

  return (
    <header className="bg-slate-900 text-white border-b-4 border-emerald-600 shadow-xl print:hidden">
      {/* Regulatory Ribbon */}
      <div className="bg-emerald-600 text-white text-[11px] py-1.5 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2 font-mono font-medium uppercase tracking-wider">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5" />
            REF: KMA NO. 1503/2025
          </span>
          <span className="opacity-60">|</span>
          <span>BSKAP NO. 46/2025</span>
          <span className="opacity-60">|</span>
          <span className="hidden sm:inline">KURIKULUM MERDEKA DEEP LEARNING</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="opacity-80">TAHUN AJARAN:</span>
          <span className="bg-slate-900 px-2 py-0.5 font-bold text-emerald-400 border border-emerald-500/50">
            {variables.TAHUN_AJARAN}
          </span>
        </div>
      </div>

      {/* Main Header Institutional Branding Area */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-emerald-600 text-slate-900 font-black text-2xl italic border-2 border-emerald-400 shadow-md">
              MA-BJ
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-none text-white">
                  DOKUMEN MASTER KURIKULUM
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px] px-2 py-0.5 font-bold border border-emerald-400/30 uppercase tracking-widest">
                  MADRASAH ALIYAH
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                {variables.NAMA_MADRASAH} • {variables.NSM_NPSN}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 border-l-2 border-emerald-500 pl-3">
                <span>Waka Kurikulum: <strong className="text-white font-mono">{variables.NAMA_WAKA}</strong></span>
                <span className="text-slate-600">•</span>
                <span>Kepala Madrasah: <strong className="text-white font-mono">{variables.NAMA_KEPALA}</strong></span>
              </div>
            </div>
          </div>

          {/* Top Quick Actions */}
          <div className="flex items-center gap-2 self-start md:self-auto border-l border-slate-800 pl-4">
            <button
              onClick={onOpenVariableModal}
              className="inline-flex items-center gap-2 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition uppercase tracking-wider"
              title="Edit Variabel Dokumen"
            >
              <Settings className="h-4 w-4 text-emerald-400" />
              <span>EDIT VARIABEL</span>
            </button>
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-2 bg-emerald-600 px-3.5 py-2 text-xs font-black text-slate-950 hover:bg-emerald-500 transition shadow-md uppercase tracking-wider"
              title="Cetak / PDF"
            >
              <Printer className="h-4 w-4" />
              <span>CETAK / PDF</span>
            </button>
          </div>
        </div>

        {/* Categorical Tab Navigation */}
        <nav className="mt-6 flex overflow-x-auto border-t border-slate-800 pt-3 pb-px scrollbar-none">
          <div className="flex space-x-1 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wider ${
                    isActive
                      ? 'bg-emerald-600 text-slate-950 shadow-md font-black border-b-2 border-amber-300'
                      : 'text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 font-extrabold ${isActive ? 'bg-slate-950 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                    {item.code}
                  </span>
                  <Icon className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
