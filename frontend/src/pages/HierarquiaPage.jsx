import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, ShieldCheck, Users, Eye, EyeOff } from 'lucide-react';
import RightBar from '../components/layout/RightBar';
import * as hierarquiaService from '../services/hierarquiaService';

const modules = [
  { key: 'tags', label: 'Tags' },
  { key: 'contatos', label: 'Contatos' },
  { key: 'sessoes', label: 'Sessões' },
  { key: 'campanhas', label: 'Campanhas' }
];

const permissions = [
  { key: 'none', label: <><EyeOff className="inline h-4 w-4 mr-1 -mt-1" />Sem permissão</> },
  { key: 'view', label: <><Eye className="inline h-4 w-4 mr-1 -mt-1" />Visualizar</> },
  { key: 'edit', label: <><ShieldCheck className="inline h-4 w-4 mr-1 -mt-1" />Editar</> }
];

// Remove tipagem TypeScript
function getModulePermsMap(module_permissions = []) {
  // Monta { tags: 'view', contatos: 'edit', ... } baseado no backend
  const map = {};
  module_permissions.forEach(perm => {
    map[perm.module.slug] = perm.level;
  });
  // Garante que todos módulos aparecem
  modules.forEach(m => {
    if (!map[m.key]) map[m.key] = 'none';
  });
  return map;
}

