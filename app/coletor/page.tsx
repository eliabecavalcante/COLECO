'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Fallback alinhado com os novos campos de endereço e prioridade
const fallbackColetas = [
  { id: '#ELO-12345', doador: 'Empresa Alfa', endereco: 'Av. Washington Soares, 123', bairro: 'Messejana', material: 'CPUs e cabos', prioridade: 'Alta', status: 'Agendada' },
  { id: '#ELO-12346', doador: 'Faculdade Beta', endereco: 'Rua Desembargador Moreira, 45', bairro: 'Aldeota', material: 'Monitores', prioridade: 'Normal', status: 'Em Rota' },
  { id: '#ELO-12347', doador: 'Escola Gama', endereco: 'Rua Floriano Peixoto, 800', bairro: 'Centro', material: 'Ponto cheio', prioridade: 'Urgente', status: 'Pendente' },
];

export default function ColetorMobileApp() {
  const router = useRouter();
  
  // Controle de abas da barra inferior ('rota' ou 'perfil')
  const [activeTab, setActiveTab] = useState('rota');
  
  // Estados de dados conectados com a API
  const [coletas, setColetas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados cadastrados pelo Administrador
  useEffect(() => {
    const buscarColetas = async () => {
      try {
        const response = await fetch('/api/coletas');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setColetas(data.length > 0 ? data : fallbackColetas);
          } else if (data && Array.isArray(data.coletas)) {
            setColetas(data.coletas.length > 0 ? data.coletas : fallbackColetas);
          } else {
            setColetas(fallbackColetas);
          }
        } else {
          setColetas(fallbackColetas);
        }
      } catch (error) {
        setColetas(fallbackColetas);
      } finally {
        setLoading(false);
      }
    };

    buscarColetas();
  }, []);

  // Simula a confirmação da coleta mudando o status no banco local (UI)
  const handleConfirmarColeta = (id: string) => {
    setColetas((prevColetas) =>
      prevColetas.map((coleta) =>
        coleta.id === id ? { ...coleta, status: 'Coletada' } : coleta
      )
    );
  };

  // Função de Logout do Coletor
  const handleLogout = () => {
    router.push('/admin');
  };

  // Estilização dinâmica das "tags" de status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Agendada':
      case 'Pendente':
        return <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-wider border border-slate-200">{status}</span>;
      case 'Em Rota':
        return <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-wider border border-amber-200 animate-pulse">Em Rota</span>;
      case 'Coletada':
      case 'Concluída':
        return <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-wider border border-emerald-200">Coletada ✓</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-[10px] uppercase tracking-wider border border-slate-200">{status || 'Pendente'}</span>;
    }
  };

  // Contagem de progresso da rota
  const coletasPendentes = coletas.filter(c => c.status !== 'Coletada' && c.status !== 'Concluída').length;
  const coletasConcluidas = coletas.filter(c => c.status === 'Coletada' || c.status === 'Concluída').length;

  return (
    // Fundo da tela do desktop
    <div className="min-h-screen bg-[#E2E8F0] font-sans text-slate-800 flex justify-center items-center py-4">
      
      {/* MOCKUP DO CELULAR (Altura ajustada para max-h-[90vh] para não cortar no seu monitor) */}
      <div className="w-full max-w-[400px] h-[100dvh] sm:h-[800px] sm:max-h-[90vh] bg-[#F8FAFC] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col sm:border-[8px] border-slate-800">
        
        {/* HEADER DO APP */}
        <header className="bg-white px-6 py-5 shadow-sm z-10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-800 leading-tight">
                {activeTab === 'rota' ? 'Operação de Rota' : 'Meu Perfil'}
              </h1>
              <p className="text-xs font-semibold text-emerald-600">Online e conectado</p>
            </div>
          </div>
        </header>

        {/* ÁREA DE CONTEÚDO ROLÁVEL (com pb-20 para não esconder conteúdo atrás da navbar) */}
        <main className="flex-1 overflow-y-auto pb-24 bg-slate-50">
          
          {activeTab === 'rota' ? (
            <div className="p-5 space-y-6">
              
              {/* Resumo Rápido da Rota */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-center">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">A Fazer</span>
                  <span className="text-blue-600 font-extrabold text-3xl leading-none">{coletasPendentes}</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-center">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Concluídas</span>
                  <span className="text-emerald-500 font-extrabold text-3xl leading-none">{coletasConcluidas}</span>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Lista de Coletas</h2>
              </div>

              {/* Lista Dinâmica Vinda da API */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-10 text-slate-400 font-bold animate-pulse">Sincronizando com a base...</div>
                ) : coletas.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 font-bold">Nenhuma coleta atribuída para hoje.</div>
                ) : (
                  coletas.map((coleta, index) => (
                    <div 
                      key={coleta.id || index} 
                      className={`bg-white rounded-2xl p-5 shadow-sm transition-all border-2 
                        ${coleta.status === 'Coletada' || coleta.status === 'Concluída' 
                          ? 'border-emerald-100 bg-emerald-50/20 opacity-70' 
                          : 'border-transparent'}`}
                    >
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <div className="flex-1">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">{coleta.id}</span>
                          <h3 className="text-lg font-extrabold text-slate-800 leading-tight">{coleta.doador}</h3>
                          <p className="text-slate-500 text-sm font-medium mt-1">{coleta.endereco || coleta.local || coleta.bairro}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(coleta.status)}
                          {coleta.prioridade === 'Urgente' && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase">Urgente</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 rounded-lg p-3 mb-5 border border-slate-100">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Material a coletar</span>
                        <p className="text-slate-700 text-sm font-semibold">
                          {coleta.material || 'Material eletrônico diverso'} {coleta.quantidade ? `(${coleta.quantidade})` : ''}
                        </p>
                      </div>
                      
                      {/* Botões de Ação do Motorista */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-blue-50 text-blue-600 font-bold py-3.5 rounded-xl text-sm transition-colors hover:bg-blue-100 flex justify-center items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          Navegar
                        </button>
                        <button 
                          onClick={() => handleConfirmarColeta(coleta.id)}
                          disabled={coleta.status === 'Coletada' || coleta.status === 'Concluída'}
                          className={`flex-1 font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm flex justify-center items-center gap-2
                            ${coleta.status === 'Coletada' || coleta.status === 'Concluída' 
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                        >
                          {coleta.status === 'Coletada' || coleta.status === 'Concluída' ? 'Concluído' : 'Confirmar'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            
            /* TELA DE PERFIL DO COLETOR */
            <div className="p-5 h-full flex flex-col justify-center">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-blue-300 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg mb-4 border-4 border-white">
                  GB
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800">Gabriel Souza</h2>
                <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-2 mb-8">
                  Coletor de Frota
                </span>

                <div className="w-full space-y-4 text-left">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Veículo Padrão</span>
                    <span className="block text-sm font-bold text-slate-700 mt-1">Fiorino Branca (ABC-1234)</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Região de Atuação</span>
                    <span className="block text-sm font-bold text-slate-700 mt-1">Fortaleza e Região Metropolitana</span>
                  </div>
                </div>

                <div className="w-full mt-10">
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-extrabold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Encerrar Sessão
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* BOTTOM NAVIGATION BAR (Fixo no rodapé) */}
        <nav className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 px-6 py-4 flex justify-around items-center z-20 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          
          <button 
            onClick={() => setActiveTab('rota')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'rota' ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'rota' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'rota' ? 1.5 : 2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            <span className="text-[10px] font-extrabold tracking-wide">Minha Rota</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('perfil')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'perfil' ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill={activeTab === 'perfil' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === 'perfil' ? 1.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] font-extrabold tracking-wide">Meu Perfil</span>
          </button>

        </nav>
      </div>
    </div>
  );
}