import React, { useState } from 'react';
import { HelpCircle, Search, Book, MessageCircle, Phone, Mail, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

export const AjudaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      category: 'Primeiros Passos',
      question: 'Como conectar meu WhatsApp ao sistema?',
      answer: 'Para conectar seu WhatsApp, acesse o menu "Sessões", clique em "Nova Sessão" e escaneie o QR Code que aparecerá na tela com seu WhatsApp. O processo é simples e seguro.'
    },
    {
      id: 2,
      category: 'Primeiros Passos',
      question: 'Posso conectar múltiplas contas WhatsApp?',
      answer: 'Sim! O CRMPro permite conectar múltiplas contas WhatsApp. Cada conta funcionará como uma sessão independente, permitindo gerenciar diferentes números simultaneamente.'
    },
    {
      id: 3,
      category: 'Contatos',
      question: 'Como importar minha lista de contatos?',
      answer: 'Vá para "Contatos" > "Importar/Exportar" e faça upload de um arquivo CSV ou Excel com os dados dos seus contatos. O sistema irá mapear automaticamente os campos.'
    },
    {
      id: 4,
      category: 'Contatos',
      question: 'Como organizar contatos em grupos?',
      answer: 'Você pode criar grupos personalizados e aplicar tags aos contatos. Acesse "Contatos" > "Grupos" para criar novos grupos e organizar sua base de clientes.'
    },
    {
      id: 5,
      category: 'Mensagens',
      question: 'Como criar templates de mensagem?',
      answer: 'No menu "Mensagens", clique em "Novo Template". Você pode usar variáveis como {{nome}}, {{empresa}} para personalizar automaticamente as mensagens para cada contato.'
    },
    {
      id: 6,
      category: 'Mensagens',
      question: 'Posso agendar envio de mensagens?',
      answer: 'Sim! Use o menu "Agendamento" para programar envios de mensagens em datas e horários específicos. Ideal para campanhas promocionais e lembretes.'
    },
    {
      id: 7,
      category: 'Campanhas',
      question: 'Como criar uma campanha de marketing?',
      answer: 'Acesse "Campanhas" > "Criar Campanha", escolha o template de mensagem, selecione os contatos ou grupos de destino, configure data/horário e execute a campanha.'
    },
    {
      id: 8,
      category: 'Campanhas',
      question: 'Como acompanhar o desempenho das campanhas?',
      answer: 'No dashboard e na seção "Campanhas" > "Performance", você encontra métricas detalhadas como taxa de entrega, abertura, resposta e conversão de cada campanha.'
    },
    {
      id: 9,
      category: 'Técnico',
      question: 'O sistema funciona 24/7?',
      answer: 'Sim, o CRMPro funciona 24 horas por dia, 7 dias por semana. Suas campanhas agendadas serão executadas automaticamente mesmo quando você não estiver online.'
    },
    {
      id: 10,
      category: 'Técnico',
      question: 'Meus dados estão seguros?',
      answer: 'Absolutamente! Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança. Seus dados e conversas são protegidos com o mais alto nível de segurança.'
    }
  ];

  const documentationSections = [
    {
      title: 'Guia de Início Rápido',
      description: 'Primeiros passos para configurar sua conta',
      icon: '🚀',
      topics: [
        'Criando sua conta',
        'Conectando WhatsApp',
        'Importando contatos',
        'Primeira campanha'
      ]
    },
    {
      title: 'Gerenciamento de Contatos',
      description: 'Como organizar e segmentar sua base',
      icon: '👥',
      topics: [
        'Cadastro de contatos',
        'Importação em massa',
        'Tags e categorias',
        'Grupos personalizados'
      ]
    },
    {
      title: 'Campanhas e Mensagens',
      description: 'Criando campanhas eficazes',
      icon: '📢',
      topics: [
        'Templates de mensagem',
        'Variáveis dinâmicas',
        'Agendamento de envios',
        'Análise de resultados'
      ]
    },
    {
      title: 'Automação Avançada',
      description: 'Recursos avançados de automação',
      icon: '⚡',
      topics: [
        'Fluxos automáticos',
        'Gatilhos de evento',
        'Respostas automáticas',
        'Integrações API'
      ]
    }
  ];

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqData.map(item => item.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gradient">Central de Ajuda</h1>
        <p className="text-muted-foreground mt-2">
          Encontre respostas para suas dúvidas e aprenda a usar o CRMPro
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Busque por dúvidas, tutoriais ou funcionalidades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Documentação</h3>
              <p className="text-sm text-muted-foreground">Guias detalhados e tutoriais</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Chat ao Vivo</h3>
              <p className="text-sm text-muted-foreground">Fale com nosso suporte</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Suporte por Telefone</h3>
              <p className="text-sm text-muted-foreground">(11) 9999-9999</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveCategory('faq')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeCategory === 'faq'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Perguntas Frequentes
          </button>
          <button
            onClick={() => setActiveCategory('docs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeCategory === 'docs'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Documentação
          </button>
          <button
            onClick={() => setActiveCategory('contato')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeCategory === 'contato'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Contato
          </button>
        </nav>
      </div>

      {/* FAQ Section */}
      {activeCategory === 'faq' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSearchTerm('')}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                searchTerm === '' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearchTerm(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                  searchTerm === category 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQ.map((faq) => (
              <div key={faq.id} className="bg-card rounded-lg border border-border">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-accent transition-colors duration-200"
                >
                  <div>
                    <span className="text-xs text-primary font-medium">{faq.category}</span>
                    <h3 className="font-medium text-foreground mt-1">{faq.question}</h3>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documentation Section */}
      {activeCategory === 'docs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentationSections.map((section, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-200">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{section.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-200">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 text-sm text-primary hover:underline flex items-center space-x-1">
                    <span>Ver documentação completa</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Section */}
      {activeCategory === 'contato' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Entre em Contato</h2>
            <p className="text-muted-foreground">
              Nossa equipe está pronta para ajudar você com qualquer dúvida
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Chat ao Vivo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Resposta imediata durante horário comercial
              </p>
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                Iniciar Chat
              </button>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
              <p className="text-sm text-muted-foreground mb-4">
                suporte@crmpro.com<br />
                Resposta em até 24h
              </p>
              <button className="w-full border border-border py-2 rounded-lg hover:bg-accent transition-colors duration-200">
                Enviar E-mail
              </button>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-4">Horários de Atendimento</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Segunda a Sexta:</span>
                <span className="font-medium text-foreground">8h às 18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sábado:</span>
                <span className="font-medium text-foreground">8h às 12h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domingo:</span>
                <span className="font-medium text-foreground">Fechado</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

