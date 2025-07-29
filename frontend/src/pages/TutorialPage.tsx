import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, ArrowRight, Star, Award, Target } from 'lucide-react';

export const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const tutorialSteps = [
    {
      id: 1,
      title: 'Bem-vindo ao Sparta Sync',
      description: 'Aprenda os conceitos básicos do sistema',
      duration: '5 min',
      content: {
        overview: 'O Sparta Sync é uma plataforma completa para gerenciamento de relacionamento com clientes via WhatsApp.',
        objectives: [
          'Entender a interface principal',
          'Conhecer o menu de navegação',
          'Configurar seu perfil inicial'
        ],
        steps: [
          'Faça login no sistema',
          'Explore o menu lateral',
          'Configure suas informações pessoais',
          'Familiarize-se com o dashboard'
        ]
      }
    },
    {
      id: 2,
      title: 'Conectando seu WhatsApp',
      description: 'Configure suas sessões WhatsApp',
      duration: '10 min',
      content: {
        overview: 'Aprenda a conectar e gerenciar múltiplas contas WhatsApp no sistema.',
        objectives: [
          'Conectar primeira sessão via QR Code',
          'Entender o status das conexões',
          'Gerenciar múltiplas sessões'
        ],
        steps: [
          'Acesse o menu "Sessões"',
          'Clique em "Nova Sessão"',
          'Escaneie o QR Code com seu WhatsApp',
          'Verifique o status da conexão'
        ]
      }
    },
    {
      id: 3,
      title: 'Gerenciando Contatos',
      description: 'Organize sua base de contatos',
      duration: '15 min',
      content: {
        overview: 'Aprenda a cadastrar, organizar e segmentar seus contatos de forma eficiente.',
        objectives: [
          'Cadastrar novos contatos',
          'Organizar contatos em grupos',
          'Aplicar tags e categorias'
        ],
        steps: [
          'Acesse a página "Contatos"',
          'Clique em "Novo Contato"',
          'Preencha as informações completas',
          'Aplique tags relevantes',
          'Organize em grupos'
        ]
      }
    },
    {
      id: 4,
      title: 'Criando Mensagens',
      description: 'Configure templates de mensagens',
      duration: '12 min',
      content: {
        overview: 'Crie templates personalizados com variáveis dinâmicas para suas campanhas.',
        objectives: [
          'Criar templates de mensagem',
          'Usar variáveis dinâmicas',
          'Organizar por categorias'
        ],
        steps: [
          'Vá para "Mensagens"',
          'Clique em "Novo Template"',
          'Escreva sua mensagem',
          'Adicione variáveis como {{nome}}',
          'Teste o template'
        ]
      }
    },
    {
      id: 5,
      title: 'Enviando Campanhas',
      description: 'Execute campanhas de marketing',
      duration: '20 min',
      content: {
        overview: 'Aprenda a criar e executar campanhas de marketing eficazes.',
        objectives: [
          'Criar uma campanha',
          'Selecionar público-alvo',
          'Agendar envios'
        ],
        steps: [
          'Acesse "Campanhas"',
          'Clique em "Criar Campanha"',
          'Escolha o template',
          'Selecione os contatos',
          'Configure data e horário',
          'Execute a campanha'
        ]
      }
    },
    {
      id: 6,
      title: 'Analisando Resultados',
      description: 'Monitore performance e métricas',
      duration: '8 min',
      content: {
        overview: 'Entenda como acompanhar o desempenho das suas campanhas e contatos.',
        objectives: [
          'Interpretar métricas do dashboard',
          'Analisar relatórios de campanha',
          'Identificar oportunidades'
        ],
        steps: [
          'Acesse o Dashboard',
          'Analise as métricas principais',
          'Veja relatórios detalhados',
          'Identifique tendências',
          'Otimize suas estratégias'
        ]
      }
    }
  ];

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];
  const progressPercentage = ((completedSteps.length) / tutorialSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Tutorial Interativo</h1>
          <p className="text-muted-foreground mt-1">
            Aprenda a usar o Sparta Sync passo a passo
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progresso</p>
            <p className="font-semibold text-foreground">{completedSteps.length}/{tutorialSteps.length} concluídos</p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${progressPercentage}, 100`}
                className="text-primary"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-foreground">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Seu Progresso</h3>
          <span className="text-sm text-muted-foreground">{completedSteps.length} de {tutorialSteps.length} etapas</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tutorial Steps List */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Etapas do Tutorial</h3>
            <div className="space-y-3">
              {tutorialSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    currentStep === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      completedSteps.includes(step.id)
                        ? 'bg-green-500 text-white'
                        : currentStep === index
                        ? 'bg-primary-foreground text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{step.title}</p>
                      <p className="text-xs opacity-75">{step.duration}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Tutorial Content */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{currentTutorial.title}</h2>
                <p className="text-muted-foreground mt-1">{currentTutorial.description}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{currentTutorial.duration}</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Visão Geral</span>
                </h3>
                <p className="text-muted-foreground">{currentTutorial.content.overview}</p>
              </div>

              {/* Objectives */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Objetivos</span>
                </h3>
                <ul className="space-y-2">
                  {currentTutorial.content.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Play className="h-5 w-5 text-primary" />
                  <span>Passo a Passo</span>
                </h3>
                <ol className="space-y-3">
                  {currentTutorial.content.steps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground flex-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleStepComplete(currentTutorial.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                    completedSteps.includes(currentTutorial.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>
                    {completedSteps.includes(currentTutorial.id) ? 'Concluído' : 'Marcar como Concluído'}
                  </span>
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStep === tutorialSteps.length - 1}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Próximo</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      {completedSteps.length === tutorialSteps.length && (
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <Award className="h-12 w-12" />
            <div>
              <h3 className="text-xl font-bold">Parabéns! Tutorial Concluído!</h3>
              <p className="opacity-90">Você completou todos os passos do tutorial. Agora você está pronto para usar o Sparta Sync com eficiência!</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Star className="h-5 w-5 text-primary" />
          <span>Dicas Rápidas</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dica de Produtividade */}
          <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-3">
            <i className="fi fi-br-lightbulb-on text-yellow-400 text-1xl mt-1"></i>
            <div>
              <h4 className="font-medium text-foreground mb-1">Dica de Produtividade</h4>
              <p className="text-sm text-muted-foreground">
                Use atalhos de teclado para navegar mais rapidamente pelo sistema.
              </p>
            </div>
          </div>
          {/* Melhores Práticas */}
          <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-3">
            <i className="fi fi-br-bullseye-arrow text-red-500 text-1xl mt-1"></i>
            <div>
              <h4 className="font-medium text-foreground mb-1">Melhores Práticas</h4>
              <p className="text-sm text-muted-foreground">
                Organize seus contatos com tags desde o início para facilitar campanhas futuras.
              </p>
            </div>
          </div>
          {/* Análise de Dados */}
          <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-3">
            <i className="fi fi-br-chart-simple text-green-600 text-1xl mt-1"></i>
            <div>
              <h4 className="font-medium text-foreground mb-1">Análise de Dados</h4>
              <p className="text-sm text-muted-foreground">
                Monitore regularmente as métricas do dashboard para otimizar suas estratégias.
              </p>
            </div>
          </div>
          {/* Automação */}
          <div className="p-4 bg-muted/30 rounded-lg flex items-start gap-3">
            <i className="fi fi-br-home-settings text-blue-600 text-1xl mt-1"></i>
            <div>
              <h4 className="font-medium text-foreground mb-1">Automação</h4>
              <p className="text-sm text-muted-foreground">
                Configure campanhas automáticas para datas especiais como aniversários.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

