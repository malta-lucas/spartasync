import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Users, TrendingUp } from 'lucide-react';
// @ts-ignore
import { useBanner } from '../components/layout/BannerContext';
import * as tagsService from '../services/tagsService';
import { Tag } from '../types';

export const TagsPage = () => {
  const { showBanner } = useBanner();

  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentTag, setCurrentTag] = useState<Partial<Tag>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showContactsModal, setShowContactsModal] = useState(false);
  const [currentContacts, setCurrentContacts] = useState<any[]>([]);
  const [currentTagName, setCurrentTagName] = useState('');
  const [showMassModal, setShowMassModal] = useState(false);

  const colorOptions = [
    '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
  ];

  useEffect(() => {
    async function fetchTags() {
      setLoading(true);
      try {
        const data = await tagsService.listTags();
        setTags(data);
      } catch (err) {
        showBanner('error', 'Erro ao buscar tags');
      }
      setLoading(false);
    }
    fetchTags();
  }, []);

  async function handleOpenCreate() {
    setModalMode('create');
    setCurrentTag({ color: '#10B981', title: '', content: '', user_company: 1 });
    setShowModal(true);
    setEditId(null);
  }

  async function handleOpenEdit(tag: Tag) {
    setModalMode('edit');
    setEditId(tag.id);
    setCurrentTag({
      title: tag.title,
      color: tag.color,
      content: tag.content,
      user_company: tag.user_company,
    });
    setShowModal(true);
  }

  async function handleSaveTag() {
    if (!currentTag.title || !currentTag.title.trim()) {
      showBanner('error', 'O nome da tag é obrigatório!');
      return;
    }
    try {
      if (modalMode === 'create') {
        await tagsService.createTag({
          title: currentTag.title,
          color: currentTag.color || '#10B981',
          content: currentTag.content || '',
          user_company: currentTag.user_company as number, // pegue do usuário logado
        });
        showBanner('success', `Tag "${currentTag.title}" criada com sucesso!`);
      } else if (editId) {
        await tagsService.updateTag(editId, {
          title: currentTag.title,
          color: currentTag.color,
          content: currentTag.content,
          user_company: currentTag.user_company as number,
        });
        showBanner('success', `Tag "${currentTag.title}" atualizada com sucesso!`);
      }
      setShowModal(false);
      setEditId(null);
      setCurrentTag({});
      setLoading(true);
      const data = await tagsService.listTags();
      setTags(data);
      setLoading(false);
    } catch (err) {
      showBanner('error', 'Erro ao salvar tag');
    }
  }

  async function handleDeleteTag() {
    if (editId) {
      try {
        await tagsService.deleteTag(editId);
        showBanner('success', 'Tag excluída com sucesso!');
        setShowDeleteModal(false);
        setEditId(null);
        setLoading(true);
        const data = await tagsService.listTags();
        setTags(data);
        setLoading(false);
      } catch (err) {
        showBanner('error', 'Erro ao excluir tag');
      }
    }
  }

  function handleRequestDelete(id: number) {
    setEditId(id);
    setShowDeleteModal(true);
  }

  async function handleViewContacts(tag: Tag) {
    try {
      const contacts = await tagsService.listTagContacts(tag.id);
      setCurrentContacts(contacts);
      setCurrentTagName(tag.title);
      setShowContactsModal(true);
    } catch {
      showBanner('error', 'Erro ao buscar contatos desta tag');
    }
  }

  const filteredTags = tags.filter(tag =>
    tag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tag.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onClick={handleOpenCreate}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Tag</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Tags</p>
              <p className="text-2xl font-bold text-foreground">{tags.length}</p>
            </div>
            <i className="fi fi-br-tags text-gray-500 text-2xl"></i>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contatos Taggeados</p>
              <p className="text-2xl font-bold text-foreground">{tags.reduce((a, b) => a + (b.contactCount || 0), 0)}</p>
            </div>
            <i className="fi fi-br-people-group text-blue-500 text-2xl"></i>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tag Mais Usada</p>
              <p className="text-2xl font-bold text-foreground">
                {Math.max(...tags.map(tag => tag.contactCount || 0), 0)}
              </p>
            </div>
            <i className="fi fi-br-arrow-trend-up text-green-600 text-2xl"></i>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tags Ativas</p>
              <p className="text-2xl font-bold text-foreground">{tags.length}</p>
            </div>
            <i className="fi fi-br-label text-orange-500 text-2xl"></i>
          </div>
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
      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Carregando tags...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className="bg-card p-6 rounded-lg border border-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-border"
                    style={{ backgroundColor: tag.color }}
                  />
                  <h3 className="font-semibold text-foreground">{tag.title}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-accent rounded"
                    onClick={() => handleOpenEdit(tag)}
                    title="Editar"
                  >
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-accent rounded"
                    onClick={() => handleRequestDelete(tag.id)}
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{tag.content}</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Contatos</span>
                  <span className="font-medium text-foreground">{tag.contactCount || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Criada em</span>
                  <span className="font-medium text-foreground">
                    {tag.created_at ? new Date(tag.created_at).toLocaleDateString('pt-BR') : ''}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Último uso</span>
                  <span className="font-medium text-foreground">
                    {tag.last_use ? new Date(tag.last_use).toLocaleDateString('pt-BR') : '-'}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <button
                  className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 text-sm font-medium"
                  onClick={() => handleViewContacts(tag)}
                >
                  Ver Contatos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Tag Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {modalMode === 'edit' ? 'Editar Tag' : 'Criar Nova Tag'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nome da Tag</label>
                <input
                  type="text"
                  value={currentTag.title || ''}
                  onChange={(e) => setCurrentTag({ ...currentTag, title: e.target.value })}
                  placeholder="Ex: Cliente VIP"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  value={currentTag.content || ''}
                  onChange={(e) => setCurrentTag({ ...currentTag, content: e.target.value })}
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
                      onClick={() => setCurrentTag({ ...currentTag, color })}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        currentTag.color === color ? 'border-foreground scale-110 shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              {modalMode === 'edit' && (
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Excluir
                </button>
              )}
              <button
                onClick={() => {
                  setShowModal(false);
                  setCurrentTag({});
                  setEditId(null);
                }}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveTag}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                disabled={!currentTag.title || !currentTag.title.trim()}
              >
                {modalMode === 'edit' ? 'Salvar' : 'Criar Tag'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Excluir Tag</h3>
            <p className="text-muted-foreground mb-6">
              Tem certeza que deseja excluir esta tag? Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteTag}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Ver Contatos */}
      {showContactsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Contatos da Tag: <span className="font-bold">{currentTagName}</span>
            </h3>
            {currentContacts.length === 0 ? (
              <p className="text-muted-foreground">Nenhum contato vinculado a esta tag.</p>
            ) : (
              <ul className="divide-y divide-border">
                {currentContacts.map(contato => (
                  <li key={contato.id} className="py-2 flex flex-col">
                    <span className="font-medium text-foreground">{contato.name}</span>
                    <span className="text-xs text-muted-foreground">{contato.phone}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent"
                onClick={() => setShowContactsModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent"
              onClick={handleOpenCreate}
            >
              <Plus className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Criar Tag Personalizada</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent"
              onClick={() => setShowMassModal(true)}
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Aplicar Tags em Massa</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 p-3 rounded-lg opacity-60 cursor-not-allowed"
              disabled
              title="Em breve"
            >
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Relatório de Tags</span>
            </button>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Tags Mais Utilizadas</h3>
          <div className="space-y-3">
            {tags.slice(0, 4).sort((a, b) => (b.contactCount || 0) - (a.contactCount || 0)).map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{tag.title}</span>
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
