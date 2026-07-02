'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative overflow-hidden font-sans text-slate-800">
      
      {/* Background Decorativo Translúcido (Liquid Glass Style) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar B2B - Foco em Doação */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl w-full mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-2xl font-extrabold text-slate-800 tracking-tight">COLECO</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
          <a href="#solucoes" className="hover:text-blue-600 transition-colors">Coleta Gratuita</a>
          <a href="#seguranca" className="hover:text-blue-600 transition-colors">Segurança de Dados</a>
          <a href="#esg" className="hover:text-blue-600 transition-colors">Impacto ESG</a>
        </div>

        <div>
          <Link href="/admin" className="text-sm font-bold text-slate-600 hover:text-blue-600 px-6 py-2.5 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-sm border border-slate-200">
            Acesso Restrito
          </Link>
        </div>
      </nav>

      {/* Hero Section - Comunicação de Custo Zero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-6xl mx-auto w-full mt-8 pb-16">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Logística Reversa 100% Gratuita e Segura
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-4xl mx-auto">
            Doe com segurança. Gere impacto com o seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Lixo Eletrônico</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Sua empresa tem equipamentos parados? Nós retiramos gratuitamente, garantimos a destruição segura dos dados e transformamos o material em educação e relatórios ESG para o seu negócio.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link 
              href="/solicitar-coleta" 
              className="w-full sm:w-auto bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-2xl text-lg flex items-center justify-center border border-slate-700"
            >
              Agendar Retirada Gratuita
            </Link>
            <a 
              href="#como-funciona" 
              className="w-full sm:w-auto bg-white/60 backdrop-blur-lg text-slate-800 border border-slate-300 hover:bg-white font-bold py-4 px-10 rounded-xl transition-all shadow-sm text-lg flex items-center justify-center"
            >
              Entenda como Funciona
            </a>
          </div>
        </div>

        {/* Por que a sua empresa deve doar? */}
        <div id="solucoes" className="w-full mt-12 mb-20 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Por que doar seus equipamentos para a COLECO?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10">O descarte incorreto gera multas e riscos à segurança da informação. Nossa plataforma resolve isso sem custos operacionais para a sua empresa.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/80 hover:bg-white/80 transition-all group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Custo Zero e Legalidade</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Emissão gratuita da Declaração de Destinação Final (DDF) com QR Code. Esteja em dia com a Política Nacional de Resíduos Sólidos.</p>
            </div>
            
            <div id="seguranca" className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/80 hover:bg-white/80 transition-all group">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Segurança de Dados (LGPD)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Garantimos a destruição lógica e física de discos rígidos e memórias antes de qualquer equipamento ser reciclado ou reutilizado.</p>
            </div>

            <div id="esg" className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/80 hover:bg-white/80 transition-all group">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Métricas e Impacto ESG</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Cada doação gera relatórios de impacto: total de emissões evitadas e alunos beneficiados através da nossa triagem educacional.</p>
            </div>
          </div>
        </div>

        {/* Informativo Visual de Como Funciona */}
        <div id="como-funciona" className="w-full bg-slate-900 rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-extrabold mb-4">A jornada da sua doação:</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <p className="text-slate-300 pt-1"><strong className="text-white">Solicitação Simples:</strong> Você informa o volume e agenda a retirada pelo nosso sistema.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <p className="text-slate-300 pt-1"><strong className="text-white">Coleta Gratuita:</strong> Nossos motoristas parceiros retiram o material sem custo algum para a sua empresa.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <p className="text-slate-300 pt-1"><strong className="text-white">Transformação:</strong> O lote passa por triagem para reciclagem técnica ou vira peças para laboratórios de robótica.</p>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 bg-white/10 p-6 md:p-8 rounded-2xl border border-white/20 backdrop-blur-sm text-center">
              <h3 className="text-2xl font-bold mb-3">Pronto para limpar o estoque sem custos?</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">Aceitamos computadores, monitores, cabos e periféricos de todos os tamanhos e volumes.</p>
              <Link 
                href="/solicitar-coleta" 
                className="inline-block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md"
              >
                Agendar Retirada Agora
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}