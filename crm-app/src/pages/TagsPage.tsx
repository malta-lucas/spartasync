import React, { useState } from 'react';
import { Tag, Plus, Search, Filter, Edit, Trash2, Users, TrendingUp } from 'lucide-react';

export const TagsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTag, setNewTag] = useState({ name: '', color: '#10B981', description: '' });

  // Dados fictícios de tags
  const tags = [
    {
      id: 1,
      name: 'Cliente VIP',
      color: '#F59E0B',
      description: 'Clientes com alto valor de compra',
      contactCount: 45,
      createdAt: '2024-05-15',
      lastUsed: '2024-06-08'
    },
    {
      id: 2,
      name: 'Prospect Quente',
      color: '#EF4444',
      description: 'Leads com alta probabilidade de conversão',
      contactCount: 128,
      createdAt: '2024-05-20',
      lastUsed: '2024-06-08'
    },
    {
      id: 3,
      name: 'Cliente Inativo',
      color: '#6B7280',
      description: 'Clientes sem compras nos últimos 6 meses',
      contactCount: 89,
      createdAt: '2024-04-10',
      lastUsed: '2024-06-07'
    },
    {
      id: 4,
      name: 'Interessado em Produto A',
      color: '#10B981',
      description: 'Contatos que demonstraram interesse no Produto A',
      contactCount: 234,
      createdAt: '2024-06-01',
      lastUsed: '2024-06-08'
    },
    {
      id: 5,
      name: 'Aniversariante',
      color: '#8B5CF6',
      description: 'Contatos que fazem aniversário este mês',
      contactCount: 67,
      createdAt: '2024-03-15',
      lastUsed: '2024-06-06'
    },
    {
      id: 6,
      name: 'Região Sul',
      color: '#06B6D4',
      description: 'Contatos da região Sul do Brasil',
      contactCount: 156,
      createdAt: '2024-02-20',
      lastUsed: '2024-06-08'
    }
  ];

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTag = () => {
    // Lógica para criar nova tag
    setShowCreateModal(false);
    setNewTag({ name: '', color: '#10B981', description: '' });
  };

  const colorOptions = [
    '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', 
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Gerenciamento de Tags</h1>
          <p className="text-muted-foreground mt-1">
            Organize seus contatos com tags personalizadas
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Tag</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Tags</p>
              <p className="text-2xl font-bold text-foreground">{tags.length}</p>
            </div>
            <Tag className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-green-600">+2</span> este mês
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contatos Taggeados</p>
              <p className="text-2xl font-bold text-foreground">719</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            57% do total
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tag Mais Usada</p>
              <p className="text-2xl font-bold text-foreground">234</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Interessado em Produto A
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tags Ativas</p>
              <p className="text-2xl font-bold text-foreground">6</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm font-bold">🏷️</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            100% em uso
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar tags por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-all duration-300 flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTags.map((tag) => (
          <div 
            key={tag.id}
            className="bg-card p-6 rounded-lg border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.018] cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full border-2 border-border transition-all duration-300"
                  style={{ backgroundColor: tag.color }}
                />
                <h3 className="font-semibold text-foreground transition-colors duration-200">{tag.name}</h3>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-accent rounded transition-all duration-300">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-accent rounded transition-all duration-300">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{tag.description}</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contatos</span>
                <span className="font-medium text-foreground">{tag.contactCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Criada em</span>
                <span className="font-medium text-foreground">
                  {new Date(tag.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Último uso</span>
                <span className="font-medium text-foreground">
                  {new Date(tag.lastUsed).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <button className="w-full px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300 text-sm font-medium">
                Ver Contatos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Tag Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full transition-all duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-4">Criar Nova Tag</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome da Tag</label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  placeholder="Ex: Cliente VIP"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  value={newTag.description}
                  onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                  placeholder="Descreva o propósito desta tag..."
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cor</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewTag({ ...newTag, color })}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        newTag.color === color ? 'border-foreground scale-110 shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-all duration-300"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateTag}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
              >
                Criar Tag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] cursor-pointer">
          <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-all duration-300">
              <Plus className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Criar Tag Personalizada</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-all duration-300">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Aplicar Tags em Massa</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-all duration-300">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Relatório de Tags</span>
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] cursor-pointer">
          <h3 className="font-semibold text-foreground mb-4">Tags Mais Utilizadas</h3>
          <div className="space-y-3">
            {tags.slice(0, 4).sort((a, b) => b.contactCount - a.contactCount).map((tag) => (
              <div 
                key={tag.id}
                className="flex items-center justify-between transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-border transition-all duration-300"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{tag.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{tag.contactCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
