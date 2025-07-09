// src/pages/AgendamentoPage.jsx
import React, { useState } from "react";
import {
  Calendar,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Mail,
  Bell,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Profissionais fake
const profissionaisFake = [
  { id: 1, nome: "Lucas Malta", especialidade: "Atendimento", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, nome: "Joana Souza", especialidade: "Financeiro", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, nome: "Carlos Pereira", especialidade: "Comercial", avatar: "https://randomuser.me/api/portraits/men/3.jpg" }
];

// Eventos fake 2025
const eventosFake = [
  { id: 101, tipo: "mensagem", titulo: "Campanha Janeiro", descricao: "Mensagem em massa para novos leads", data: "2025-01-06T10:00:00", responsavelId: 1, contatos: 128, status: "agendado" },
  { id: 102, tipo: "lembrete", titulo: "Cobrança recorrente", descricao: "Lembrete mensal para inadimplentes", data: "2025-01-07T15:00:00", responsavelId: 2, contatos: 16, status: "enviado" },
  { id: 103, tipo: "mensagem", titulo: "Parabéns cliente VIP", descricao: "Mensagem de aniversário agendada", data: "2025-01-10T09:00:00", responsavelId: 3, contatos: 7, status: "agendado" },
  { id: 104, tipo: "lembrete", titulo: "Enviar relatório semanal", descricao: "Enviar resumo para diretoria", data: "2025-01-11T17:00:00", responsavelId: 1, contatos: 1, status: "pendente" },
];

// Utils
function getDiaSemana(dateStr) {
  return ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][new Date(dateStr).getDay()] || "";
}
function formatarDataHora(d) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
function pad2(n) { return n < 10 ? '0' + n : n; }

