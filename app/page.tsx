'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative overflow-hidden font-sans text-slate-800 selection:bg-emerald-200">
      
      {/* Background Decorativo Translúcido (Liquid Glass Style) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar B2B */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl w-full mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tight">COLECO</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-600">
          <a href="#impacto" className="hover:text-blue-600 transition-colors">O Problema</a>
          <a href="#solucoes" className="hover:text-blue-600 transition-colors">Vantagens Corporativas</a>
          <a href="#robotica" className="hover:text-blue-600 transition-colors">Projeto Robótica</a>
        </div>

        <div>
          <Link href="/admin" className="text-sm font-bold text-slate-700 hover:text-blue-600 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-sm border border-slate-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Acesso Restrito
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 max-w-6xl mx-auto w-full mt-10 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold mb-8 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          Logística Reversa 100% Gratuita para Empresas
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-5xl mx-auto mb-8">
          Transforme seu Lixo Eletrônico em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Educação e Sustentabilidade</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
          Pequenas, médias e grandes empresas trocam de equipamentos todos os dias. Nós retiramos o seu parque tecnológico obsoleto gratuitamente, destruímos seus dados com segurança e transformamos placas e peças em <strong>kits de robótica para projetos educacionais</strong>.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg mx-auto">
          <Link 
            href="/solicitar-coleta" 
            className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-lg flex items-center justify-center border border-slate-700"
          >
            Agendar Retirada Gratuita
          </Link>
        </div>
        
        <p className="mt-6 text-sm font-semibold text-slate-500 flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Atendendo empresas em Fortaleza e Região Metropolitana
        </p>
      </main>

      {/* Seção 1: O Problema Global e a Urgência */}
      <section id="impacto" className="relative z-10 w-full bg-white/40 backdrop-blur-xl border-y border-white/60 py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">O Brasil é o 5º maior produtor de lixo eletrônico do mundo.</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
              A cada ano, toneladas de computadores, celulares e baterias são descartadas incorretamente. Esses materiais contêm metais pesados como chumbo e mercúrio, que contaminam o solo e a água, gerando um passivo ambiental gigantesco.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Manter esses equipamentos parados no seu escritório gera custos de armazenamento e risco de vazamento de dados antigos. O descarte em lixo comum pode gerar multas pesadíssimas por infração à legislação ambiental.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <span className="text-4xl font-black text-red-500 mb-2">3%</span>
              <span className="text-sm font-bold text-slate-600">É a taxa atual de reciclagem de eletrônicos no Brasil.</span>
            </div>
            <div className="bg-white/80 p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center mt-8">
              <span className="text-4xl font-black text-amber-500 mb-2">2.5M</span>
              <span className="text-sm font-bold text-slate-600">De toneladas geradas todos os anos no país.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2: Benefícios para as Empresas (Por que doar?) */}
      <section id="solucoes" className="relative z-10 w-full py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Vantagens Estratégicas para o seu Negócio</h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg font-medium">Sua empresa não está apenas "limpando o estoque". A doação correta de ativos tecnológicos protege sua marca e gera valor corporativo.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="bg-white/60 backdrop-blur-2xl p-10 rounded-[2rem] shadow-xl border border-white hover:bg-white transition-all group">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Conformidade Legal (PNRS)</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Emissão gratuita da Declaração de Destinação Final (DDF) com validade jurídica. Previna-se contra multas da Política Nacional de Resíduos Sólidos.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-2xl p-10 rounded-[2rem] shadow-xl border border-white hover:bg-white transition-all group">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Garantia LGPD</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Seus dados não podem cair em mãos erradas. Garantimos a destruição lógica e física de HDDs, SSDs e memórias antes de qualquer reaproveitamento.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl p-10 rounded-[2rem] shadow-xl border border-white hover:bg-white transition-all group">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Relatórios ESG Automáticos</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Enviamos relatórios de impacto mostrando exatamente quantas emissões de CO2 foram evitadas e quantas vidas foram tocadas pela sua doação.</p>
          </div>

        </div>
      </section>

      {/* Seção 3: O Projeto Social (Robótica) */}
      <section id="robotica" className="relative z-10 w-full bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="md:w-1/2">
            <h2 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-3">Impacto Social Direto</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Placas velhas viram o futuro da educação.</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Nossa triagem é inteligente. O que não pode ser consertado não vira apenas sucata triturada. Nós separamos capacitores, motores de leitor de CD, cabos e LEDs de placas antigas para criar <strong>Kits de Robótica Maker</strong>.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Estes kits são doados para escolas públicas e ONGs parceiras, ensinando programação e eletrônica para jovens de baixa renda. O "lixo" da sua empresa capacita a próxima geração de profissionais de tecnologia.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-200 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg></div>
                Motores de impressoras viram carrinhos robóticos.
              </li>
              <li className="flex items-center gap-3 text-slate-200 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg></div>
                Placas-mãe fornecem componentes eletrônicos preciosos.
              </li>
              <li className="flex items-center gap-3 text-slate-200 font-bold">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg></div>
                Monitores funcionais equipam laboratórios de informática.
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
            <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-black text-emerald-400 mb-2">+500</span>
              <span className="text-sm font-bold text-slate-300 uppercase tracking-wide">Kits Montados</span>
            </div>
            <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm flex flex-col justify-center items-center text-center">
              <span className="text-5xl font-black text-blue-400 mb-2">+1.2k</span>
              <span className="text-sm font-bold text-slate-300 uppercase tracking-wide">Jovens Impactados</span>
            </div>
            <div className="col-span-2 bg-gradient-to-r from-blue-600/40 to-emerald-600/40 border border-white/20 p-8 rounded-3xl backdrop-blur-sm mt-2 text-center">
              <h4 className="text-xl font-bold text-white mb-2">Quer fazer parte dessa mudança?</h4>
              <p className="text-slate-300 text-sm mb-6">Qualquer empresa, independente do tamanho, pode doar e transformar vidas.</p>
              <Link 
                href="/solicitar-coleta" 
                className="inline-block bg-white text-slate-900 font-extrabold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-white/25 hover:scale-105"
              >
                Quero Doar Meus Equipamentos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="relative z-10 w-full py-8 text-center text-slate-500 text-sm font-semibold border-t border-slate-200 mt-auto">
        <p>© {new Date().getFullYear()} COLECO - Todos os direitos reservados. Promovendo a Economia Circular no Brasil.</p>
      </footer>
    </div>
  );
}