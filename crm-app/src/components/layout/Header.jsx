import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Settings, 
  User, 
  Sun, 
  Moon, 
  Menu,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = ({ onToggleTheme, onToggleSidebar }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  const notifRef = useRef();
  const msgRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current && !notifRef.current.contains(event.target) &&
        msgRef.current && !msgRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setShowNotificationsDropdown(false);
        setShowMessagesDropdown(false);
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown || showNotificationsDropdown || showMessagesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown, showNotificationsDropdown, showMessagesDropdown]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    onToggleTheme();
  };

  const notifications = [
    { id: 1, title: 'Nova mensagem', message: 'João Silva enviou uma mensagem', time: '5 min' },
    { id: 2, title: 'Reunião agendada', message: 'Reunião com cliente às 14h', time: '1 h' },
    { id: 3, title: 'Campanha finalizada', message: 'Campanha de email foi concluída', time: '2 h' }
  ];

  const messages = [
    { id: 1, sender: 'Maria Santos', message: 'Olá, gostaria de mais informações...', time: '10 min', avatar: '👩' },
    { id: 2, sender: 'Carlos Lima', message: 'Quando podemos agendar uma reunião?', time: '30 min', avatar: '👨' },
    { id: 3, sender: 'Ana Costa', message: 'Obrigada pelo atendimento!', time: '1 h', avatar: '👩' }
  ];

  // Config da animação dos menus dropdown
  const dropdownMotion = {
    initial: { scaleY: 0, opacity: 0, originY: 0 },
    animate: { scaleY: 1, opacity: 1, originY: 0 },
    exit:    { scaleY: 0, opacity: 0, originY: 0 },
    transition: { duration: 0.25, ease: [0.43, 0.13, 0.23, 0.96] }
  };

  // Animação da barra de pesquisa
  const searchMotion = {
    initial: { boxShadow: "0px 0px 0px rgba(34,197,94,0)", scale: 1 },
    animate: { boxShadow: searchFocus ? "0px 4px 24px rgba(34,197,94,0.13)" : "0px 0px 0px rgba(34,197,94,0)", scale: searchFocus ? 1.03 : 1 },
    transition: { duration: 0.25 }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo e Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">Sparta</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Sync</span>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="flex-1 max-w-md mx-4">
          <div
            className={`
              relative
              transition-all
              duration-200
              ${searchFocus ? 'scale-100 shadow-[0_4px_24px_rgba(34,197,94,0.18)] border-primary' : ''}
            `}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar contatos, campanhas..."
              className={`
                w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition-all duration-200
              `}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
          </div>
        </div>

        {/* Ícones do Header */}
        <div className="flex items-center space-x-2">
          {/* Toggle Tema */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            title="Alternar tema"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notificações */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotificationsDropdown(!showNotificationsDropdown);
                setShowMessagesDropdown(false);
                setShowProfileDropdown(false);
              }}
              className="p-2 rounded-lg hover:bg-accent transition-colors relative"
              title="Notificações"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <AnimatePresence>
              {showNotificationsDropdown && (
                <motion.div
                  key="notifications"
                  className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 origin-top"
                  {...dropdownMotion}
                >
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">Notificações</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 hover:bg-accent border-b border-border last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-muted-foreground text-xs mt-1">{notification.message}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="text-primary text-sm hover:underline">Ver todas</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mensagens */}
          <div className="relative" ref={msgRef}>
            <button
              onClick={() => {
                setShowMessagesDropdown(!showMessagesDropdown);
                setShowNotificationsDropdown(false);
                setShowProfileDropdown(false);
              }}
              className="p-2 rounded-lg hover:bg-accent transition-colors relative"
              title="Mensagens"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>
            <AnimatePresence>
              {showMessagesDropdown && (
                <motion.div
                  key="messages"
                  className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 origin-top"
                  {...dropdownMotion}
                >
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">Mensagens</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {messages.map((message) => (
                      <div key={message.id} className="p-3 hover:bg-accent border-b border-border last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                            {message.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-sm">{message.sender}</p>
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                            <p className="text-muted-foreground text-xs mt-1 truncate">{message.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="text-primary text-sm hover:underline">Ver todas</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Configurações */}
          <button
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            title="Configurações"
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* Perfil */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotificationsDropdown(false);
                setShowMessagesDropdown(false);
              }}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden sm:block text-sm font-medium">Admin</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  key="profile"
                  className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 origin-top"
                  {...dropdownMotion}
                >
                  <div className="p-3 border-b border-border">
                    <p className="font-medium">Administrador</p>
                    <p className="text-sm text-muted-foreground">admin@crmpro.com</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent">
                      Meu Perfil
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent">
                      Configurações
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent">
                      Ajuda
                    </button>
                    <hr className="my-2 border-border" />
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent text-red-600">
                      Sair
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
