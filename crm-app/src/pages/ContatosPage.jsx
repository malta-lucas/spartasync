import React, { useState } from 'react';
import { Modal } from '../components/ui/Modal';
import {
  Users, Plus, Search, Filter, Edit, Trash2, Phone, Mail, MapPin,
  Calendar, Star, ChevronDown, MessageCircle, Clock, UserCheck, Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Função utilitária para empresas únicas
function uniqueEmpresas(contatos) {
  return [...new Set(contatos.map(c => c.empresa))];
}

const emptyContact = {
  nomeCompleto: '',
  apelido: '',
  email: '',
  telefonePrincipal: '',
  empresa: '',
  cargo: '',
  statusFidelidade: 'bronze',
  ultimaInteracao: '',
  ticketMedio: ''
};

// Exemplo de histórico por contato
function getHistoricoFake(contato) {
  if (!contato) return [];
  return [
    {
      tipo: 'envio',
      data: '2024-06-07 10:02',
      descricao: `Mensagem promocional enviada para ${contato.nomeCompleto} via WhatsApp.`,
      detalhes: 'Template: Promoção de Verão',
      icon: <Send className="h-5 w-5 text-green-600" />
    },
    {
      tipo: 'alteracao',
      data: '2024-06-06 09:12',
      descricao: `Campo "email" alterado de joao@email.com para ${contato.email}`,
      detalhes: '',
      icon: <UserCheck className="h-5 w-5 text-yellow-600" />
    },
    {
      tipo: 'agendamento',
      data: '2024-06-06 09:08',
      descricao: 'Agendamento de contato para reunião',
      detalhes: 'Agendado para 2024-06-12 14:00',
      icon: <Clock className="h-5 w-5 text-blue-500" />
    },
    {
      tipo: 'envio-massa',
      data: '2024-05-30 16:15',
      descricao: 'Participou de envio em massa: Lançamento de Produto A',
      detalhes: '',
      icon: <MessageCircle className="h-5 w-5 text-purple-600" />
    },
    {
      tipo: 'cadastro',
      data: '2024-04-20 08:30',
      descricao: 'Contato criado',
      detalhes: '',
      icon: <Users className="h-5 w-5 text-primary" />
    }
  ];
}

function formatarDataHora(dataString) {
  if (!dataString) return '';
  // Aceita tanto 'YYYY-MM-DD hh:mm' quanto Date
  const data = new Date(dataString.replace(' ', 'T'));
  return data.toLocaleString('pt-BR', { hour12: false });
}

export const ContatosPage = () => {
  // CONTATOS STATE
  const [contatos, setContatos] = useState([
    {
      id: 1,
      nomeCompleto: 'Maria Silva Santos',
      apelido: 'Maria',
      email: 'maria.silva@email.com',
      telefonePrincipal: '(11) 99999-9999',
      empresa: 'Tech Solutions',
      cargo: 'Gerente de Vendas',
      statusFidelidade: 'ouro',
      ultimaInteracao: '2024-06-07',
      ticketMedio: 2500.00
    },
    {
      id: 2,
      nomeCompleto: 'João Carlos Lima',
      apelido: 'João',
      email: 'joao.lima@empresa.com',
      telefonePrincipal: '(11) 88888-8888',
      empresa: 'Inovação Digital',
      cargo: 'Diretor Comercial',
      statusFidelidade: 'platina',
      ultimaInteracao: '2024-06-06',
      ticketMedio: 5000.00
    },
    {
      id: 3,
      nomeCompleto: 'Ana Costa Ferreira',
      apelido: 'Ana',
      email: 'ana.costa@startup.com',
      telefonePrincipal: '(11) 77777-7777',
      empresa: 'StartupX',
      cargo: 'CEO',
      statusFidelidade: 'prata',
      ultimaInteracao: '2024-06-05',
      ticketMedio: 1800.00
    }
  ]);

  // UI STATES
  const [showModal, setShowModal] = useState(false);
  const [formContact, setFormContact] = useState(emptyContact);
  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtro
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [empresaFilter, setEmpresaFilter] = useState('');

  // Drawer/Modal de histórico
  const [showHistorico, setShowHistorico] = useState(false);
  const [contatoHistorico, setContatoHistorico] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      bronze: 'bg-orange-100 text-orange-800',
      prata: 'bg-gray-100 text-gray-800',
      ouro: 'bg-yellow-100 text-yellow-800',
      platina: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Busca e filtro
  const filteredContatos = contatos.filter(contato =>
    (statusFilter === '' || contato.statusFidelidade === statusFilter) &&
    (empresaFilter === '' || contato.empresa === empresaFilter) &&
    (
      contato.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contato.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contato.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginação
  const pageCount = Math.ceil(filteredContatos.length / itemsPerPage);
  const pageStart = (currentPage - 1) * itemsPerPage;
  const paginatedContatos = filteredContatos.slice(pageStart, pageStart + itemsPerPage);

  // Troca de página
  const gotoPage = (page) => {
    if (page >= 1 && page <= pageCount) setCurrentPage(page);
  };

  // Dropdown de filtros animado (framer-motion)
  const filterMotion = {
    initial: { opacity: 0, scale: 0.98, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit:    { opacity: 0, scale: 0.98, y: -10 },
    transition: { duration: 0.2 }
  };

  function openModalEdit(contato) {
    setFormContact(contato || emptyContact);
    setEditId(contato ? contato.id : null);
    setShowModal(true);
  }

  function handleSaveContact(e) {
    e.preventDefault();
    if (!formContact.nomeCompleto.trim() || !formContact.email.trim()) return;

    if (editId) {
      setContatos(contatos =>
        contatos.map(c => c.id === editId ? { ...formContact, id: editId } : c)
      );
    } else {
      setContatos(contatos =>
        [...contatos, { ...formContact, id: Date.now() }]
      );
    }
    setShowModal(false);
    setEditId(null);
    setFormContact(emptyContact);
  }

  function handleDeleteContact(id) {
    if (window.confirm('Deseja realmente excluir este contato?')) {
      setContatos(contatos => contatos.filter(c => c.id !== id));
    }
  }

  // Clique na linha abre histórico (exceto se for botão de ação)
  function handleRowClick(e, contato) {
    // Checa se clicou em botão de ação (Edit/Trash)
    if (e.target.closest('button')) return;
    setContatoHistorico(contato);
    setShowHistorico(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Gestão de Contatos</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os seus contatos e clientes</p>
        </div>
        <button
          onClick={() => openModalEdit(null)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Contato</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 relative">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar contatos por nome, email ou empresa..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center space-x-2"
              onClick={() => setShowFilter((open) => !open)}
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showFilter && (
                <motion.div
                  className="absolute right-0 mt-2 w-60 bg-card border border-border rounded-lg shadow-lg z-50 p-4"
                  {...filterMotion}
                >
                  <div>
                    <label className="block text-xs font-semibold mb-1">Status Fidelidade</label>
                    <select
                      className="w-full border border-border rounded-lg px-2 py-1 mb-2"
                      value={statusFilter}
                      onChange={e => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">Todos</option>
                      <option value="bronze">Bronze</option>
                      <option value="prata">Prata</option>
                      <option value="ouro">Ouro</option>
                      <option value="platina">Platina</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Empresa</label>
                    <select
                      className="w-full border border-border rounded-lg px-2 py-1"
                      value={empresaFilter}
                      onChange={e => {
                        setEmpresaFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">Todas</option>
                      {uniqueEmpresas(contatos).map(emp => (
                        <option key={emp} value={emp}>{emp}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="mt-3 w-full py-1 rounded-lg border border-border bg-accent text-xs hover:bg-accent/70 transition-colors"
                    onClick={() => {
                      setStatusFilter('');
                      setEmpresaFilter('');
                      setShowFilter(false);
                      setCurrentPage(1);
                    }}
                  >
                    Limpar filtros
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lista de Contatos */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Contato</th>
                <th className="text-left p-4 font-medium">Empresa</th>
                <th className="text-left p-4 font-medium">Contato</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Ticket Médio</th>
                <th className="text-left p-4 font-medium">Última Interação</th>
                <th className="text-left p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContatos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-muted-foreground">
                    Nenhum contato encontrado.
                  </td>
                </tr>
              ) : (
                paginatedContatos.map((contato) => (
                  <tr
                    key={contato.id}
                    className="border-t border-border hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={e => handleRowClick(e, contato)}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                          {contato.nomeCompleto.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{contato.nomeCompleto}</p>
                          <p className="text-sm text-muted-foreground">{contato.apelido}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{contato.empresa}</p>
                        <p className="text-sm text-muted-foreground">{contato.cargo}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{contato.telefonePrincipal}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-3 w-3" />
                          <span>{contato.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contato.statusFidelidade)} transition-all duration-500`}>
                        {contato.statusFidelidade.charAt(0).toUpperCase() + contato.statusFidelidade.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">
                        R$ {contato.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(contato.ultimaInteracao).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </td>
                    <td className="p-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModalEdit(contato)}
                          className="p-1 rounded hover:bg-accent transition-all duration-300"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-1 rounded hover:bg-accent transition-all duration-300 text-red-600"
                          title="Excluir"
                          onClick={() => handleDeleteContact(contato.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Paginação */}
        <div className="flex justify-between items-center px-4 py-3 bg-muted/50 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {pageCount} | {filteredContatos.length} resultado(s)
          </span>
          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 rounded hover:bg-accent text-sm cursor-pointer transition-all duration-300 disabled:cursor-not-allowed"
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i + 1}
                className={`px-2 py-1 rounded text-sm cursor-pointer transition-all duration-300 ${
                  currentPage === i + 1 ? 'bg-primary text-white scale-105 shadow-md' : 'hover:bg-accent'
                }`}
                onClick={() => gotoPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2 py-1 rounded hover:bg-accent text-sm cursor-pointer transition-all duration-300 disabled:cursor-not-allowed"
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === pageCount}
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 cursor-pointer">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total de Contatos</span>
          </div>
          <p className="text-2xl font-bold mt-2">{contatos.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 cursor-pointer">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Clientes VIP</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {contatos.filter(c => c.statusFidelidade === 'platina' || c.statusFidelidade === 'ouro').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 cursor-pointer">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">Contatos Ativos</span>
          </div>
          <p className="text-2xl font-bold mt-2">{contatos.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 cursor-pointer">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">Empresas</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {new Set(contatos.map(c => c.empresa)).size}
          </p>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditId(null);
          setFormContact(emptyContact);
        }}
        title={editId ? 'Editar Contato' : 'Novo Contato'}
        size="lg"
      >
        <form onSubmit={handleSaveContact} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome Completo *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.nomeCompleto}
                onChange={e => setFormContact({ ...formContact, nomeCompleto: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apelido</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.apelido}
                onChange={e => setFormContact({ ...formContact, apelido: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail *</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.email}
                onChange={e => setFormContact({ ...formContact, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.telefonePrincipal}
                onChange={e => setFormContact({ ...formContact, telefonePrincipal: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Empresa</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.empresa}
                onChange={e => setFormContact({ ...formContact, empresa: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cargo</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.cargo}
                onChange={e => setFormContact({ ...formContact, cargo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status Fidelidade</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.statusFidelidade}
                onChange={e => setFormContact({ ...formContact, statusFidelidade: e.target.value })}
              >
                <option value="bronze">Bronze</option>
                <option value="prata">Prata</option>
                <option value="ouro">Ouro</option>
                <option value="platina">Platina</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Última Interação</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.ultimaInteracao}
                onChange={e => setFormContact({ ...formContact, ultimaInteracao: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ticket Médio</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={formContact.ticketMedio}
                onChange={e => setFormContact({ ...formContact, ticketMedio: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditId(null);
                setFormContact(emptyContact);
              }}
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {editId ? 'Salvar Alterações' : 'Adicionar Contato'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Drawer/Modal de Histórico do Contato */}
      <AnimatePresence>
        {showHistorico && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[998] cursor-pointer"
              onClick={() => setShowHistorico(false)}
            />
            {/* Painel Histórico */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="fixed top-0 right-0 w-full max-w-md h-full z-[999] bg-white dark:bg-background shadow-xl border-l border-border flex flex-col"
              onClick={e => e.stopPropagation()} // impede o clique dentro do painel de fechar
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">{contatoHistorico?.nomeCompleto}</h3>
                  <p className="text-sm text-muted-foreground">{contatoHistorico?.email}</p>
                </div>
                <button
                  className="rounded-full p-2 hover:bg-accent"
                  onClick={() => setShowHistorico(false)}
                >
                  <span className="sr-only">Fechar</span>
                  <svg width={24} height={24} viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                <h4 className="font-semibold text-base mb-2">Histórico de Interações</h4>
                {getHistoricoFake(contatoHistorico).length === 0 ? (
                  <div className="text-muted-foreground">Nenhuma interação encontrada.</div>
                ) : (
                  getHistoricoFake(contatoHistorico).map((h, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-muted/60 rounded-lg p-4 mb-2 shadow-sm">
                      <div className="flex-shrink-0">{h.icon}</div>
                      <div>
                        <div className="text-sm font-semibold">{h.descricao}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatarDataHora(h.data)}
                        </div>
                        {h.detalhes && (
                          <div className="text-xs mt-1">{h.detalhes}</div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
