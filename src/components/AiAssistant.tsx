import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { VariableData } from '../types';
import { Sparkles, Send, Copy, Check, Bot, User, RefreshCw, BookOpen, Lightbulb } from 'lucide-react';

interface AiAssistantProps {
  variables: VariableData;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ variables }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string }[]
  >([
    {
      role: 'assistant',
      text: `Assalamu'alaikum Wr. Wb. Bapak/Ibu **${variables.NAMA_WAKA}** (Waka Kurikulum ${variables.NAMA_MADRASAH}).

Saya adalah **Asisten AI Pakar Kurikulum Kemenag RI** yang siap membantu Anda menyusun perangkat KMA 1503 Tahun 2025, Modul Ajar Deep Learning, Modul P5-PPRA, Rekomendasi Supervisi, maupun Proposal IHT.

Silakan pilih perintah instan di bawah atau ketikkan pertanyaan/kebutuhan administrasi Anda.`,
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const presetPrompts = [
    {
      title: 'Modul Ajar Deep Learning',
      promptText: `Buatkan draft Modul Ajar Deep Learning (memuat 3 pilar: Mindful, Meaningful, & Joyful Learning) untuk mata pelajaran Al-Qur'an Hadis / Fikih Kelas X (Fase E) dengan integrasi nilai Moderasi Beragama Rahmatan Lil 'Alamin (PPRA).`,
    },
    {
      title: 'Proposal IHT Digital Pedagogy',
      promptText: `Susunkan Kerangka Proposal In-House Training (IHT) 2 Hari tentang "Pemanfaatan Artificial Intelligence & Digital Assessment untuk Guru Madrasah Aliyah Bojongjati Tahun Ajaran ${variables.TAHUN_AJARAN}".`,
    },
    {
      title: 'Catatan Supervisi Klinis',
      promptText: `Berikan contoh kalimat Catatan Supervisor Positif dan Rekomendasi Pembinaan Klinis yang santun namun tegas untuk guru matematika/bahasa arab yang belum menerapkan pendekatan HOTS dan Deep Learning.`,
    },
    {
      title: 'Modul Projek P5-PPRA Wasathiyah',
      promptText: `Rancangkan Alur Projek P5-PPRA Tema "Moderasi Beragama: Gelar Budaya & Toleransi Nusantara" (Sub-nilai PPRA: Tasamuh & Muwathanah) untuk Kelas X dan XI.`,
    },
    {
      title: 'Program Remedial & Pengayaan',
      promptText: `Buatkan rancangan alur Program Remedial Teaching dan Peer Tutoring (Tutor Sebaya) yang efektif untuk mengatasi ketidaktuntasan siswa pada mata pelajaran rumpun MIPA dan Bahasa.`,
    },
  ];

  const handleSendPrompt = async (textToSend?: string) => {
    const finalPrompt = textToSend || prompt;
    if (!finalPrompt.trim() || loading) return;

    const userMsg = { role: 'user' as const, text: finalPrompt };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          systemInstruction: `Anda adalah Konsultan Manajemen Pendidikan Islam dan Pakar Kurikulum Kemenag RI untuk ${variables.NAMA_MADRASAH}.
Gunakan acuan KMA No. 1503 Tahun 2025, BSKAP No. 46 Tahun 2025, Kurikulum Merdeka Deep Learning (Mindful, Meaningful, Joyful Learning), dan P5-PPRA Kemenag RI.
Sajikan jawaban dengan format Markdown yang rapi, profesional, berbasis tabel jika perlu, dan siap digunakan langsung oleh Waka Kurikulum (${variables.NAMA_WAKA}) dan Kepala Madrasah (${variables.NAMA_KEPALA}).`,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `⚠️ **Maaf, terjadi kendala:** ${data.error}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: data.text },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `⚠️ **Gagal terhubung dengan server AI:** ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 p-6 text-white border-b-4 border-emerald-600 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-400/30 uppercase tracking-widest mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              GEMINI 2.5 FLASH API INTEGRATED
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              ASISTEN AI KONSULTAN KURIKULUM KEMENAG RI
            </h2>
            <p className="text-xs text-emerald-400 font-mono mt-1 uppercase tracking-wider">
              BANTUAN GENERATIF OTOMATIS MODUL AJAR, P5-PPRA, SUPERVISI & IHT {variables.NAMA_MADRASAH}
            </p>
          </div>
        </div>

        {/* Preset Quick Actions */}
        <div className="mt-4 pt-4 border-t border-slate-800 font-mono">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
            PERINTAH INSTAN WAKA KURIKULUM:
          </span>
          <div className="flex flex-wrap gap-2">
            {presetPrompts.map((p, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => handleSendPrompt(p.promptText)}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 px-3 py-1.5 text-[11px] font-bold text-slate-200 border border-slate-700 transition uppercase disabled:opacity-50"
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white p-6 border-t-4 border-slate-900 shadow-sm min-h-[500px] flex flex-col justify-between">
        
        {/* Messages Scroll Area */}
        <div className="space-y-6 mb-6 overflow-y-auto max-h-[600px] pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs font-black ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-emerald-400'
                    : 'bg-emerald-600 text-slate-950'
                }`}
              >
                {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`relative p-4 max-w-[85%] text-xs sm:text-sm ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white font-mono border-l-4 border-emerald-500'
                    : 'bg-slate-50 text-slate-900 border border-slate-300'
                }`}
              >
                {m.role === 'assistant' ? (
                  <div className="prose prose-slate max-w-none text-xs sm:text-sm prose-headings:font-black prose-headings:uppercase">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({ node, ...props }) => (
                          <div className="my-4 overflow-x-auto border-t-2 border-slate-900 border-x border-b border-slate-300 shadow-sm bg-white">
                            <table className="w-full text-left text-xs border-collapse min-w-[500px]" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className="bg-slate-900 text-white font-mono uppercase tracking-wider border-b-2 border-emerald-600" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className="p-2.5 font-bold text-xs text-slate-100 bg-slate-900 border-r border-slate-800 last:border-r-0 text-left" {...props} />
                        ),
                        tbody: ({ node, ...props }) => (
                          <tbody className="divide-y divide-slate-200 text-slate-800" {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                          <tr className="even:bg-slate-50/80 hover:bg-emerald-50/50 transition-colors" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="p-2.5 align-top border-r border-slate-200 last:border-r-0 leading-relaxed text-xs text-slate-800" {...props} />
                        ),
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{m.text}</p>
                )}

                {m.role === 'assistant' && (
                  <button
                    onClick={() => handleCopy(m.text, idx)}
                    className="mt-3 inline-flex items-center gap-1 border border-slate-300 bg-white px-2 py-1 text-[10px] font-bold text-slate-700 hover:bg-slate-100 uppercase transition font-mono"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Salin Jawaban</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-slate-600 text-xs py-2 font-mono uppercase font-bold">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-600" />
              <span>Memproses dengan Gemini 2.5 Flash KMA 1503 / 2025...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
          className="flex items-center gap-2 border-t border-slate-300 pt-4"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Ketik pertanyaan atau kebutuhan administrasi kurikulum...`}
            className="flex-1 border border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 font-mono focus:bg-white focus:outline-none focus:border-emerald-600"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center gap-2 bg-emerald-600 px-5 py-3 text-xs font-black text-slate-950 hover:bg-emerald-500 disabled:opacity-40 transition shadow-md uppercase tracking-wider"
          >
            <Send className="h-4 w-4" />
            <span>Kirim</span>
          </button>
        </form>

      </div>

    </div>
  );
};
