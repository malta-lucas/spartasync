import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ContatosPage } from './pages/ContatosPage';
import { MensagensPage } from './pages/MensagensPage';
import { TelefonePage } from './pages/TelefonePage';
import { SessoesPage } from './pages/SessoesPage';
import { PerfisPage } from './pages/PerfisPage';
import { HistoricoPage } from './pages/HistoricoPage';
import { CampanhasPage } from './pages/CampanhasPage';
// ↓↓↓ AJUSTE AQUI ↓↓↓
import AgendamentoPage from './pages/AgendamentoPage';
import { EnvioPage } from './pages/EnvioPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { TagsPage } from './pages/TagsPage';
import { TutorialPage } from './pages/TutorialPage';
import { AjudaPage } from './pages/AjudaPage';
import { AIAssistant } from './components/ai/AIAssistant';
import './App.css';

// Context para tema
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

// Componente para centralizar e remover padding APENAS em /sessoes/conectar
function MainContent({ sidebarCollapsed }) {
  const location = useLocation();
  const isSessoesNova = location.pathname === '/sessoes/conectar';

  return (
    <main
      className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16 ${
        isSessoesNova
          ? 'p-0 min-h-screen h-screen flex items-center justify-center bg-[#e5e6ea]'
          : ''
      }`}
      style={isSessoesNova ? { overflow: 'hidden' } : {}}
    >
      {isSessoesNova ? (
        <Routes>
          <Route path="/sessoes/conectar" element={<SessoesNova />} />
        </Routes>
      ) : (
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contatos" element={<ContatosPage />} />
            <Route path="/contatos/grupos" element={<ContatosPage />} />
            <Route path="/contatos/importar" element={<ContatosPage />} />
            <Route path="/mensagens" element={<MensagensPage />} />
            <Route path="/mensagens/individual" element={<MensagensPage />} />
            <Route path="/mensagens/historico" element={<MensagensPage />} />
            <Route path="/telefone" element={<TelefonePage />} />
            <Route path="/sessoes/ativas" element={<SessoesPage />} />
            <Route path="/sessoes/historico" element={<SessoesPage />} />
            <Route path="/perfis" element={<PerfisPage />} />
            <Route path="/historico" element={<HistoricoPage />} />
            <Route path="/historico/alteracoes" element={<HistoricoPage />} />
            <Route path="/historico/logs" element={<HistoricoPage />} />
            <Route path="/campanhas" element={<CampanhasPage />} />
            <Route path="/campanhas/criar" element={<CampanhasPage />} />
            <Route path="/campanhas/performance" element={<CampanhasPage />} />
            <Route path="/tags" element={<TagsPage />} />
            {/* ↓↓↓ AJUSTE AQUI ↓↓↓ */}
            <Route path="/agendamento" element={<AgendamentoPage />} />
            <Route path="/envio" element={<EnvioPage />} />
            <Route path="/envio/fila" element={<EnvioPage />} />
            <Route path="/envio/relatorios" element={<EnvioPage />} />
            <Route path="/configuracoes/perfil" element={<ConfiguracoesPage />} />
            <Route path="/configuracoes/sistema" element={<ConfiguracoesPage />} />
            <Route path="/configuracoes/integracoes" element={<ConfiguracoesPage />} />
            <Route path="/ajuda/faq" element={<AjudaPage />} />
            <Route path="/ajuda/docs" element={<AjudaPage />} />
            <Route path="/ajuda/contato" element={<AjudaPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
          </Routes>
        </div>
      )}
    </main>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Router>
        <div className={`min-h-screen bg-background text-foreground ${isDark ? 'dark' : ''}`}>
          <Header onToggleTheme={toggleTheme} onToggleSidebar={toggleSidebar} />
          <div className="flex">
            <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            <MainContent sidebarCollapsed={sidebarCollapsed} />
          </div>
          <AIAssistant />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
