'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SolicitarColeta() {
  const [doador, setDoador] = useState('');
  const [bairro, setBairro] = useState('');
  const [material, setMaterial] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [protocolo, setProtocolo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Montando a string de material para enviar à API
    const detalhesMaterial = `${quantidade} - ${material}`;

    try {
      const response = await fetch('/api/coletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doador,
          local: bairro,
          material: detalhesMaterial,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProtocolo(data.id || `#ELO-${Math.floor(10000 + Math.random() * 90000)}`);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative overflow-hidden font-sans text-slate-800">
      
      {/* Background Decorativo Translúcido */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar Simplificada */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl w-full mx-auto">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md group-hover:bg-blue-600 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Voltar ao Início</span>
        </Link>
      </nav>

      {/* Conteúdo Principal */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          
          {/* Card de Vidro Translúcido (Liquid Glass) */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8 sm:p-10">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Nova Solicitação</h1>
              <p className="text-slate-500 font-medium">O que você quer descartar hoje?</p>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Solicitação Enviada!</h2>
                <p className="text-slate-600 mb-6">Sua coleta foi registrada com sucesso.</p>
                <div className="bg-white/60 px-6 py-4 rounded-xl border border-white/80 w-full mb-8">
                  <span className="block text-sm text-slate-500 mb-1">Seu Protocolo:</span>
                  <span className="block text-2xl font-mono font-bold text-blue-600 tracking-wider">{protocolo}</span>
                </div>
                <button 
                  onClick={() => {
                    setStatus('idle');
                    setDoador('');
                    setBairro('');
                    setMaterial('');
                    setQuantidade('');
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-all shadow-md"
                >
                  Fazer nova solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {status === 'error' && (
                  <div className="bg-red-50/80 border-l-4 border-red-500 p-4 rounded-r-lg text-sm text-red-700 mb-4">
                    Ocorreu um erro ao enviar a solicitação. Tente novamente.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Seu Nome ou Empresa</label>
                  <input 
                    type="text" 
                    required
                    value={doador}
                    onChange={(e) => setDoador(e.target.value)}
                    placeholder="Ex: João da Silva" 
                    className="w-full bg-white/70 border border-white/50 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Bairro de Retirada</label>
                  <input 
                    type="text" 
                    required
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    placeholder="Ex: Messejana" 
                    className="w-full bg-white/70 border border-white/50 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Tipo de Eletrônico</label>
                    <input 
                      type="text" 
                      required
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      placeholder="Computador, celular..." 
                      className="w-full bg-white/70 border border-white/50 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Quantidade</label>
                    <input 
                      type="text" 
                      required
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                      placeholder="Ex: 3 CPUs" 
                      className="w-full bg-white/70 border border-white/50 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-[#2E7D5B] hover:bg-emerald-800 disabled:bg-slate-400 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    {status === 'loading' ? (
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Confirmar Doação'
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}