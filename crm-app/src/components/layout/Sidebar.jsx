import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Phone, 
  Users, 
  UserCheck, 
  History, 
  MessageSquare, 
  Megaphone, 
  Calendar, 
  Send,
  Settings,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems = [
    {
      key: 'inicio',
      label: 'Início',
      icon: Home,
      path: '/',
      exact: true
    },
    {
      key: 'telefone',
      label: 'Telefone',
      icon: Phone,
      path: '/telefone'
    },
    {
      key: 'sessoes',
      label: 'Sessões',
      icon: UserCheck,
      path: '/sessoes'
    },
    {
      key: 'contatos',
      label: 'Contatos',
      icon: Users,
      path: '/contatos'
    },
    {
      key: 'perfis',
      label: 'Perfis',
      icon: Users,
      path: '/perfis'
    },
    {
      key: 'historico',
      label: 'Histórico',
      icon: History,
      path: '/historico'
    },
    {
      key: 'mensagens',
      label: 'Mensagens',
      icon: MessageSquare,
      path: '/mensagens'
    },
    {
      key: 'campanhas',
      label: 'Campanhas',
      icon: Megaphone,
      path: '/campanhas'
    },
    {
      key: 'agendamento',
      label: 'Agendamento',
      icon: Calendar,
      path: '/agendamento'
    },
    {
      key: 'envio',
      label: 'Envio',
      icon: Send,
      path: '/envio'
    }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border sidebar-transition z-40 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            
            return (
              <div key={item.key}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    active 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${
                    active ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
                  }`} />
                  
                  {!collapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {item.submenu && (
                        <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${
                          expandedMenus[item.key] ? 'rotate-90' : ''
                        }`} />
                      )}
                    </>
                  )}
                </Link>

                {/* Submenu */}
                {item.submenu && !collapsed && expandedMenus[item.key] && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.key}
                        to={subItem.path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(subItem.path)
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full bg-current opacity-50" />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Configurações no rodapé */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            to="/configuracoes"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/configuracoes')
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
            title={collapsed ? 'Configurações' : ''}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">Configurações</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
};

