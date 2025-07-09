import React, { useState } from 'react';
import { Phone, Wifi, WifiOff, MoreVertical, Plus, Search, Filter, Download, Upload } from 'lucide-react';

export const TelefonePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  // Dados fictícios de números/sessões
  const phoneNumbers = [
    {
      id: 1,
      number: '+55 11 99999-9999',
      name: 'WhatsApp Principal',
      status: 'ativo',
      connected: true,
      totalSent: 1247,
      lastActivity: '2 min atrás',
      dailyLimit: 1000,
      usedToday: 156,
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    },
    {
      id: 2,
      number: '+55 11 88888-8888',
      name: 'WhatsApp Vendas',
      status: 'ativo',
      connected: true,
      totalSent: 892,
      lastActivity: '15 min atrás',
      dailyLimit: 800,
      usedToday: 89,
      qrCode: null
    },
    {
      id: 3,
      number: '+55 11 77777-7777',
      name: 'WhatsApp Suporte',
      status: 'desconectado',
      connected: false,
      totalSent: 2156,
      lastActivity: '2 h atrás',
      dailyLimit: 500,
      usedToday: 0,
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    },
    {
      id: 4,
      number: '+55 11 66666-6666',
      name: 'WhatsApp Marketing',
      status: 'pausado',
      connected: false,
      totalSent: 567,
      lastActivity: '1 dia atrás',
      dailyLimit: 1200,
      usedToday: 0,
      qrCode: null
    }
  ];

  const filteredNumbers = phoneNumbers.filter(phone => {
    const matchesSearch = phone.number.includes(searchTerm) || 
                         phone.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || phone.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'text-green-600 bg-green-100';
      case 'desconectado': return 'text-red-600 bg-red-100';
      case 'pausado': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (connected) => {
    return connected ? (
      <Wifi className="h-4 w-4 text-green-600" />
    ) : (
      <WifiOff className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Gerenciamento de Telefones</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todos os seus números WhatsApp e sessões ativas
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Adicionar Número</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Números</p>
              <p className="text-2xl font-bold text-foreground">4</p>
            </div>
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-green-600">+1</span> este mês
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sessões Ativas</p>
              <p className="text-2xl font-bold text-foreground">2</p>
            </div>
            <Wifi className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            50% conectadas
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Mensagens Hoje</p>
              <p className="text-2xl font-bold text-foreground">245</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">📱</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-green-600">+12%</span> vs ontem
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Limite Diário</p>
              <p className="text-2xl font-bold text-foreground">3.5K</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">📊</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            7% utilizado
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por número ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="todos">Todos os Status</option>
          <option value="ativo">Ativo</option>
          <option value="desconectado">Desconectado</option>
          <option value="pausado">Pausado</option>
        </select>

        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors duration-200 flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Numbers List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Número / Nome</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Mensagens Enviadas</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Limite Diário</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Última Atividade</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredNumbers.map((phone) => (
                <tr key={phone.id} className="border-t border-border hover:bg-muted/30 transition-colors duration-200">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(phone.connected)}
                        <div>
                          <p className="font-medium text-foreground">{phone.number}</p>
                          <p className="text-sm text-muted-foreground">{phone.name}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phone.status)}`}>
                      {phone.status.charAt(0).toUpperCase() + phone.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{phone.totalSent.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{phone.usedToday}/{phone.dailyLimit}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(phone.usedToday / phone.dailyLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-muted-foreground">{phone.lastActivity}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {!phone.connected && (
                        <button className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/90 transition-colors duration-200">
                          Conectar
                        </button>
                      )}
                      <button className="p-1 hover:bg-accent rounded transition-colors duration-200">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200">
              <Plus className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Adicionar Novo Número</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200">
              <Download className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Exportar Relatório</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors duration-200">
              <Upload className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Importar Configurações</span>
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Estatísticas Hoje</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mensagens Enviadas</span>
              <span className="font-medium text-foreground">245</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Taxa de Entrega</span>
              <span className="font-medium text-green-600">98.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tempo Médio</span>
              <span className="font-medium text-foreground">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Erros</span>
              <span className="font-medium text-red-600">3</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Alertas</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Limite Próximo</p>
              <p className="text-xs text-yellow-600 mt-1">WhatsApp Principal: 85% do limite diário</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-medium text-red-800">Desconectado</p>
              <p className="text-xs text-red-600 mt-1">WhatsApp Suporte precisa reconectar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