export default function AgendamentoPage() {
  const [search, setSearch] = useState("");
  const [profissionalId, setProfissionalId] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [visualizacao, setVisualizacao] = useState("semana"); // dia | semana | mes
  const [showNovoModal, setShowNovoModal] = useState(false);

  // Datas referência para navegação
  const hoje = new Date("2025-01-06T12:00:00"); // Simula uma semana cheia de eventos
  const [dataRef, setDataRef] = useState(hoje);

  // Helpers para visualizar período correto
  function getWeek(date) {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }
  function getMonth(date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const diasNoMes = end.getDate();
    const arr = [];
    for (let i = 1; i <= diasNoMes; i++) {
      arr.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return arr;
  }
  function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); return d; }
  function addMonths(date, n) { const d = new Date(date); d.setMonth(d.getMonth() + n); return d; }

  // Filtro dos eventos
  const eventosFiltrados = eventosFake.filter(ev => {
    if (profissionalId && Number(profissionalId) !== ev.responsavelId) return false;
    if (search && !(ev.titulo.toLowerCase().includes(search.toLowerCase()) || ev.descricao.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  // Eventos para o dia
  const eventosDia = eventosFiltrados.filter(ev => {
    const d = new Date(ev.data);
    return d.toISOString().slice(0, 10) === dataRef.toISOString().slice(0, 10);
  });

  // Eventos para semana (mapa dia -> eventos)
  const semanaAtual = getWeek(dataRef);
  const eventosSemana = semanaAtual.map(dia => {
    const diaStr = dia.toISOString().slice(0, 10);
    return eventosFiltrados.filter(ev => ev.data.startsWith(diaStr));
  });

  // Eventos para o mês (mapa dia -> eventos)
  const mesAtual = getMonth(dataRef);

  // Animação filtro drop
  const filterMotion = {
    initial: { opacity: 0, y: -10, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
    transition: { duration: 0.22 },
  };

  // Gera slots de 30min
  const slots30min = [];
  for (let h = 0; h < 24; h++) {
    slots30min.push(`${pad2(h)}:00`, `${pad2(h)}:30`);
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-background py-8 px-1">
      <main className="w-full max-w-6xl mx-auto bg-background dark:bg-[#181a20] rounded-xl shadow p-0 md:p-8 border border-border">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Agendamento</h1>
            <p className="text-muted-foreground mt-1">Visualize, agende e gerencie envios de mensagens e lembretes</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setVisualizacao("dia")} className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${visualizacao === "dia" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}>Dia</button>
            <button onClick={() => setVisualizacao("semana")} className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${visualizacao === "semana" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}>Semana</button>
            <button onClick={() => setVisualizacao("mes")} className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${visualizacao === "mes" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"}`}>Mês</button>
            <button onClick={() => setShowNovoModal(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 ml-2"><Plus className="h-4 w-4" /><span>Novo Agendamento</span></button>
          </div>
        </div>

        {/* Busca e filtros */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar eventos por título ou descrição..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <button onClick={() => setShowFilter(v => !v)} className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilter ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showFilter && (
                <motion.div className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-lg shadow-lg z-50 p-4" {...filterMotion}>
                  <label className="block text-xs font-semibold mb-1">Responsável</label>
                  <select className="w-full border border-border rounded-lg px-2 py-1" value={profissionalId} onChange={e => setProfissionalId(e.target.value)}>
                    <option value="">Todos</option>
                    {profissionaisFake.map(p => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Visualização DIA */}
        {visualizacao === "dia" && (
          <div className="bg-card border border-border rounded-xl p-0 md:p-6 mt-2">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setDataRef(addDays(dataRef, -1))} className="text-primary hover:underline px-2">←</button>
              <div className="text-lg font-semibold">{`${getDiaSemana(dataRef)} ${dataRef.toLocaleDateString("pt-BR")}`}</div>
              <button onClick={() => setDataRef(addDays(dataRef, 1))} className="text-primary hover:underline px-2">→</button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto">
              {slots30min.map((hora, i) => {
                const slotData = `${dataRef.toISOString().slice(0, 10)}T${hora}:00`;
                const eventosSlot = eventosDia.filter(ev => ev.data.slice(11, 16) === hora);
                return (
                  <div key={hora} className="flex items-center border-b border-muted py-2 hover:bg-accent/40 transition group relative">
                    <div className="w-16 text-xs text-muted-foreground text-right pr-4">{hora}</div>
                    <div className="flex-1">
                      {eventosSlot.length > 0 ? eventosSlot.map(ev => {
                        const resp = profissionaisFake.find(p => p.id === ev.responsavelId);
                        return (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg flex flex-col gap-1 cursor-pointer transition-all mb-1"
                            key={ev.id}
                          >
                            <div className="flex items-center gap-2">
                              {ev.tipo === "mensagem" ? <Mail className="h-4 w-4 text-primary" /> : <Bell className="h-4 w-4 text-yellow-500" />}
                              <span className="font-medium text-xs">{ev.titulo}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <img src={resp.avatar} alt="" className="h-5 w-5 rounded-full border" />
                              {resp.nome}
                              <span className="ml-2 px-2 py-1 rounded bg-primary/30 text-primary text-xs">{ev.contatos} contatos</span>
                            </div>
                          </motion.div>
                        );
                      }) : (
                        <button className="opacity-0 group-hover:opacity-100 absolute right-3 top-1/2 -translate-y-1/2 text-primary text-xs px-3 py-1 rounded bg-primary/10 border border-primary/30 transition-all"
                          onClick={() => setShowNovoModal(true)}>
                          <Plus className="inline-block h-3 w-3 mr-1" /> Agendar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Visualização SEMANA */}
        {visualizacao === "semana" && (
          <div className="bg-card rounded-xl border border-border p-2 md:p-4">
            <div className="flex justify-between items-center mb-2">
              <button onClick={() => setDataRef(addDays(dataRef, -7))} className="text-primary hover:underline px-2">←</button>
              <div className="text-lg font-semibold">
                Semana de {semanaAtual[0].toLocaleDateString("pt-BR")} a {semanaAtual[6].toLocaleDateString("pt-BR")}
              </div>
              <button onClick={() => setDataRef(addDays(dataRef, 7))} className="text-primary hover:underline px-2">→</button>
            </div>
            <div className="grid grid-cols-8 text-xs font-medium mb-2">
              <div></div>
              {semanaAtual.map((d, i) => (
                <div key={i} className="text-center">{getDiaSemana(d)}<br />{d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</div>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-2">
              <div className="flex flex-col gap-4 items-end">
                {["09:00", "11:00", "13:00", "15:00", "17:00"].map((h, i) => (
                  <div key={i} className="text-xs text-muted-foreground h-16 flex items-center">{h}</div>
                ))}
              </div>
              {semanaAtual.map((d, idxDia) => (
                <div key={idxDia} className="flex flex-col gap-4">
                  {["09:00", "11:00", "13:00", "15:00", "17:00"].map((hr, idxHr) => {
                    const dataHora = `${d.toISOString().slice(0, 10)}T${hr}:00:00`;
                    const eventosDoSlot = eventosFiltrados.filter(ev => ev.data.slice(0, 13) === dataHora.slice(0, 13));
                    return (
                      <div key={idxHr} className="relative h-16">
                        {eventosDoSlot.length > 0 ? eventosDoSlot.map(ev => {
                          const resp = profissionaisFake.find(p => p.id === ev.responsavelId);
                          return (
                            <motion.div
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="absolute top-0 left-0 w-full h-full rounded-lg bg-primary/10 border border-primary/40 p-2 flex flex-col justify-between cursor-pointer transition-all group"
                              key={ev.id}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {ev.tipo === "mensagem" ? <Mail className="h-4 w-4 text-primary" /> : <Bell className="h-4 w-4 text-yellow-500" />}
                                <span className="font-semibold text-xs">{ev.titulo}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <img src={resp.avatar} alt="" className="h-5 w-5 rounded-full border" />
                                  <span className="text-xs">{resp.nome.split(" ")[0]}</span>
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded bg-primary/30 text-primary">{ev.contatos} contatos</span>
                              </div>
                            </motion.div>
                          );
                        }) : (
                          <button
                            className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 flex items-center justify-center text-primary text-xs rounded bg-primary/10 border border-primary/20 transition-all"
                            onClick={() => setShowNovoModal(true)}
                          >
                            <Plus className="inline-block h-3 w-3 mr-1" /> Agendar
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visualização MÊS */}
        {visualizacao === "mes" && (
          <div className="bg-card border border-border rounded-xl p-2 md:p-6 mt-2">
            <div className="flex justify-between items-center mb-2">
              <button onClick={() => setDataRef(addMonths(dataRef, -1))} className="text-primary hover:underline px-2">←</button>
              <div className="text-lg font-semibold">{dataRef.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</div>
              <button onClick={() => setDataRef(addMonths(dataRef, 1))} className="text-primary hover:underline px-2">→</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-xs">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, i) => (
                <div key={i} className="font-medium text-center pb-1">{d}</div>
              ))}
              {/* Empty grid até o primeiro dia */}
              {Array.from({ length: mesAtual[0].getDay() }).map((_, i) => (
                <div key={"emp" + i}></div>
              ))}
              {mesAtual.map((d, i) => {
                const diaStr = d.toISOString().slice(0, 10);
                const eventosDoDia = eventosFiltrados.filter(ev => ev.data.startsWith(diaStr));
                return (
                  <div key={i} className="relative group h-24 border rounded-lg flex flex-col cursor-pointer bg-muted/50 hover:bg-primary/5 transition-all overflow-hidden">
                    <div className="absolute top-1 left-2 text-xs font-semibold">{d.getDate()}</div>
                    {eventosDoDia.length > 0 && (
                      <div className="flex flex-col gap-1 mt-6">
                        {eventosDoDia.slice(0, 2).map(ev => (
                          <div key={ev.id} className="flex items-center gap-1 px-1">
                            {ev.tipo === "mensagem"
                              ? <Mail className="h-3 w-3 text-primary" />
                              : <Bell className="h-3 w-3 text-yellow-500" />}
                            <span className="text-[10px] font-medium truncate">{ev.titulo}</span>
                          </div>
                        ))}
                        {eventosDoDia.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{eventosDoDia.length - 2} mais</span>
                        )}
                      </div>
                    )}
                    <button
                      className="opacity-0 group-hover:opacity-100 absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs transition-all"
                      onClick={e => { e.stopPropagation(); setShowNovoModal(true); }}
                    >
                      <Plus className="inline-block h-3 w-3 mr-1" /> Agendar
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Novo Agendamento */}
        <AnimatePresence>
          {showNovoModal && (
            <motion.div
              className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNovoModal(false)}
            >
              <motion.div
                className="bg-card border border-border rounded-xl max-w-lg w-full p-8 relative"
                initial={{ scale: 0.98, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 40 }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 p-2 rounded hover:bg-accent"
                  onClick={() => setShowNovoModal(false)}
                >
                  <span className="sr-only">Fechar</span>
                  <svg width={20} height={20} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/></svg>
                </button>
                <h3 className="text-xl font-bold mb-4">Novo Agendamento</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo de evento</label>
                    <select className="w-full border border-border rounded-lg px-3 py-2">
                      <option>Mensagem em Massa</option>
                      <option>Lembrete</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Título</label>
                    <input type="text" className="w-full border border-border rounded-lg px-3 py-2" placeholder="Ex: Cobrança automática" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Responsável</label>
                    <select className="w-full border border-border rounded-lg px-3 py-2">
                      {profissionaisFake.map(p => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Data e Hora</label>
                    <input type="datetime-local" className="w-full border border-border rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                    <textarea rows={3} className="w-full border border-border rounded-lg px-3 py-2" placeholder="Detalhes do envio ou lembrete..."></textarea>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button type="button" className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors mr-3" onClick={() => setShowNovoModal(false)}>Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Agendar</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
