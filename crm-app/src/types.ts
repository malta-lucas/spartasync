// Tipos para o sistema CRM

export interface Contact {
  id: string;
  nomeCompleto: string;
  apelido: string;
  genero: 'masculino' | 'feminino' | 'outro' | 'nao_informado';
  dataNascimento: string;
  estadoCivil: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel';
  telefonePrincipal: string;
  email: string;
  enderecoCompleto: string;
  interesses: string[];
  produtosFavoritos: string[];
  preferenciaContato: 'telefone' | 'email' | 'whatsapp' | 'sms';
  dataCadastro: string;
  ultimaInteracao: string;
  frequenciaCompra: 'alta' | 'media' | 'baixa' | 'primeira_compra';
  ticketMedio: number;
  statusFidelidade: 'bronze' | 'prata' | 'ouro' | 'platina';
  ultimaCompra: string;
  datasImportantes: { data: string; descricao: string }[];
  profissao: string;
  cargo: string;
  empresa: string;
  restricoesAlimentares: string[];
  condicoesSaude: string[];
  praticaEsportes: string[];
  grupoSegmento: string;
  fonteOrigem: string;
  campoAdicional1: string;
  campoAdicional2: string;
  notasInternas: string;
  avatar?: string;
}

export interface Message {
  id: string;
  titulo: string;
  conteudo: string;
  variaveis: string[];
  tipo: 'promocional' | 'cobranca' | 'informativo' | 'personalizado';
  dataCriacao: string;
  ultimoUso?: string;
  vezesUsada: number;
}

export interface Campaign {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'email' | 'sms' | 'whatsapp' | 'telefone';
  status: 'ativa' | 'pausada' | 'finalizada' | 'rascunho';
  dataInicio: string;
  dataFim?: string;
  contatosAlvo: string[];
  mensagemId: string;
  resultados: {
    enviados: number;
    entregues: number;
    abertos: number;
    cliques: number;
    conversoes: number;
  };
}

export interface Session {
  id: string;
  contatoId: string;
  tipo: 'chamada' | 'reuniao' | 'apresentacao' | 'follow_up';
  dataHora: string;
  duracao: number; // em minutos
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  observacoes: string;
  resultado?: 'positivo' | 'neutro' | 'negativo';
  proximaAcao?: string;
}

export interface Notification {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  dataHora: string;
  lida: boolean;
  link?: string;
}

export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  cargo: string;
  departamento: string;
  telefone: string;
  configuracoes: {
    tema: 'light' | 'dark';
    notificacoes: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    idioma: string;
  };
}

export interface AIChat {
  id: string;
  mensagens: {
    id: string;
    tipo: 'user' | 'ai';
    conteudo: string;
    timestamp: string;
  }[];
  ativa: boolean;
}

export interface DashboardStats {
  totalContatos: number;
  contatosAtivos: number;
  campanhasAtivas: number;
  sessoesMes: number;
  ticketMedioMes: number;
  conversaoMes: number;
  crescimentoContatos: number;
  crescimentoVendas: number;
}

export interface PhoneCall {
  id: string;
  contatoId: string;
  numero: string;
  tipo: 'entrada' | 'saida';
  status: 'atendida' | 'perdida' | 'ocupado' | 'em_andamento';
  dataHora: string;
  duracao?: number;
  gravacao?: string;
  observacoes?: string;
}

export interface Appointment {
  id: string;
  contatoId: string;
  titulo: string;
  descricao: string;
  dataHora: string;
  duracao: number;
  tipo: 'reuniao' | 'ligacao' | 'apresentacao' | 'visita';
  status: 'agendado' | 'confirmado' | 'realizado' | 'cancelado';
  lembrete: boolean;
  localizacao?: string;
}

