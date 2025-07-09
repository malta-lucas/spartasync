SpartaSync
🧠 Sobre o Projeto
O SpartaSync é um sistema completo para gestão de contatos, mensagens, agendamentos e campanhas em massa, pensado para times de vendas, atendimento e automação de comunicação.
Você pode gerenciar contatos, segmentá-los por tags, agendar envios de mensagens em massa ou lembretes, visualizar históricos de interação e relatórios de uso, tudo em uma interface moderna, responsiva e intuitiva.

O projeto utiliza React (Vite), Tailwind CSS, Framer Motion, componentes modernos, e simula dados e funcionalidades para prototipagem rápida de funcionalidades de CRM, disparo de mensagens, calendário/agenda e gerenciamento de campanhas.

🎯 Funcionalidades Principais
Gestão de Contatos
Cadastro, edição, visualização, segmentação e histórico detalhado por contato.

Tags & Segmentação
Crie, edite e organize tags para segmentar contatos.

Mensagens Personalizadas
Templates dinâmicos, visualização, edição, envio rápido e contagem de envios.

Envio em Massa & Campanhas
Agende e visualize disparos futuros ou históricos.

Agenda Visual
Visualização de eventos por dia, semana e mês com agendamento dinâmico.

Relatórios e Estatísticas
Cards com indicadores de uso, tags mais usadas, contatos VIP, etc.

UI moderna & responsiva
Tema escuro/claro, animações suaves, design inspirado em ferramentas premium.

Filtros, buscas rápidas e ações contextuais.

Assistente IA (placeholder)

🚀 Tecnologias Utilizadas
React 18 (com Vite)

Tailwind CSS

Framer Motion (animações)

Lucide React (ícones)

React Router Dom

Context API

Componentização própria

📂 Estrutura de Pastas (Exemplo)
pgsql
Copiar
Editar
crm-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── qrcode.png
│   ├── components/
│   │   ├── ai/
│   │   │   └── AIAssistant.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── pages/
│   │   ├── AgendamentoPage.jsx
│   │   ├── AjudaPage.tsx
│   │   ├── CampanhasPage.jsx
│   │   ├── ConfiguracoesPage.jsx
│   │   ├── ContatosPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EnvioPage.jsx
│   │   ├── HistoricoPage.jsx
│   │   ├── MensagensPage.jsx
│   │   ├── PerfisPage.jsx
│   │   ├── SessoesPage.jsx
│   │   ├── TagsPage.tsx
│   │   ├── TelefonePage.tsx
│   │   └── TutorialPage.tsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
🖥️ Demonstração Visual
Gestão de contatos e agenda por semana/mês, inspirado em interfaces de CRMs e apps como Google Calendar, WhatsApp Business, PipeDrive.

Cards de estatísticas animados.

Modais de criação/edição, visualização de histórico, hover contextuais, etc.

⚙️ Como rodar localmente
Pré-requisitos:

Node.js 18+

npm ou yarn

Git (opcional, mas recomendado)

Clone o repositório:

sh
Copiar
Editar
git clone git@github.com:malta-lucas/spartasync.git
cd spartasync/crm-app
Instale as dependências:

sh
Copiar
Editar
npm install
ou

sh
Copiar
Editar
yarn
Inicie o ambiente de desenvolvimento:

sh
Copiar
Editar
npm run dev
ou

sh
Copiar
Editar
yarn dev
Acesse via navegador:

Normalmente em http://localhost:5173

📆 Funcionalidades de Agendamento
Visualização por Semana:
Agenda semanal em grade, mostrando eventos agendados e slots vazios, com animações e botões contextuais de adicionar evento.

Visualização em Lista:
Lista completa dos eventos agendados (mensagens, lembretes, etc) com status, responsável e opções de filtro.

Agendar Evento:
Modal para criação de novos eventos, selecionando tipo (mensagem/lembrete), data, hora, responsável e detalhes.

Animações ao abrir/fechar modais, cards, etc.

Hover para ações rápidas (+ agendar, editar, excluir, visualizar detalhes).

👤 Licença e Autoria
Projeto de estudo/desenvolvimento mantido por Lucas Malta.

💬 Contato & Contribuição
Dúvidas, sugestões ou bugs: abra uma issue ou mande um pull request!

Para sugestões rápidas, use a aba Discussions no GitHub.

📢 Observação
Este projeto é um protótipo funcional e pode ser customizado para uso real em empresas, times de vendas, consultorias e squads de produto.
