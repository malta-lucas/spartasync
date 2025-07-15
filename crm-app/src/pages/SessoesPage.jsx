import React, { useState } from 'react';
import { QrCode, Smartphone, Wifi, WifiOff, Plus, RefreshCw, Settings, Eye, Trash2 } from 'lucide-react';
import * as wahaService from '../services/wahaService';

export const SessoesPage = () => {
  const [activeTab, setActiveTab] = useState('ativas');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  // Dados fictícios de sessões (pode depois buscar via API real)
  const sessions = {
    ativas: [
      {
        id: 1,
        name: 'WhatsApp Principal',
        number: '+55 11 99999-9999',
        status: 'conectado',
        connectedAt: '2024-06-08 14:30:00',
        lastActivity: '2 min atrás',
        messagesCount: 1247,
        device: 'iPhone 14 Pro',
        battery: 85,
        version: '2.23.24.76'
      },
      {
        id: 2,
        name: 'WhatsApp Vendas',
        number: '+55 11 88888-8888',
        status: 'conectado',
        connectedAt: '2024-06-08 09:15:00',
        lastActivity: '15 min atrás',
        messagesCount: 892,
        device: 'Samsung Galaxy S23',
        battery: 67,
        version: '2.23.24.76'
      }
    ],
    desconectadas: [
      {
        id: 3,
        name: 'WhatsApp Suporte',
        number: '+55 11 77777-7777',
        status: 'desconectado',
        disconnectedAt: '2024-06-08 12:45:00',
        lastActivity: '2 h atrás',
        messagesCount: 2156,
        device: 'iPhone 13',
        reason: 'Timeout de conexão'
      },
      {
        id: 4,
        name: 'WhatsApp Marketing',
        number: '+55 11 66666-6666',
        status: 'desconectado',
        disconnectedAt: '2024-06-07 18:20:00',
        lastActivity: '1 dia atrás',
        messagesCount: 567,
        device: 'Xiaomi Mi 11',
        reason: 'Desconectado manualmente'
      }
    ]
  };

  const getStatusColor = (status) => {
    return status === 'conectado' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status) => {
    return status === 'conectado' ? (
      <Wifi className="h-4 w-4 text-green-600" />
    ) : (
      <WifiOff className="h-4 w-4 text-red-600" />
    );
  };

  const handleConnectSession = async () => {
    try {
      // Criar sessão (ajuste payload conforme seu backend espera)
      await wahaService.createSession({ sessionName: 'default' });

      // Buscar QR code da sessão criada
      const qrResp = await wahaService.getQr('default');

      // Ajuste aqui para o nome do campo que retorna o QR code da sua API
      setQrCodeData(qrResp.data.qrCode || qrResp.data);

      // Abrir modal
      setShowQRModal(true);
    } catch (error) {
      console.error('Erro ao criar sessão ou buscar QR:', error);
      alert('Erro ao criar sessão. Veja o console para detalhes.');
    }
  };

  const SessionCard = ({ session, isActive }) => (
    <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(session.status)}
          <div>
            <h3 className="font-semibold text-foreground">{session.name}</h3>
            <p className="text-sm text-muted-foreground">{session.number}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Última Atividade</p>
            <p className="font-medium text-foreground">{session.lastActivity}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Mensagens</p>
            <p className="font-medium text-foreground">{session.messagesCount.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Dispositivo</p>
            <p className="font-medium text-foreground">{session.device}</p>
          </div>
          {isActive ? (
            <div>
              <p className="text-muted-foreground">Bateria</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      session.battery > 50 ? 'bg-green-500' : 
                      session.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${session.battery}%` }}
                  />
                </div>
                <span className="text-xs font-medium">{session.battery}%</span>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground">Motivo</p>
              <p className="font-medium text-foreground text-xs">{session.reason}</p>
            </div>
          )}
        </div>

        {isActive && (
          <div className="text-sm">
            <p className="text-muted-foreground">Conectado em</p>
            <p className="font-medium text-foreground">
              {new Date(session.connectedAt).toLocaleString('pt-BR')}
            </p>
          </div>
        )}

        {!isActive && (
          <div className="text-sm">
            <p className="text-muted-foreground">Desconectado em</p>
            <p className="font-medium text-foreground">
              {new Date(session.disconnectedAt).toLocaleString('pt-BR')}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors duration-200" title="Ver detalhes">
            <Eye className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-accent rounded-lg transition-colors duration-200" title="Configurações">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </button>
          {!isActive && (
            <button className="p-2 hover:bg-accent rounded-lg transition-colors duration-200" title="Excluir">
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          )}
        </div>
        
        {isActive ? (
          <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200">
            Desconectar
          </button>
        ) : (
          <button 
            onClick={handleConnectSession}
            className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors duration-200"
          >
            Reconectar
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Gerenciamento de Sessões</h1>
          <p className="text-muted-foreground mt-1">
            Conecte e gerencie suas sessões WhatsApp através de QR Code
          </p>
        </div>
        <button 
          onClick={handleConnectSession}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Sessão</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sessões Ativas</p>
              <p className="text-2xl font-bold text-foreground">{sessions.ativas.length}</p>
            </div>
            <Wifi className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-green-600">100%</span> funcionando
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Desconectadas</p>
              <p className="text-2xl font-bold text-foreground">{sessions.desconectadas.length}</p>
            </div>
            <WifiOff className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Precisam reconectar
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Mensagens</p>
              <p className="text-2xl font-bold text-foreground">4.8K</p>
            </div>
            <Smartphone className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-green-600">+15%</span> hoje
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Uptime Médio</p>
              <p className="text-2xl font-bold text-foreground">98.5%</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">⚡</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Últimos 30 dias
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('ativas')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'ativas'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Sessões Ativas ({sessions.ativas.length})
          </button>
          <button
            onClick={() => setActiveTab('desconectadas')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'desconectadas'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Desconectadas ({sessions.desconectadas.length})
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'historico'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Histórico
          </button>
        </nav>
      </div>

      {/* Sessions Grid */}
      {activeTab !== 'historico' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions[activeTab].map((session) => (
            <SessionCard 
              key={session.id} 
              session={session} 
              isActive={activeTab === 'ativas'} 
            />
          ))}
        </div>
      )}

      {/* Histórico Tab */}
      {activeTab === 'historico' && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Histórico de Conexões</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-foreground">WhatsApp Principal conectado</p>
                  <p className="text-sm text-muted-foreground">08/06/2024 às 14:30</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">Sucesso</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-foreground">WhatsApp Suporte desconectado</p>
                  <p className="text-sm text-muted-foreground">08/06/2024 às 12:45</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">Timeout</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-foreground">WhatsApp Vendas conectado</p>
                  <p className="text-sm text-muted-foreground">08/06/2024 às 09:15</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">Sucesso</span>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="text-center">
              <QrCode className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Conectar Nova Sessão</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Escaneie o QR Code com seu WhatsApp para conectar uma nova sessão
              </p>
              
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-border mb-6 flex items-center justify-center">
                {qrCodeData ? (
                  <img src={qrCodeData} alt="QR Code para conectar WhatsApp" className="w-48 h-48" />
                ) : (
                  <QrCode className="h-24 w-24 text-gray-400 animate-pulse" />
                )}
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-6">
                <RefreshCw className="h-4 w-4 text-muted-foreground animate-spin" />
                <span className="text-sm text-muted-foreground">Aguardando conexão...</span>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Atualizar QR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
