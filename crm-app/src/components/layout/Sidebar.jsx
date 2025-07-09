import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Phone, Users, MessageSquare, Calendar, Send, 
  Settings, ChevronDown, BarChart3, Tag, Megaphone, HelpCircle, BookOpen,
  History, UserCheck
} from 'lucide-react';

export const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const isActive = (path) => location.pathname === path;
  const isMenuActive = (paths) => paths.some(path => location.pathname === path);

  const menuItems = [
    {
      category: 'GERAL',
      items: [
        {
          key: 'dashboard',
          icon: Home,
          label: 'Dashboard',
          path: '/',
          badge: '8'
        },
        {
          key: 'telefone',
          icon: Phone,
          label: 'Telefone',
          path: '/telefone',
          badge: '3'
        },
        {
          key: 'sessoes',
          icon: UserCheck,
          label: 'Sessões',
          hasSubmenu: true,
          badge: '2',
          submenu: [
            { label: 'Sessões Ativas', path: '/sessoes/ativas' },
            { label: 'Histórico', path: '/sessoes/historico' }
          ]
        },
        {
          key: 'contatos',
          icon: Users,
          label: 'Contatos',
          hasSubmenu: true,
          badge: '1247',
          submenu: [
            { label: 'Todos os Contatos', path: '/contatos' },
            { label: 'Grupos', path: '/contatos/grupos' },
            { label: 'Importar/Exportar', path: '/contatos/importar' }
          ]
        }
      ]
    },
    // ... demais menus iguais
    {
      category: 'COMUNICAÇÃO',
      items: [
        {
          key: 'mensagens',
          icon: MessageSquare,
          label: 'Mensagens',
          hasSubmenu: true,
          badge: '14',
          submenu: [
            { label: 'Templates', path: '/mensagens' },
            { label: 'Envio Individual', path: '/mensagens/individual' },
            { label: 'Histórico de Envios', path: '/mensagens/historico' }
          ]
        },
        {
          key: 'agendamento',
          icon: Calendar,
          label: 'Agendamento',
          path: '/agendamento',
          badge: '5'
        },
        {
          key: 'envio',
          icon: Send,
          label: 'Envio',
          hasSubmenu: true,
          badge: '23',
          submenu: [
            { label: 'Envios Programados', path: '/envio' },
            { label: 'Fila de Envio', path: '/envio/fila' },
            { label: 'Relatórios', path: '/envio/relatorios' }
          ]
        }
      ]
    },
    {
      category: 'GESTÃO',
      items: [
        {
          key: 'campanhas',
          icon: Megaphone,
          label: 'Campanhas',
          hasSubmenu: true,
          badge: '8',
          submenu: [
            { label: 'Todas as Campanhas', path: '/campanhas' },
            { label: 'Criar Campanha', path: '/campanhas/criar' },
            { label: 'Performance', path: '/campanhas/performance' }
          ]
        },
        {
          key: 'tags',
          icon: Tag,
          label: 'Tags',
          path: '/tags',
          badge: '12'
        },
        {
          key: 'historico',
          icon: History,
          label: 'Histórico',
          hasSubmenu: true,
          badge: '156',
          submenu: [
            { label: 'Atividades', path: '/historico' },
            { label: 'Alterações', path: '/historico/alteracoes' },
            { label: 'Logs do Sistema', path: '/historico/logs' }
          ]
        },
        {
          key: 'relatorios',
          icon: BarChart3,
          label: 'Relatórios',
          hasSubmenu: true,
          submenu: [
            { label: 'Performance', path: '/relatorios/performance' },
            { label: 'Contatos', path: '/relatorios/contatos' },
            { label: 'Campanhas', path: '/relatorios/campanhas' }
          ]
        }
      ]
    },
    {
      category: 'SUPORTE',
      items: [
        {
          key: 'ajuda',
          icon: HelpCircle,
          label: 'Central de Ajuda',
          hasSubmenu: true,
          submenu: [
            { label: 'FAQ', path: '/ajuda/faq' },
            { label: 'Documentação', path: '/ajuda/docs' },
            { label: 'Contato', path: '/ajuda/contato' }
          ]
        },
        {
          key: 'tutorial',
          icon: BookOpen,
          label: 'Tutorial',
          path: '/tutorial'
        },
        {
          key: 'configuracoes',
          icon: Settings,
          label: 'Configurações',
          hasSubmenu: true,
          submenu: [
            { label: 'Perfil', path: '/configuracoes/perfil' },
            { label: 'Sistema', path: '/configuracoes/sistema' },
            { label: 'Integrações', path: '/configuracoes/integracoes' }
          ]
        }
      ]
    }
  ];

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isItemActive = item.hasSubmenu 
      ? isMenuActive(item.submenu.map(sub => sub.path))
      : isActive(item.path);
    const isExpanded = expandedMenus[item.key];

    return (
      <div key={item.key} className="mb-1">
        {item.hasSubmenu ? (
          <button
            onClick={() => toggleMenu(item.key)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isItemActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
            type="button"
          >
            <div className="flex items-center space-x-3">
              <Icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : ''}`} />
              {!collapsed && (
                <>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      isItemActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </div>
            {!collapsed && (
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} />
            )}
          </button>
        ) : (
          <Link
            to={item.path}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              isItemActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : ''}`} />
              {!collapsed && (
                <>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      isItemActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </div>
          </Link>
        )}

        {/* Submenu */}
        {item.hasSubmenu && isExpanded && !collapsed && (
          <div className="mt-1 ml-8 space-y-1">
            {item.submenu.map((subItem, index) => (
              <Link
                key={index}
                to={subItem.path}
                className={`block px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                  isActive(subItem.path)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                style={{ cursor: 'pointer' }}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-50 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } lg:translate-x-0 ${collapsed ? 'translate-x-0' : 'translate-x-0'}`}>
        
        {/* Sidebar Content */}
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="p-4 space-y-6">
            {menuItems.map((section) => (
              <div key={section.category}>
                {!collapsed && (
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {section.category}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map(renderMenuItem)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
