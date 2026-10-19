import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { marked } from 'marked';
import { Chapter, VariableData } from '../types';
import { curriculumChapters } from '../data/curriculumDocumentData';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Printer, 
  ChevronRight, 
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';

interface ChapterReaderProps {
  variables: VariableData;
  onOpenVariableModal: () => void;
  onPrint: () => void;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({
  variables,
  onOpenVariableModal,
  onPrint,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Variable replacement helper function
  const replaceVariables = (text: string): string => {
    let result = text;
    Object.entries(variables).forEach(([key, val]) => {
      const placeholder = new RegExp(`\\[${key}\\]`, 'g');
      result = result.replace(placeholder, val || `[${key}]`);
    });
    return result;
  };

  // Currently selected chapter object with replaced variables
  const currentChapter = useMemo(() => {
    const chapter = curriculumChapters.find((c) => c.id === selectedChapterId) || curriculumChapters[0];
    return {
      ...chapter,
      title: replaceVariables(chapter.title),
      summary: replaceVariables(chapter.summary),
      sections: chapter.sections.map((s) => ({
        ...s,
        title: replaceVariables(s.title),
        content: replaceVariables(s.content),
      })),
    };
  }, [selectedChapterId, variables]);

  // Combined Markdown text of all chapters for full document export
  const fullDocumentMarkdown = useMemo(() => {
    return curriculumChapters
      .map((chap) => {
        const title = replaceVariables(chap.title);
        const code = chap.code;
        const sectionsText = chap.sections
          .map((sec) => replaceVariables(sec.content))
          .join('\n\n---\n\n');

        return `# ${code}: ${title}\n\n*${replaceVariables(chap.summary)}*\n\n${sectionsText}`;
      })
      .join('\n\n=======================================================\n\n');
  }, [variables]);

  // Copy current chapter Markdown
  const handleCopyChapter = () => {
    const textToCopy = currentChapter.sections
      .map((s) => `## ${s.title}\n\n${s.content}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Download Full Markdown File
  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([fullDocumentMarkdown], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Dokumen_Master_Kurikulum_${variables.NAMA_MADRASAH.replace(/\s+/g, '_')}_TA_${variables.TAHUN_AJARAN.replace('/', '-')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to convert markdown content into Word-compatible HTML with styled tables
  const convertMarkdownToWordHtml = (markdownContent: string): string => {
    if (!markdownContent) return '';
    
    // Parse markdown string into HTML using marked
    let rawHtml = marked.parse(markdownContent, { gfm: true }) as string;

    // Apply inline MS Word table formatting and element styling
    let formattedHtml = rawHtml
      .replace(
        /<table>/g,
        '<table border="1" cellpadding="6" cellspacing="0" width="100%" style="border-collapse: collapse; width: 100%; border: 1px solid #0f172a; margin: 12pt 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: Calibri, Arial, sans-serif;">'
      )
      .replace(
        /<thead>/g,
        '<thead style="background-color: #0f172a; color: #ffffff;">'
      )
      .replace(
        /<th>/g,
        '<th style="background-color: #0f172a; color: #ffffff; font-weight: bold; border: 1px solid #0f172a; padding: 7pt 9pt; text-align: left; font-size: 10pt; font-family: Calibri, Arial, sans-serif;">'
      )
      .replace(
        /<td>/g,
        '<td style="border: 1px solid #cbd5e1; padding: 6pt 8pt; vertical-align: top; font-size: 9.5pt; color: #1e293b; font-family: Calibri, Arial, sans-serif;">'
      )
      .replace(
        /<blockquote>/g,
        '<blockquote style="background-color: #f0fdf4; border-left: 4pt solid #059669; padding: 8pt 12pt; margin: 10pt 0; font-style: italic; color: #166534; font-family: Calibri, Arial, sans-serif;">'
      )
      .replace(
        /<p>/g,
        '<p style="margin-top: 0; margin-bottom: 6pt; line-height: 1.5; font-family: Calibri, Arial, sans-serif;">'
      )
      .replace(/<h1>/g, '<h1 style="color: #0f172a; font-size: 18pt; font-weight: bold; border-bottom: 2pt solid #0f172a; padding-bottom: 4pt; margin-top: 18pt; margin-bottom: 10pt; font-family: Calibri, Arial, sans-serif;">')
      .replace(/<h2>/g, '<h2 style="color: #047857; font-size: 14pt; font-weight: bold; margin-top: 14pt; margin-bottom: 8pt; font-family: Calibri, Arial, sans-serif;">')
      .replace(/<h3>/g, '<h3 style="color: #0f766e; font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; font-family: Calibri, Arial, sans-serif;">')
      .replace(/<ul>/g, '<ul style="margin-top: 4pt; margin-bottom: 8pt; padding-left: 20pt; font-family: Calibri, Arial, sans-serif;">')
      .replace(/<ol>/g, '<ol style="margin-top: 4pt; margin-bottom: 8pt; padding-left: 20pt; font-family: Calibri, Arial, sans-serif;">')
      .replace(/<li>/g, '<li style="margin-bottom: 3pt; font-size: 10.5pt; font-family: Calibri, Arial, sans-serif;">');

    let rowIdx = 0;
    formattedHtml = formattedHtml.replace(/<tr>/g, () => {
      rowIdx++;
      if (rowIdx % 2 === 0) {
        return '<tr style="background-color: #f8fafc; page-break-inside: avoid;">';
      }
      return '<tr style="background-color: #ffffff; page-break-inside: avoid;">';
    });

    return formattedHtml;
  };

  // Download HTML/Word format (.doc) with formatted tables
  const handleDownloadWord = () => {
    const chaptersContent = curriculumChapters
      .map((chap) => {
        const title = replaceVariables(chap.title);
        const code = chap.code;
        const summary = replaceVariables(chap.summary);
        
        const sectionsHtml = chap.sections
          .map((s) => {
            const secTitle = replaceVariables(s.title);
            const secContent = replaceVariables(s.content);
            const formattedContent = convertMarkdownToWordHtml(secContent);
            return `<h3 style="color: #0f766e; font-size: 12pt; font-weight: bold; margin-top: 16pt; margin-bottom: 8pt; font-family: Calibri, Arial, sans-serif;">${secTitle}</h3>${formattedContent}`;
          })
          .join('\n');

        return `
          <div style="margin-bottom: 30pt; page-break-after: always;">
            <div style="background-color: #f8fafc; border-left: 6pt solid #0f172a; padding: 12pt; margin-bottom: 16pt;">
              <span style="font-family: Consolas, monospace; font-size: 9pt; font-weight: bold; color: #64748b; text-transform: uppercase;">DOKUMEN KURIKULUM OPERASIONAL</span>
              <h1 style="color: #0f172a; font-size: 18pt; font-weight: bold; margin-top: 4pt; margin-bottom: 6pt; border-bottom: 2pt solid #0f172a; padding-bottom: 6pt;">${code}: ${title}</h1>
              <p style="font-style: italic; color: #334155; font-size: 10.5pt; margin: 0;">${summary}</p>
            </div>
            ${sectionsHtml}
          </div>
        `;
      })
      .join('<hr style="border: 0; border-top: 2pt solid #0f172a; margin: 24pt 0;"/>');

    const contentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Dokumen Master Kurikulum ${variables.NAMA_MADRASAH}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForCustomXSL/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 21.0cm 29.7cm; /* A4 */
            margin: 2.54cm 2.54cm 2.54cm 2.54cm;
          }
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #1e293b;
            padding: 20px;
          }
          table {
            border-collapse: collapse !important;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100% !important;
            margin: 12pt 0;
            border: 1px solid #0f172a;
          }
          tr {
            page-break-inside: avoid;
          }
          th {
            background-color: #0f172a !important;
            color: #ffffff !important;
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 10pt;
            font-weight: bold;
            padding: 8pt 10pt;
            border: 1px solid #0f172a !important;
            text-align: left;
          }
          td {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 9.5pt;
            padding: 6pt 8pt;
            border: 1px solid #cbd5e1 !important;
            vertical-align: top;
            color: #1e293b;
          }
          td p, th p {
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.3;
          }
          blockquote {
            background-color: #f0fdf4;
            border-left: 4pt solid #059669;
            padding: 8pt 12pt;
            margin: 10pt 0;
            font-style: italic;
            color: #166534;
          }
          ul, ol {
            margin-top: 4pt;
            margin-bottom: 8pt;
            padding-left: 20pt;
          }
          li {
            margin-bottom: 3pt;
          }
        </style>
      </head>
      <body>
        <div style="text-align: center; border-bottom: 3pt double #0f172a; padding-bottom: 16pt; margin-bottom: 24pt;">
          <h3 style="font-size: 11pt; letter-spacing: 1px; color: #475569; margin: 0; text-transform: uppercase;">KEMENTERIAN AGAMA REPUBLIK INDONESIA</h3>
          <h2 style="font-size: 14pt; color: #0f172a; margin: 4pt 0; text-transform: uppercase;">DOKUMEN MASTER OPERASIONAL KURIKULUM</h2>
          <h1 style="font-size: 22pt; color: #047857; margin: 6pt 0; font-weight: bold; text-transform: uppercase;">${variables.NAMA_MADRASAH}</h1>
          <p style="font-size: 10.5pt; color: #334155; margin: 4pt 0;"><strong>TAHUN AJARAN ${variables.TAHUN_AJARAN}</strong> | ${variables.NSM_NPSN}</p>
          <p style="font-size: 9.5pt; color: #64748b; margin: 2pt 0;">Acuan Regulasi: KMA No. 1503 Tahun 2025 & BSKAP No. 46 Tahun 2025</p>
        </div>
        
        ${chaptersContent}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', contentHtml], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dokumen_Master_Kurikulum_${variables.NAMA_MADRASAH.replace(/\s+/g, '_')}_TA_${variables.TAHUN_AJARAN.replace('/', '-')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return currentChapter.sections;
    const query = searchQuery.toLowerCase();
    return currentChapter.sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(query) ||
        sec.content.toLowerCase().includes(query)
    );
  }, [currentChapter, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      
      {/* Top Controls & Document Info Header */}
      <div className="mb-6 bg-white p-5 border-t-4 border-slate-900 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                REF: KMA 1503/2025
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold uppercase">
                DOKUMEN OPERASIONAL LENGKAP (BAB I - BAB V)
              </span>
            </div>
            <h2 className="mt-2 text-xl font-black text-slate-900 uppercase tracking-tight">
              Dokumen Master Kurikulum Operasional {variables.NAMA_MADRASAH}
            </h2>
            <p className="text-xs text-emerald-800 font-mono mt-0.5 uppercase tracking-wide">
              TAHUN AJARAN {variables.TAHUN_AJARAN} • KURIKULUM MERDEKA DEEP LEARNING & BSKAP NO. 46 TAHUN 2025
            </p>
          </div>

          {/* Quick Document Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyChapter}
              className="inline-flex items-center gap-1.5 border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100 uppercase tracking-wider transition"
              title="Salin Markdown Bab Ini"
            >
              {copiedId ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-500" />
                  <span>Salin Bab</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 border border-emerald-600 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900 hover:bg-emerald-100 uppercase tracking-wider transition"
              title="Unduh Seluruh Dokumen (5 BAB) Format Markdown .md"
            >
              <FileCode className="h-4 w-4 text-emerald-700" />
              <span>Unduh .MD</span>
            </button>

            <button
              onClick={handleDownloadWord}
              className="inline-flex items-center gap-1.5 bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 uppercase tracking-wider transition shadow-sm"
              title="Unduh Format Microsoft Word (.doc)"
            >
              <Download className="h-4 w-4" />
              <span>Unduh Word (.doc)</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 bg-emerald-600 px-3.5 py-2 text-xs font-black text-slate-950 hover:bg-emerald-500 uppercase tracking-wider transition shadow-sm"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Chapter Selector + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Chapter List & Table of Contents Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 border-t-4 border-slate-900 shadow-sm">
            <div className="p-2.5 bg-slate-100 border-b border-slate-200 mb-3 flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider">Document Hub BAB I-V</p>
              <span className="bg-slate-900 text-white font-mono text-[9px] px-1.5 py-0.5">5 BAB</span>
            </div>

            <div className="space-y-1">
              {curriculumChapters.map((chap) => {
                const isSelected = chap.id === selectedChapterId;
                return (
                  <button
                    key={chap.id}
                    onClick={() => {
                      setSelectedChapterId(chap.id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left p-3 transition-all flex items-start gap-3 border-b border-slate-100 ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-900 border-r-4 border-emerald-600 font-bold'
                        : 'bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`font-mono text-xs font-black px-2 py-1 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                      {chap.code.replace('BAB ', '0')}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          {chap.code}
                        </span>
                        <ChevronRight className={`h-4 w-4 shrink-0 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                      </div>
                      <h4 className="text-xs font-bold leading-snug line-clamp-2 mt-0.5 uppercase">
                        {replaceVariables(chap.title)}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table of Contents for Current Chapter */}
          <div className="bg-white p-4 border-t-4 border-emerald-600 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              <span>Sub-Bab {currentChapter.code}</span>
            </h3>
            <ul className="space-y-1 text-xs">
              {currentChapter.sections.map((sec, idx) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="block px-2 py-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 font-semibold transition line-clamp-1 border-l-2 border-transparent hover:border-emerald-600"
                  >
                    {idx + 1}. {sec.title.replace(/^\d+\.\d+\s*/, '')}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Variable Reminder Box */}
          <div className="bg-slate-900 p-4 text-white shadow-sm border-t-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Variabel Terpasang</span>
              </h4>
              <button
                onClick={onOpenVariableModal}
                className="text-[11px] font-bold text-emerald-400 hover:underline uppercase"
              >
                Ubah
              </button>
            </div>
            <div className="mt-3 text-[11px] font-mono text-slate-300 space-y-1 border-l-2 border-emerald-500 pl-3">
              <p>TA: <strong className="text-white">{variables.TAHUN_AJARAN}</strong></p>
              <p>WAKA: <strong className="text-white">{variables.NAMA_WAKA}</strong></p>
              <p>KEPALA: <strong className="text-white">{variables.NAMA_KEPALA}</strong></p>
            </div>
          </div>
        </div>

        {/* Right Column: Chapter Markdown Reader Content */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 sm:p-8 shadow-sm border-t-4 border-emerald-600 min-h-[700px]">
            
            {/* Search Filter Bar */}
            <div className="mb-6 flex items-center gap-3 bg-slate-50 p-2 border border-slate-300">
              <Search className="h-4 w-4 text-slate-500 ml-2" />
              <input
                type="text"
                placeholder={`Cari materi/kata kunci dalam ${currentChapter.code}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Chapter Header Banner */}
            <div className="mb-8 border-b-2 border-slate-900 pb-5">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-slate-900 text-white font-mono text-[11px] font-bold px-3 py-1 uppercase tracking-wider">
                  {currentChapter.code}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  DOCUMENT MASTER OPERASIONAL
                </span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase">
                {currentChapter.title}
              </h1>
              <div className="mt-3 text-xs text-slate-800 bg-slate-50 p-3 border-l-4 border-emerald-600 italic">
                {currentChapter.summary}
              </div>
            </div>

            {/* Sections Markdown Renderer */}
            {filteredSections.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-2" />
                <p className="text-sm font-medium">Tidak ditemukan hasil untuk kata kunci "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
                >
                  Tampilkan seluruh isi bab
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {filteredSections.map((sec) => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-6">
                    <div className="prose prose-slate max-w-none text-xs sm:text-sm prose-headings:font-black prose-headings:text-slate-900 prose-headings:uppercase prose-p:text-slate-800 prose-p:leading-relaxed prose-strong:text-slate-900 font-sans">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ node, ...props }) => (
                            <div className="my-6 overflow-x-auto border-t-4 border-slate-900 border-x border-b border-slate-300 shadow-sm bg-white">
                              <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between font-mono text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                <span>Tabel Data Kurikulum</span>
                                <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 font-black">Standar KMA 1503</span>
                              </div>
                              <table className="w-full text-left text-xs border-collapse min-w-[650px]" {...props} />
                            </div>
                          ),
                          thead: ({ node, ...props }) => (
                            <thead className="bg-slate-900 text-white font-mono uppercase tracking-wider border-b-2 border-emerald-600" {...props} />
                          ),
                          th: ({ node, ...props }) => (
                            <th className="p-3 font-extrabold text-[11px] text-slate-100 bg-slate-900 border-r border-slate-800 last:border-r-0 whitespace-nowrap text-left" {...props} />
                          ),
                          tbody: ({ node, ...props }) => (
                            <tbody className="divide-y divide-slate-200 text-slate-800" {...props} />
                          ),
                          tr: ({ node, ...props }) => (
                            <tr className="even:bg-slate-50/80 hover:bg-emerald-50/50 transition-colors" {...props} />
                          ),
                          td: ({ node, ...props }) => (
                            <td className="p-3 align-top border-r border-slate-200 last:border-r-0 leading-relaxed text-xs text-slate-800" {...props} />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote className="my-4 border-l-4 border-emerald-600 bg-slate-50 p-4 text-xs font-medium text-slate-800 italic" {...props} />
                          )
                        }}
                      >
                        {sec.content}
                      </ReactMarkdown>
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* End of Chapter Footer Navigation */}
            <div className="mt-12 border-t-2 border-slate-900 pt-6 flex items-center justify-between">
              <button
                disabled={selectedChapterId <= 1}
                onClick={() => setSelectedChapterId((prev) => Math.max(1, prev - 1))}
                className="border border-slate-900 bg-white px-4 py-2 text-xs font-black uppercase text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ← BAB SEBELUMNYA
              </button>
              <span className="text-xs font-mono font-bold text-slate-600 uppercase">
                BAB {selectedChapterId} DARI {curriculumChapters.length}
              </span>
              <button
                disabled={selectedChapterId >= curriculumChapters.length}
                onClick={() => setSelectedChapterId((prev) => Math.min(curriculumChapters.length, prev + 1))}
                className="bg-emerald-600 px-4 py-2 text-xs font-black uppercase text-slate-950 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-sm"
              >
                BAB SELANJUTNYA →
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
