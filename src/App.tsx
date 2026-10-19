/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VariableData } from './types';
import { defaultVariables } from './data/defaultVariables';
import { subscribeVariables, saveVariablesToFirestore } from './lib/firebase';
import { Header } from './components/Header';
import { VariableEditorModal } from './components/VariableEditorModal';
import { ChapterReader } from './components/ChapterReader';
import { SupervisionTool } from './components/SupervisionTool';
import { JtmCalculator } from './components/JtmCalculator';
import { ProgramManager } from './components/ProgramManager';
import { AiAssistant } from './components/AiAssistant';
import { PrintDocumentView } from './components/PrintDocumentView';

export default function App() {
  const [variables, setVariables] = useState<VariableData>(defaultVariables);
  const [activeTab, setActiveTab] = useState<string>('dokumen');
  const [isVariableModalOpen, setIsVariableModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeVariables((data) => {
      setVariables(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveVariables = (updated: VariableData) => {
    setVariables(updated);
    saveVariablesToFirestore(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col antialiased selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Header & Main Navigation */}
      <Header
        variables={variables}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenVariableModal={() => setIsVariableModalOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Screen Active Tab View */}
      <main className="flex-1 pb-16 print:hidden">
        {activeTab === 'dokumen' && (
          <ChapterReader
            variables={variables}
            onOpenVariableModal={() => setIsVariableModalOpen(true)}
            onPrint={handlePrint}
          />
        )}

        {activeTab === 'supervisi' && (
          <SupervisionTool
            variables={variables}
            onPrint={handlePrint}
          />
        )}

        {activeTab === 'jtm' && (
          <JtmCalculator variables={variables} />
        )}

        {activeTab === 'program' && (
          <ProgramManager variables={variables} />
        )}

        {activeTab === 'ai' && (
          <AiAssistant variables={variables} />
        )}
      </main>

      {/* Footer Bar */}
      <footer className="border-t-2 border-slate-900 bg-white py-4 text-xs text-slate-600 print:hidden font-mono uppercase">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-slate-900">{variables.NAMA_MADRASAH}</strong> • SISTEM ADMINISTRASI WAKA KURIKULUM TA {variables.TAHUN_AJARAN}
          </div>
          <div className="text-[11px] text-slate-500 font-bold">
            ACUAN REGULASI: KMA 1503 TAHUN 2025 • BSKAP NO. 46 TAHUN 2025 • KEMENAG RI
          </div>
        </div>
      </footer>

      {/* Variable Editor Modal */}
      <VariableEditorModal
        isOpen={isVariableModalOpen}
        onClose={() => setIsVariableModalOpen(false)}
        variables={variables}
        onSave={handleSaveVariables}
      />

      {/* Printable View (Rendered only on window.print()) */}
      <PrintDocumentView variables={variables} />

    </div>
  );
}
