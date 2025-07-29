import React, { useState, useRef } from 'react';
import { Modal } from '../components/ui/Modal';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Send,
  Eye,
  Copy,
  Calendar
} from 'lucide-react';
import { useBanner } from '../components/layout/BannerContext';

export const MensagensPage = () => {
  const { showBanner } = useBanner();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      titulo: 'Promoção de Verão',
      conteudo: 'Olá {{nome}}! Temos uma oferta especial para você. Sua última compra foi em {{ultimaCompra}} e preparamos um desconto exclusivo!',
      variaveis: ['nome', 'ultimaCompra'],
      tipo: 'promocional',
      dataCriacao: '2024-06-01',
      ultimoUso: '2024-06-07',
      vezesUsada: 45
    },
    {
      id: 2,
      titulo: 'Cobrança Amigável',
      conteudo: 'Prezado(a) {{nome}}, identificamos que sua fatura no valor de {{valor}} está em aberto desde {{dataVencimento}}. Entre em contato conosco.',
      variaveis: ['nome', 'valor', 'dataVencimento'],
      tipo: 'cobranca',
      dataCriacao: '2024-05-15',
      ultimoUso: '2024-06-06',
      vezesUsada: 23
    },
    {
      id: 3,
      titulo: 'Boas-vindas',
      conteudo: 'Bem-vindo(a) {{nome}}! Obrigado por se cadastrar em nossa plataforma. Sua jornada conosco começa agora!',
      variaveis: ['nome'],
      tipo: 'informativo',
      dataCriacao: '2024-04-20',
      ultimoUso: '2024-06-05',
      vezesUsada: 78
    }
  ]);

  const [form, setForm] = useState({
    titulo: '',
    tipo: 'informativo',
    conteudo: '',
  });

  const textareaRef = useRef();

  const getTipoColor = (tipo) => {
    const colors = {
      promocional: 'bg-green-100 text-green-800',
      cobranca: 'bg-red-100 text-red-800',
      informativo: 'bg-blue-100 text-blue-800',
      personalizado: 'bg-purple-100 text-purple-800'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800';
  };

  const processarVariaveis = (conteudo, dadosContato = {}) => {
    let textoProcessado = conteudo;
    const dadosExemplo = {
      nome: 'João Silva',
      ultimaCompra: '15/05/2024',
      valor: 'R$ 150,00',
      dataVencimento: '01/06/2024',
      empresa: 'Tech Solutions',
      ...dadosContato
    };
    Object.keys(dadosExemplo).forEach(variavel => {
      const regex = new RegExp(`{{${variavel}}}`, 'g');
      textoProcessado = textoProcessado.replace(regex, dadosExemplo[variavel]);
    });
    return textoProcessado;
  };

  const filteredMensagens = mensagens.filter(mensagem =>
    mensagem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mensagem.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mensagem.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // HANDLERS CRUD + FEEDBACK
  const handleCopy = (mensagem) => {
    navigator.clipboard.writeText(mensagem.conteudo);
    showBanner('success', `Mensagem "${mensagem.titulo}" copiada com sucesso!`);
  };

  const handleDelete = (id) => {
    setMensagens((old) => old.filter(m => m.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setShowModal(false);
      setSelectedMessage(null);
      setPreviewMode(false);
      setForm({ titulo: '', tipo: 'informativo', conteudo: '' });
    }
    showBanner('success', 'Mensagem excluída com sucesso!');
  };

  const handleEdit = (mensagem) => {
    setSelectedMessage(mensagem);
    setForm({
      titulo: mensagem.titulo,
      tipo: mensagem.tipo,
      conteudo: mensagem.conteudo,
    });
    setPreviewMode(false);
    setShowModal(true);
  };

  // Salvar nova ou atualizar
  const handleSave = () => {
    if (!form.titulo.trim() || !form.conteudo.trim()) {
      showBanner('error', 'Preencha o título e o conteúdo da mensagem.');
      return;
    }
    if (selectedMessage) {
      setMensagens((old) =>
        old.map(m =>
          m.id === selectedMessage.id
            ? {
                ...m,
                titulo: form.titulo,
                tipo: form.tipo,
                conteudo: form.conteudo,
                variaveis: (form.conteudo.match(/{{(.*?)}}/g) || []).map(v => v.replace(/[{}]/g, '')),
              }
            : m
        )
      );
      showBanner('success', `Mensagem "${form.titulo}" atualizada com sucesso!`);
    } else {
      setMensagens((old) => [
        ...old,
        {
          id: Date.now(),
          titulo: form.titulo,
          tipo: form.tipo,
          conteudo: form.conteudo,
          variaveis: (form.conteudo.match(/{{(.*?)}}/g) || []).map(v => v.replace(/[{}]/g, '')),
          dataCriacao: new Date().toISOString().split('T')[0],
          ultimoUso: '',
          vezesUsada: 0
        }
      ]);
      showBanner('success', `Mensagem "${form.titulo}" criada com sucesso!`);
    }
    setShowModal(false);
    setSelectedMessage(null);
    setForm({ titulo: '', tipo: 'informativo', conteudo: '' });
  };

  // Adiciona variável no cursor do textarea
  const handleInsertVariable = (variavel) => {
    const insert = `{{${variavel}}}`;
    const textarea = textareaRef.current;
    if (textarea) {
      const { selectionStart, selectionEnd, value } = textarea;
      setForm(f => ({
        ...f,
        conteudo:
          value.slice(0, selectionStart) + insert + value.slice(selectionEnd)
      }));
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          selectionStart + insert.length,
          selectionStart + insert.length
        );
      }, 10);
    } else {
      setForm(f => ({
        ...f,
        conteudo: f.conteudo + ' ' + insert
      }));
    }
    showBanner('info', `Variável {{${variavel}}} adicionada ao conteúdo.`);
  };

  // Abre modal para nova mensagem
  const handleNovaMensagem = () => {
    setShowModal(true);
    setSelectedMessage(null);
    setForm({ titulo: '', tipo: 'informativo', conteudo: '' });
    setPreviewMode(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Mensagens Personalizadas</h1>
          <p className="text-muted-foreground mt-1">Crie e gerencie templates de mensagens com variáveis</p>
        </div>
        <button
          onClick={handleNovaMensagem}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Mensagem</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar mensagens por título, conteúdo ou tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Lista de Mensagens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMensagens.map((mensagem) => (
          <div key={mensagem.id} className="bg-card border border-border rounded-lg p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{mensagem.titulo}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(mensagem.tipo)}`}>
                  {mensagem.tipo.charAt(0).toUpperCase() + mensagem.tipo.slice(1)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setSelectedMessage(mensagem);
                    setPreviewMode(true);
                    setShowModal(true);
                  }}
                  className="p-1 rounded hover:bg-accent transition-colors"
                  title="Visualizar"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEdit(mensagem)}
                  className="p-1 rounded hover:bg-accent transition-colors"
                  title="Editar"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(mensagem.id)}
                  className="p-1 rounded hover:bg-accent transition-colors text-red-600"
                  title="Excluir"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {mensagem.conteudo}
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Variáveis:</span>
                <span className="font-medium">{mensagem.variaveis.length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {mensagem.variaveis.map((variavel, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                  >
                    {`{{${variavel}}}`}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Criada em:</span>
                <span>{new Date(mensagem.dataCriacao).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Último uso:</span>
                <span>{mensagem.ultimoUso ? new Date(mensagem.ultimoUso).toLocaleDateString('pt-BR') : '-'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Vezes usada:</span>
                <span className="font-medium">{mensagem.vezesUsada}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
              <button className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Enviar</span>
              </button>
              <button
                onClick={() => handleCopy(mensagem)}
                className="px-3 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                title="Copiar"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.015]">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total de Templates</span>
          </div>
          <p className="text-2xl font-bold mt-2">{mensagens.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.015]">
          <div className="flex items-center space-x-2">
            <Send className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">Mensagens Enviadas</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {mensagens.reduce((total, msg) => total + msg.vezesUsada, 0)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.015]">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-muted-foreground">Este Mês</span>
          </div>
          <p className="text-2xl font-bold mt-2">89</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.015]">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-muted-foreground">Mais Usada</span>
          </div>
          <p className="text-sm font-bold mt-2">Boas-vindas</p>
        </div>
      </div>

      {/* Modal de Cadastro/Edição/Preview */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMessage(null);
          setForm({ titulo: '', tipo: 'informativo', conteudo: '' });
          setPreviewMode(false);
        }}
        title={previewMode ? 'Preview da Mensagem' : (selectedMessage ? 'Editar Mensagem' : 'Nova Mensagem')}
        size="lg"
      >
        {previewMode ? (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Conteúdo Original:</h4>
              <p className="text-sm">{selectedMessage?.conteudo}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Preview com Dados de Exemplo:</h4>
              <p className="text-sm">{processarVariaveis(selectedMessage?.conteudo || '')}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Variáveis Disponíveis:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMessage?.variaveis.map((variavel, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-sm rounded"
                  >
                    {`{{${variavel}}}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título da Mensagem</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={form.titulo}
                placeholder="Ex: Promoção de Verão"
                onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={form.tipo}
                onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
              >
                <option value="promocional">Promocional</option>
                <option value="cobranca">Cobrança</option>
                <option value="informativo">Informativo</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Conteúdo da Mensagem</label>
              <textarea
                ref={textareaRef}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={form.conteudo}
                placeholder="Digite sua mensagem aqui. Use {{variavel}} para inserir dados dinâmicos."
                onChange={e => setForm(f => ({ ...f, conteudo: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Variáveis Disponíveis</label>
              <p className="text-sm text-muted-foreground mb-2">
                Clique nas variáveis abaixo para inserir no texto:
              </p>
              <div className="flex flex-wrap gap-2">
                {['nome', 'email', 'telefone', 'empresa', 'ultimaCompra', 'valor', 'dataVencimento'].map((variavel) => (
                  <button
                    key={variavel}
                    className="px-2 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary/20 transition-colors"
                    onClick={() => handleInsertVariable(variavel)}
                    type="button"
                  >
                    {`{{${variavel}}}`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              {selectedMessage && (
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  type="button"
                >
                  Excluir
                </button>
              )}
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMessage(null);
                  setForm({ titulo: '', tipo: 'informativo', conteudo: '' });
                }}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                type="button"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                type="button"
              >
                {selectedMessage ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