export default function HierarquiaPage() {
  const [hierarquias, setHierarquias] = useState([]);
  const [search, setSearch] = useState('');
  const [rightbarOpen, setRightbarOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' ou 'edit'
  const [novaHierarquia, setNovaHierarquia] = useState('');
  const [modalPermissoes, setModalPermissoes] = useState({});
  const [editId, setEditId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  async function loadHierarquias() {
    const data = await hierarquiaService.listHierarquias();
    setHierarquias(data);
  }

  useEffect(() => {
    loadHierarquias();
  }, []);

  function openCreateModal() {
    setModalMode('create');
    setNovaHierarquia('');
    setModalPermissoes(Object.fromEntries(modules.map(m => [m.key, 'none'])));
    setRightbarOpen(true);
    setEditId(null);
  }

  function openEditModal(idx) {
    const h = hierarquias[idx];
    setModalMode('edit');
    setEditId(h.id);
    setNovaHierarquia(h.name);
    setModalPermissoes(getModulePermsMap(h.module_permissions));
    setRightbarOpen(true);
  }

  async function handleSaveHierarquia() {
    if (!novaHierarquia.trim()) return;
    const payload = {
    name: novaHierarquia.trim(),
    module_permissions_write: modules.map(m => ({
        module: { slug: m.key },
        level: modalPermissoes[m.key] || 'none'
    }))
    };
    try {
      if (modalMode === 'create') {
        await hierarquiaService.createHierarquia(payload);
      } else if (modalMode === 'edit' && editId) {
        await hierarquiaService.updateHierarquia(editId, payload);
      }
      closeRightbar();
      await loadHierarquias();
    } catch (err) {
      alert('Erro ao salvar hierarquia');
    }
  }

  async function handleDeleteHierarquia() {
    if (editId) {
      await hierarquiaService.deleteHierarquia(editId);
      setShowDelete(false);
      closeRightbar();
      await loadHierarquias();
    }
  }

  function closeRightbar() {
    setRightbarOpen(false);
    setEditId(null);
    setNovaHierarquia('');
    setModalPermissoes({});
  }

  const filteredHierarquias = hierarquias.filter(h =>
    h.name && h.name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: hierarquias.length,
    apenasVisualizador: hierarquias.filter(h =>
      h.module_permissions.every(mp => mp.level === 'view')
    ).length,
    totalEditores: hierarquias.filter(h =>
      h.module_permissions.some(mp => mp.level === 'edit')
    ).length
  };

  useEffect(() => {
    if (!rightbarOpen) return;
    const handler = (e) => { if (e.key === 'Escape') closeRightbar(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [rightbarOpen]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Gerenciamento de Hierarquias</h1>
          <p className="text-muted-foreground mt-1">
            Defina quais funções cada perfil pode acessar ou editar no sistema
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Hierarquia</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total de Hierarquias</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <Users className="h-7 w-7 text-primary" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Apenas Visualizador</p>
              <p className="text-2xl font-bold text-foreground">{stats.apenasVisualizador}</p>
            </div>
            <Eye className="h-7 w-7 text-green-500" />
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Com Permissão de Edição</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalEditores}</p>
            </div>
            <ShieldCheck className="h-7 w-7 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Busca/filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar hierarquia..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Tabela visual de permissões */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Hierarquia</th>
              {modules.map(m => (
                <th key={m.key} className="px-4 py-2 text-center">{m.label}</th>
              ))}
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredHierarquias.length === 0 && (
              <tr>
                <td colSpan={modules.length + 2} className="text-center text-muted-foreground py-8">
                  Nenhuma hierarquia encontrada.
                </td>
              </tr>
            )}
            {filteredHierarquias.map((h, idx) => {
              const isAdmin = h.name === "Administrador";
              const permsMap = getModulePermsMap(h.module_permissions);
              return (
                <tr key={h.id} className="border-t">
                  <td className="px-4 py-2 font-medium">{h.name}</td>
                  {modules.map(modulo => (
                    <td key={modulo.key} className="px-4 py-2 text-center">
                      <span
                        className={
                          permsMap[modulo.key] === 'none'
                            ? 'text-muted-foreground'
                            : permsMap[modulo.key] === 'view'
                              ? 'text-green-600'
                              : 'text-blue-600'
                        }
                      >
                        {permissions.find(p => p.key === permsMap[modulo.key])?.label}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-2 flex gap-1 justify-center">
                    <button
                      className={`p-2 rounded hover:bg-accent ${isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !isAdmin && openEditModal(idx)}
                      title={isAdmin ? "Administrador não pode ser editado" : "Editar"}
                      disabled={isAdmin}
                    >
                      <Edit className={`h-4 w-4 ${isAdmin ? 'text-gray-400' : 'text-muted-foreground'}`} />
                    </button>
                    {!isAdmin && (
                      <button
                        className="p-2 rounded hover:bg-accent"
                        onClick={() => {
                          setEditId(h.id);
                          setShowDelete(true);
                        }}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* RightBar Drawer */}
      <RightBar
        open={rightbarOpen}
        onClose={closeRightbar}
        title={modalMode === 'edit' ? 'Editar Hierarquia' : 'Nova Hierarquia'}
        footer={
          <div className="flex space-x-3">
            {modalMode === 'edit' && (
              <button
                onClick={() => setShowDelete(true)}
                className="flex-1 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
              >
                Excluir
              </button>
            )}
            <button
              onClick={closeRightbar}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveHierarquia}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              disabled={!novaHierarquia.trim()}
            >
              {modalMode === 'edit' ? 'Salvar' : 'Criar'}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nome da Hierarquia</label>
            <input
              type="text"
              value={novaHierarquia}
              onChange={e => setNovaHierarquia(e.target.value)}
              placeholder="Ex: Supervisor"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Permissões por Módulo</label>
            <div className="grid grid-cols-1 gap-3">
              {modules.map(m => (
                <div key={m.key} className="flex items-center gap-2">
                  <span className="w-32 text-sm">{m.label}</span>
                  <select
                    value={modalPermissoes[m.key] || 'none'}
                    onChange={e =>
                      setModalPermissoes(p => ({
                        ...p,
                        [m.key]: e.target.value
                      }))
                    }
                    className="fixed-select"
                  >
                    {permissions.map(opt => (
                      <option key={opt.key} value={opt.key}>
                        {opt.key === 'none' ? 'Sem permissão' : opt.key === 'view' ? 'Visualizar' : 'Editar'}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RightBar>

      {/* Modal Confirmar Exclusão */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Excluir Hierarquia</h3>
            <p className="text-muted-foreground mb-6">
              Tem certeza que deseja excluir esta hierarquia? Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteHierarquia}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
