import React, { useState } from 'react';
import { Modal } from '../components/ui/Modal';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Star
} from 'lucide-react';

export const ContatosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  // Dados de exemplo
  const contatos = [
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
  ];

  const getStatusColor = (status) => {
    const colors = {
      bronze: 'bg-orange-100 text-orange-800',
      prata: 'bg-gray-100 text-gray-800',
      ouro: 'bg-yellow-100 text-yellow-800',
      platina: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredContatos = contatos.filter(contato =>
    contato.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contato.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contato.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Gestão de Contatos</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os seus contatos e clientes</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Contato</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar contatos por nome, email ou empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
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
              {filteredContatos.map((contato) => (
                <tr key={contato.id} className="border-t border-border hover:bg-accent/50 transition-colors">
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contato.statusFidelidade)}`}>
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
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedContact(contato);
                          setShowModal(true);
                        }}
                        className="p-1 rounded hover:bg-accent transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-accent transition-colors text-red-600"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total de Contatos</span>
          </div>
          <p className="text-2xl font-bold mt-2">{contatos.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Clientes VIP</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {contatos.filter(c => c.statusFidelidade === 'platina' || c.statusFidelidade === 'ouro').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">Contatos Ativos</span>
          </div>
          <p className="text-2xl font-bold mt-2">{contatos.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
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
          setSelectedContact(null);
        }}
        title={selectedContact ? 'Editar Contato' : 'Novo Contato'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedContact?.nomeCompleto || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Apelido</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedContact?.apelido || ''}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedContact?.email || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedContact?.telefonePrincipal || ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Empresa</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedContact?.empresa || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cargo</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue={selectedContact?.cargo || ''}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedContact(null);
              }}
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              {selectedContact ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

