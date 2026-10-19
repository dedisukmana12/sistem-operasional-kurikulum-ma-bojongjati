import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { VariableData } from '../types';
import { curriculumChapters } from '../data/curriculumDocumentData';

interface PrintDocumentViewProps {
  variables: VariableData;
}

export const PrintDocumentView: React.FC<PrintDocumentViewProps> = ({ variables }) => {
  const replaceVariables = (text: string): string => {
    let result = text;
    Object.entries(variables).forEach(([key, val]) => {
      const placeholder = new RegExp(`\\[${key}\\]`, 'g');
      result = result.replace(placeholder, val || `[${key}]`);
    });
    return result;
  };

  return (
    <div className="hidden print:block font-serif text-black p-8 max-w-4xl mx-auto bg-white">
      {/* Cover Page */}
      <div className="text-center py-20 min-h-screen flex flex-col justify-between border-b border-black">
        <div>
          <h3 className="text-sm font-sans tracking-widest font-bold uppercase mb-2">
            KEMENTERIAN AGAMA REPUBLIK INDONESIA
          </h3>
          <h1 className="text-2xl font-sans font-black uppercase tracking-tight">
            DOKUMEN MASTER ADMINISTRASI & OPERASIONAL KURIKULUM
          </h1>
          <h2 className="text-xl font-sans font-bold text-emerald-950 mt-1 uppercase">
            {variables.NAMA_MADRASAH}
          </h2>
          <p className="text-xs font-sans mt-2">
            TAHUN AJARAN {variables.TAHUN_AJARAN}
          </p>
          <p className="text-[10px] font-sans text-slate-600 mt-1">
            {variables.NSM_NPSN} • {variables.ALAMAT_MADRASAH}
          </p>
        </div>

        <div className="my-16">
          <p className="text-xs font-sans uppercase font-bold text-slate-700">
            PEDOMAN IMPLEMENTASI KURIKULUM MERDEKA DEEP LEARNING & KURIKULUM BERBASIS CINTA
          </p>
          <p className="text-xs font-sans text-slate-600 mt-1">
            Berdasarkan KMA No. 1503 Tahun 2025 & Regulasi BSKAP No. 46 Tahun 2025
          </p>
        </div>

        <div className="text-xs font-sans space-y-1 border-t border-black pt-8">
          <p>Disusun Oleh: <strong>Wakil Kepala Madrasah Bidang Kurikulum ({variables.NAMA_WAKA})</strong></p>
          <p>Disahkan Oleh: <strong>Kepala {variables.NAMA_MADRASAH} ({variables.NAMA_KEPALA})</strong></p>
          <p>{variables.KOTA_MADRASAH}, {variables.TANGGAL_DOKUMEN}</p>
        </div>
      </div>

      {/* Chapters Render */}
      <div className="mt-12 space-y-12">
        {curriculumChapters.map((chap) => (
          <div key={chap.id} className="page-break-before">
            <h1 className="text-xl font-sans font-extrabold uppercase border-b border-black pb-2 mb-4">
              {chap.code}: {replaceVariables(chap.title)}
            </h1>
            <p className="text-xs italic mb-6">{replaceVariables(chap.summary)}</p>

            <div className="space-y-8 text-xs leading-relaxed">
              {chap.sections.map((sec) => (
                <div key={sec.id}>
                  <div className="prose prose-sm max-w-none prose-table:border prose-td:border prose-th:border prose-th:bg-slate-100">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {replaceVariables(sec.content)}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
