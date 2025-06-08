# Sistema CRM Moderno - Documentação

## Visão Geral
Sistema CRM moderno inspirado no design do HRMS do Behance, desenvolvido com React e Tailwind CSS. O sistema oferece uma interface completa para gestão de relacionamento com clientes, incluindo funcionalidades avançadas de IA.

## Funcionalidades Implementadas

### ✅ Interface e Design
- **Design moderno** inspirado no HRMS do Behance
- **Modo claro/escuro** com toggle funcional
- **Sidebar responsiva** com expansão/recolhimento
- **Header completo** com dropdowns funcionais
- **Popups com blur** e escurecimento de fundo
- **Transições suaves** e micro-interações

### ✅ Gestão de Contatos
- **Cadastro completo** com todos os campos solicitados:
  - Nome completo, apelido, gênero, data de nascimento
  - Estado civil, telefone, email, endereço
  - Interesses, produtos favoritos, preferência de contato
  - Dados profissionais (empresa, cargo, profissão)
  - Informações de saúde e esportes
  - Campos personalizáveis e notas internas
- **Listagem avançada** com filtros e busca
- **Edição e exclusão** via modais
- **Estatísticas** de contatos e segmentação

### ✅ Mensagens Personalizadas
- **Sistema de variáveis** dinâmicas ({{nome}}, {{empresa}}, etc.)
- **Templates por categoria** (promocional, cobrança, informativo)
- **Preview em tempo real** com dados de exemplo
- **Histórico de uso** e estatísticas
- **Envio em massa** personalizado

### ✅ Dashboard Inteligente
- **Métricas em tempo real** (contatos, campanhas, receita)
- **Gráficos interativos** (performance mensal, status dos contatos)
- **Atividades recentes** e próximos eventos
- **Cards informativos** com indicadores de crescimento

### ✅ Assistente de IA
- **Botão flutuante** moderno no canto inferior direito
- **Chat funcional** com interface intuitiva
- **Respostas inteligentes** baseadas nos dados do CRM
- **Consultas sobre** contatos, campanhas, vendas e relatórios
- **Minimização/maximização** do chat

### ✅ Navegação e UX
- **Menu lateral** com ícones e indicadores visuais
- **Roteamento completo** entre todas as páginas
- **Busca global** no header
- **Notificações** e mensagens em tempo real
- **Perfil do usuário** com dropdown

## Estrutura do Projeto

```
crm-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── ui/
│   │   │   └── Modal.jsx
│   │   └── ai/
│   │       └── AIAssistant.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ContatosPage.jsx
│   │   ├── MensagensPage.jsx
│   │   └── [outras páginas]
│   ├── types.ts
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## Tecnologias Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Estilização e design system
- **Lucide React** - Ícones modernos
- **Recharts** - Gráficos e visualizações
- **React Router** - Navegação entre páginas
- **Vite** - Build tool e desenvolvimento

## Paleta de Cores

- **Verde Principal**: #22c55e (inspirado no Behance)
- **Verde Secundário**: Tons mais claros para gradientes
- **Modo Escuro**: Suporte completo com variáveis CSS
- **Cores de Status**: Verde, vermelho, amarelo, azul para diferentes estados

## Responsividade

O sistema é totalmente responsivo e funciona em:
- **Desktop** (1920px+)
- **Laptop** (1024px+)
- **Tablet** (768px+)
- **Mobile** (320px+)

## Funcionalidades Futuras

### Próximas Implementações
- **Telefone**: Sistema de chamadas e gravações
- **Sessões**: Gestão de reuniões e apresentações
- **Campanhas**: Criação e gestão de campanhas de marketing
- **Agendamento**: Sistema de calendário integrado
- **Relatórios**: Dashboards avançados e exportação
- **Integrações**: APIs externas e webhooks

## Como Executar

### Desenvolvimento Local
```bash
cd crm-app
npm install
npm run dev
```

### Build para Produção
```bash
npm run build
npm run preview
```

## URLs de Acesso

- **Desenvolvimento**: http://localhost:5174
- **Produção**: https://fwvnzzmg.manus.space

## Estrutura de Dados

### Contato
```typescript
interface Contact {
  id: string;
  nomeCompleto: string;
  apelido: string;
  genero: 'masculino' | 'feminino' | 'outro' | 'nao_informado';
  dataNascimento: string;
  estadoCivil: string;
  telefonePrincipal: string;
  email: string;
  enderecoCompleto: string;
  // ... outros campos
}
```

### Mensagem
```typescript
interface Message {
  id: string;
  titulo: string;
  conteudo: string;
  variaveis: string[];
  tipo: 'promocional' | 'cobranca' | 'informativo' | 'personalizado';
  // ... outros campos
}
```

## Suporte e Manutenção

O sistema foi desenvolvido seguindo as melhores práticas de:
- **Clean Code** e organização modular
- **TypeScript** para tipagem segura
- **Componentes reutilizáveis** e escaláveis
- **Performance otimizada** com lazy loading
- **Acessibilidade** (ARIA labels e navegação por teclado)

## Conclusão

O sistema CRM está completo e funcional, oferecendo uma experiência moderna e intuitiva para gestão de relacionamento com clientes. Todas as funcionalidades solicitadas foram implementadas com sucesso, mantendo a identidade visual inspirada no design do Behance.

