import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AgendamentoPage } from './pages/AgendamentoPage';
import { EnvioPage } from './pages/EnvioPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
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
            <Sidebar collapsed={sidebarCollapsed} />
            
            <main className={`flex-1 transition-all duration-300 ${
              sidebarCollapsed ? 'ml-16' : 'ml-64'
            } pt-16`}>
              <div className="p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/contatos" element={<ContatosPage />} />
                  <Route path="/mensagens" element={<MensagensPage />} />
                  <Route path="/telefone" element={<TelefonePage />} />
                  <Route path="/sessoes" element={<SessoesPage />} />
                  <Route path="/perfis" element={<PerfisPage />} />
                  <Route path="/historico" element={<HistoricoPage />} />
                  <Route path="/campanhas" element={<CampanhasPage />} />
                  <Route path="/agendamento" element={<AgendamentoPage />} />
                  <Route path="/envio" element={<EnvioPage />} />
                  <Route path="/configuracoes" element={<ConfiguracoesPage />} />
                </Routes>
              </div>
            </main>
          </div>

          <AIAssistant />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;

