import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Target,
  DollarSign,
  Activity
} from 'lucide-react';

export const Dashboard = () => {
  // Dados para os gráficos
  const monthlyData = [
    { month: 'Jan', contatos: 120, vendas: 85, campanhas: 12 },
    { month: 'Fev', contatos: 150, vendas: 95, campanhas: 15 },
    { month: 'Mar', contatos: 180, vendas: 110, campanhas: 18 },
    { month: 'Abr', contatos: 200, vendas: 125, campanhas: 20 },
    { month: 'Mai', contatos: 220, vendas: 140, campanhas: 22 },
    { month: 'Jun', contatos: 250, vendas: 160, campanhas: 25 }
  ];

  const statusData = [
    { name: 'Ativos', value: 65, color: '#22c55e' },
    { name: 'Inativos', value: 25, color: '#ef4444' },
    { name: 'Prospects', value: 10, color: '#f59e0b' }
  ];

  const recentActivities = [
    { id: 1, type: 'contact', message: 'Novo contato adicionado: Maria Silva', time: '5 min atrás' },
    { id: 2, type: 'campaign', message: 'Campanha "Promoção Verão" finalizada', time: '1 h atrás' },
    { id: 3, type: 'call', message: 'Ligação realizada para João Santos', time: '2 h atrás' },
    { id: 4, type: 'meeting', message: 'Reunião agendada com Ana Costa', time: '3 h atrás' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Reunião com cliente', time: '14:00', date: 'Hoje' },
    { id: 2, title: 'Apresentação de produto', time: '10:30', date: 'Amanhã' },
    { id: 3, title: 'Follow-up vendas', time: '16:00', date: 'Sexta' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral do seu CRM</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Última atualização</p>
          <p className="font-medium">{new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total de Contatos</p>
              <p className="text-3xl font-bold mt-2">1,247</p>
              <p className="text-primary text-sm mt-1 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% este mês
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Campanhas Ativas</p>
              <p className="text-3xl font-bold mt-2">25</p>
              <p className="text-primary text-sm mt-1 flex items-center">
                <Target className="h-4 w-4 mr-1" />
                8 finalizando hoje
              </p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Ligações Hoje</p>
              <p className="text-3xl font-bold mt-2">89</p>
              <p className="text-green-600 text-sm mt-1 flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                67% atendidas
              </p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Receita Mensal</p>
              <p className="text-3xl font-bold mt-2">R$ 45.2K</p>
              <p className="text-primary text-sm mt-1 flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                +8% vs mês anterior
              </p>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Performance Mensal */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="contatos" 
                stroke="#22c55e" 
                strokeWidth={3}
                name="Contatos"
              />
              <Line 
                type="monotone" 
                dataKey="vendas" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Vendas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Status dos Contatos */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Status dos Contatos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atividades Recentes e Próximos Eventos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades Recentes */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Atividades Recentes</h3>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-primary text-sm hover:underline">
            Ver todas as atividades
          </button>
        </div>

        {/* Próximos Eventos */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Próximos Eventos</h3>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date} às {event.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-primary text-sm hover:underline">
            Ver agenda completa
          </button>
        </div>
      </div>
    </div>
  );
};

