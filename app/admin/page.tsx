'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const fallbackColetas = [
  { id: '#ELO-12345', doador: 'Empresa Alfa', endereco: 'Av. Washington Soares, 123', bairro: 'Messejana', material: 'CPUs', quantidade: '18kg', prioridade: 'Alta', data: '2026-07-03', status: 'Em Rota', eta: '2 hrs' },
  { id: '#ELO-12346', doador: 'Faculdade Beta', endereco: 'Rua Desembargador Moreira, 45', bairro: 'Aldeota', material: 'Monitores', quantidade: '42kg', prioridade: 'Normal', data: '2026-07-02', status: 'Concluída', eta: '-' },
  { id: '#ELO-12347', doador: 'Escola Gama', endereco: 'Rua Floriano Peixoto, 800', bairro: 'Centro', material: 'Ponto Cheio', quantidade: '60kg', prioridade: 'Urgente', data: '2026-07-04', status: 'Pendente', eta: '-' },
];

export default function AdminDashboard() {
  const router = useRouter();

  // ----- SISTEMA DE LOGIN E CADASTRO LOCAL (localStorage) -----
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Estados para Gestão de Usuários (Cadastro Completo)
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('coletor');
  const [registerMessage, setRegisterMessage] = useState('');

  useEffect(() => {
    const storedUsers = localStorage.getItem('coleco_users');
    if (!storedUsers) {
      const defaultUsers = [
        { fullName: 'Administrador Principal', email: 'admin@coleco.com', phone: '(85) 99999-9999', username: 'admin', password: '159', role: 'admin' },
        { fullName: 'Gabriel Souza', email: 'gabriel.motorista@coleco.com', phone: '(85) 98888-8888', username: 'gabriel', password: '256', role: 'coletor' }
      ];
      localStorage.setItem('coleco_users', JSON.stringify(defaultUsers));
      setRegisteredUsers(defaultUsers);
    } else {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const storedUsers = JSON.parse(localStorage.getItem('coleco_users') || '[]');
    const user = storedUsers.find((u: any) => u.username === username && u.password === password);

    if (user) {
      if (user.role === 'admin') {
        setIsLoggedIn(true);
      } else if (user.role === 'coletor') {
        router.push('/coletor');
      }
    } else {
      setLoginError('Usuário ou senha incorretos.');
    }
  };

  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterMessage('');

    if (!newFullName || !newUsername || !newPassword) return;

    const storedUsers = JSON.parse(localStorage.getItem('coleco_users') || '[]');
    
    if (storedUsers.some((u: any) => u.username === newUsername)) {
      setRegisterMessage('Erro: Esse usuário de login já existe!');
      return;
    }

    const newUser = { 
      fullName: newFullName, email: newEmail, phone: newPhone, 
      username: newUsername, password: newPassword, role: newRole 
    };
    
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('coleco_users', JSON.stringify(updatedUsers));
    setRegisteredUsers(updatedUsers);

    setNewFullName(''); setNewEmail(''); setNewPhone('');
    setNewUsername(''); setNewPassword(''); setNewRole('coletor');
    setRegisterMessage('Colaborador cadastrado com sucesso!');
    
    setTimeout(() => {
      setRegisterMessage('');
      setShowRegisterForm(false);
    }, 2000);
  };

  const handleDeleteUser = (userToDelete: string) => {
    if (userToDelete === 'admin') {
      alert('Ação bloqueada: Não é possível excluir o gestor master.');
      return;
    }
    if (confirm(`Tem certeza que deseja excluir o usuário "${userToDelete}"?`)) {
      const storedUsers = JSON.parse(localStorage.getItem('coleco_users') || '[]');
      const updatedUsers = storedUsers.filter((u: any) => u.username !== userToDelete);
      localStorage.setItem('coleco_users', JSON.stringify(updatedUsers));
      setRegisteredUsers(updatedUsers);
    }
  };

  // ----- ESTADOS DO DASHBOARD DE GESTÃO DE COLETAS -----
  const [activeTab, setActiveTab] = useState('indicadores');
  const [coletas, setColetas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Novos campos para o formulário de coleta avançado
  const [novoDoador, setNovoDoador] = useState('');
  const [novoEndereco, setNovoEndereco] = useState('');
  const [novoBairro, setNovoBairro] = useState('');
  const [novoMaterial, setNovoMaterial] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState('');
  const [novaPrioridade, setNovaPrioridade] = useState('Normal');
  const [novaData, setNovaData] = useState('');

  useEffect(() => {
    if (!isLoggedIn) return;

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
  }, [isLoggedIn]);

  const handleAddColeta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoDoador || !novoBairro) return;

    const novaColetaLocal = {
      id: `#ELO-${Math.floor(10000 + Math.random() * 90000)}`,
      doador: novoDoador,
      endereco: novoEndereco,
      bairro: novoBairro,
      material: novoMaterial,
      quantidade: novaQuantidade,
      prioridade: novaPrioridade,
      data: novaData,
      status: 'Pendente',
      eta: '-',
    };

    try {
      const response = await fetch('/api/coletas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          doador: novoDoador, 
          local: novoBairro,
          endereco: novoEndereco,
          material: novoMaterial,
          quantidade: novaQuantidade,
          prioridade: novaPrioridade,
          data: novaData
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Mesclando os dados avançados que criamos localmente caso a API base ainda não suporte todos os campos
        const coletaEnriquecida = { ...novaColetaLocal, ...data };
        setColetas((prev) => [coletaEnriquecida, ...(Array.isArray(prev) ? prev : [])]);
      } else {
        setColetas((prev) => [novaColetaLocal, ...(Array.isArray(prev) ? prev : [])]);
      }
    } catch (error) {
      setColetas((prev) => [novaColetaLocal, ...(Array.isArray(prev) ? prev : [])]);
    }

    // Limpando o formulário
    setNovoDoador('');
    setNovoEndereco('');
    setNovoBairro('');
    setNovoMaterial('');
    setNovaQuantidade('');
    setNovaPrioridade('Normal');
    setNovaData('');
  };

  const getBadgePrioridade = (prioridade: string) => {
    switch (prioridade) {
      case 'Baixa': return <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Baixa</span>;
      case 'Alta': return <span className="text-orange-600 bg-orange-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Alta</span>;
      case 'Urgente': return <span className="text-red-600 bg-red-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase animate-pulse">Urgente</span>;
      case 'Normal':
      default: return <span className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Normal</span>;
    }
  };

  const dataAtual = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date());

  // ----- TELA DE LOGIN -----
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">COLECO</h1>
            <p className="text-slate-400 text-sm mt-1">Acesso Restrito ao Sistema</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-xl text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1 ml-1">Usuário</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} placeholder="" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1 ml-1">Senha</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg mt-4">Entrar no Sistema</button>
            <div className="text-center mt-6">
              <Link href="/" className="text-slate-400 text-sm hover:text-white transition-colors">← Voltar ao site principal</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----- DASHBOARD DO ADMINISTRADOR -----
  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
      {/* SIDEBAR NOVO LAYOUT */}
      <aside className="w-[280px] bg-[#111827] flex flex-col shrink-0 z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-white text-xl font-extrabold tracking-widest uppercase">COLECO</span>
        </div>

        <div className="flex flex-col items-center py-10 border-b border-slate-800">
          <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-blue-400 to-emerald-400 mb-4 flex items-center justify-center shadow-lg border border-white/10">
            <span className="text-white font-extrabold text-2xl">EC</span>
          </div>
          <span className="text-white font-bold text-lg">Eliabe Cavalcante</span>
          <span className="text-emerald-400 text-xs font-bold mt-1 tracking-wide">Gestor Master ESG</span>
          
          <button 
            onClick={() => {
              setIsLoggedIn(false);
              setUsername(''); setPassword(''); setActiveTab('indicadores');
            }}
            className="mt-6 text-xs text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 px-5 py-2 rounded-full transition-all"
          >
            Encerrar Sessão
          </button>
        </div>

        <div className="px-8 py-5"><span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">PAINÉIS</span></div>
        <nav className="flex-1 overflow-y-auto px-4">
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab('indicadores')} className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all ${activeTab === 'indicadores' ? 'bg-[#1F2937] text-white border border-slate-700 shadow-sm' : 'hover:bg-[#1F2937] text-slate-400'}`}>
                <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <span className="font-semibold text-sm">Indicadores ESG</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('acessos')} className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all ${activeTab === 'acessos' ? 'bg-[#1F2937] text-white border border-slate-700 shadow-sm' : 'hover:bg-[#1F2937] text-slate-400'}`}>
                <svg className="w-5 h-5 mr-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <span className="font-semibold text-sm">Acessos e Frota</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="h-20 bg-white shadow-sm border-b border-slate-200 flex items-center justify-between px-8 z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">Painel de Governança Circular</h1>
            <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider hidden sm:block">Operação Ativa</span>
          </div>
          <div className="text-sm font-medium text-slate-500">Hoje, {dataAtual}</div>
        </header>

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-y-auto">
          
          {activeTab === 'acessos' ? (
            <div className="p-8 max-w-6xl mx-auto">
              {!showRegisterForm ? (
                // LISTAGEM DE USUÁRIOS
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-800 mb-1">Colaboradores Cadastrados</h2>
                      <p className="text-slate-500 text-sm">Gerencie os acessos da sua equipe operacional e de campo.</p>
                    </div>
                    <button onClick={() => setShowRegisterForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> Novo Colaborador
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-y border-slate-200">
                          <th className="py-4 px-6 font-bold">Colaborador</th>
                          <th className="py-4 px-6 font-bold">Contato</th>
                          <th className="py-4 px-6 font-bold">Login do Sistema</th>
                          <th className="py-4 px-6 font-bold">Perfil</th>
                          <th className="py-4 px-6 font-bold text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                        {registeredUsers.map((user, index) => (
                          <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6"><span className="font-bold text-slate-800 block">{user.fullName || 'Não informado'}</span><span className="text-xs text-slate-500">{user.email || '-'}</span></td>
                            <td className="py-4 px-6 font-medium">{user.phone || '-'}</td>
                            <td className="py-4 px-6 font-medium text-slate-500">@{user.username}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${user.role === 'admin' ? 'text-blue-700 bg-blue-50 border border-blue-200' : 'text-emerald-700 bg-emerald-50 border border-emerald-200'}`}>
                                {user.role === 'admin' ? 'Administrador' : 'Coletor de Frota'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button onClick={() => handleDeleteUser(user.username)} className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${user.username === 'admin' ? 'text-slate-400 border-slate-200 cursor-not-allowed' : 'text-red-500 border-red-200 hover:bg-red-50'}`} disabled={user.username === 'admin'}>Excluir</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // FORMULÁRIO DE CADASTRO COMPLETO
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 w-full max-w-3xl mx-auto relative">
                  <button onClick={() => setShowRegisterForm(false)} className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 text-sm font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Voltar
                  </button>
                  <div className="text-center mb-8 mt-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Novo Colaborador</h2>
                    <p className="text-slate-500 text-sm">Preencha os dados abaixo para gerar um acesso ao painel ou app de motorista.</p>
                  </div>
                  {registerMessage && <div className={`p-4 rounded-xl mb-6 text-sm font-bold text-center ${registerMessage.includes('Erro') ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>{registerMessage}</div>}

                  <form onSubmit={handleRegisterUser} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nome Completo</label><input type="text" required value={newFullName} onChange={(e) => setNewFullName(e.target.value)} placeholder="Ex: Amália Santos" className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50" /></div>
                      <div><label className="block text-sm font-bold text-slate-700 mb-2 ml-1">E-mail Corporativo</label><input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="amalia@coleco.com" className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Telefone / WhatsApp</label><input type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="(00) 00000-0000" className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50" /></div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Perfil de Acesso</label>
                        <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 bg-white appearance-none cursor-pointer">
                          <option value="coletor">Coletor (Acesso restrito à rota mobile)</option>
                          <option value="admin">Administrador (Acesso total)</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-6">
                      <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Credenciais de Login</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Usuário do Sistema</label><input type="text" required value={newUsername} onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/\s/g, ''))} placeholder="Ex: amalia.santos" className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white" /></div>
                        <div><label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Senha Provisória</label><input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white" /></div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors mt-6 shadow-sm">Cadastrar Colaborador</button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8">
              {/* GRIDS DE MÉTRICAS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
                  <h3 className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wide">Total Solicitado</h3>
                  <span className="text-4xl font-extrabold text-slate-800 mb-4">869</span>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
                  <h3 className="text-sm font-bold text-red-500 mb-2 uppercase tracking-wide">Coletas Pendentes</h3>
                  <span className="text-4xl font-extrabold text-slate-800 mb-4">49</span>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-red-500 h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
                  <h3 className="text-sm font-bold text-emerald-600 mb-2 uppercase tracking-wide">Coletas Concluídas</h3>
                  <span className="text-4xl font-extrabold text-slate-800 mb-4">1,050</span>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '50%' }}></div></div>
                </div>
              </div>

              {/* ÁREA INFERIOR: TABELA E FORMULÁRIO COMPLETO DE ROTAS */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Tabela de Histórico (Ocupa 2/3) */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100">
                    <h2 className="text-lg font-extrabold text-slate-800">Histórico de Coletas</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider border-b border-slate-200">
                          <th className="py-4 px-6 font-bold">ID / Data</th>
                          <th className="py-4 px-6 font-bold">Doador / Local</th>
                          <th className="py-4 px-6 font-bold">Material</th>
                          <th className="py-4 px-6 font-bold">Prioridade</th>
                          <th className="py-4 px-6 font-bold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                        {loading ? (
                          <tr><td colSpan={5} className="py-8 text-center text-slate-400">Carregando coletas...</td></tr>
                        ) : !Array.isArray(coletas) || coletas.length === 0 ? (
                          <tr><td colSpan={5} className="py-8 text-center text-slate-400">Nenhuma coleta encontrada.</td></tr>
                        ) : (
                          coletas.map((coleta, index) => (
                            <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-6">
                                <span className="font-bold text-slate-800 block">{coleta.id}</span>
                                <span className="text-[11px] text-slate-400">{coleta.data || 'Sem data'}</span>
                              </td>
                              <td className="py-4 px-6">
                                <span className="font-bold text-slate-700 block">{coleta.doador}</span>
                                <span className="text-xs text-slate-500">{coleta.bairro || coleta.local || '-'}</span>
                              </td>
                              <td className="py-4 px-6">
                                <span className="font-medium text-slate-700 block">{coleta.material || 'Não informado'}</span>
                                <span className="text-xs text-slate-400">{coleta.quantidade || '-'}</span>
                              </td>
                              <td className="py-4 px-6">{getBadgePrioridade(coleta.prioridade)}</td>
                              <td className="py-4 px-6 font-medium">
                                <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider
                                  ${coleta.status === 'Em Rota' ? 'text-amber-700 bg-amber-50 border border-amber-200' : ''}
                                  ${coleta.status === 'Concluída' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : ''}
                                  ${coleta.status === 'Pendente' || !coleta.status ? 'text-slate-600 bg-slate-100 border border-slate-200' : ''}
                                `}>
                                  <span className={`w-1.5 h-1.5 rounded-full 
                                    ${coleta.status === 'Em Rota' ? 'bg-amber-500' : ''}
                                    ${coleta.status === 'Concluída' ? 'bg-emerald-500' : ''}
                                    ${coleta.status === 'Pendente' || !coleta.status ? 'bg-slate-400' : ''}
                                  `}></span>
                                  {coleta.status || 'Pendente'}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Formulário de Registro Avançado (Ocupa 1/3) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
                  <div className="px-6 py-5 border-b border-slate-100">
                    <h2 className="text-lg font-extrabold text-slate-800">Planejar Coleta</h2>
                  </div>
                  <form onSubmit={handleAddColeta} className="p-6 flex flex-col gap-4 flex-1">
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Doador / Organização</label>
                      <input 
                        type="text" required value={novoDoador} onChange={(e) => setNovoDoador(e.target.value)}
                        placeholder="Ex: Empresa de TI" 
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Endereço de Retirada</label>
                        <input 
                          type="text" value={novoEndereco} onChange={(e) => setNovoEndereco(e.target.value)}
                          placeholder="Rua, Número" 
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bairro</label>
                        <input 
                          type="text" required value={novoBairro} onChange={(e) => setNovoBairro(e.target.value)}
                          placeholder="Ex: Aldeota" 
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Material</label>
                        <input 
                          type="text" value={novoMaterial} onChange={(e) => setNovoMaterial(e.target.value)}
                          placeholder="Ex: Monitores" 
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Qtd / Peso</label>
                        <input 
                          type="text" value={novaQuantidade} onChange={(e) => setNovaQuantidade(e.target.value)}
                          placeholder="Ex: 15kg" 
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Prioridade</label>
                        <select 
                          value={novaPrioridade} onChange={(e) => setNovaPrioridade(e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50 appearance-none"
                        >
                          <option value="Baixa">Baixa</option>
                          <option value="Normal">Normal</option>
                          <option value="Alta">Alta</option>
                          <option value="Urgente">Urgente</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Data Agendada</label>
                        <input 
                          type="date" value={novaData} onChange={(e) => setNovaData(e.target.value)}
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md">
                        Cadastrar Rota
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}