import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Phone, Users, MessageSquare, Calendar, Send, 
  Settings, ChevronDown, BarChart3, Tag, Megaphone, HelpCircle, BookOpen,
  History, UserCheck
} from 'lucide-react';

// Importe o service de stats
import { fetchSidebarStats } from '../../services/sidebarStatsService';

export const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchSidebarStats()
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

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
          badge: stats ? stats.contatos : '...',
        },
        {
          key: 'telefone',
          icon: Phone,
          label: 'Telefone',
          path: '/telefone',
          badge: stats ? stats.telefone : '...',
        },
        {
          key: 'sessoes',
          icon: UserCheck,
          label: 'Sessões',
          hasSubmenu: true,
          badge: stats ? stats.sessoes_ativas : '...',
          submenu: [
            { label: 'Sessões Ativas', path: '/sessoes/ativas', badge: stats ? stats.sessoes_ativas : undefined },
            { label: 'Histórico', path: '/sessoes/historico', badge: stats ? stats.sessoes_historico : undefined }
          ]
        },
        {
          key: 'contatos',
          icon: Users,
          label: 'Contatos',
          hasSubmenu: true,
          badge: stats ? stats.contatos : '...',
          submenu: [
            { label: 'Todos os Contatos', path: '/contatos', badge: stats ? stats.contatos : undefined },
            { label: 'Grupos', path: '/contatos/grupos', badge: stats ? stats.grupos : undefined },
            { label: 'Importar/Exportar', path: '/contatos/importar' }
          ]
        }
      ]
    },
    {
      category: 'COMUNICAÇÃO',
      items: [
        {
          key: 'mensagens',
          icon: MessageSquare,
          label: 'Mensagens',
          hasSubmenu: true,
          badge: stats ? stats.mensagens : '...',
          submenu: [
            { label: 'Templates', path: '/mensagens', badge: stats ? stats.mensagens : undefined },
            { label: 'Envio Individual', path: '/mensagens/individual' },
            { label: 'Histórico de Envios', path: '/mensagens/historico' }
          ]
        },
        {
          key: 'agendamento',
          icon: Calendar,
          label: 'Agendamento',
          path: '/agendamento',
          badge: stats ? stats.agendamentos : '...'
        },
        {
          key: 'envio',
          icon: Send,
          label: 'Envio',
          hasSubmenu: true,
          badge: stats ? stats.envios_programados : '...',
          submenu: [
            { label: 'Envios Programados', path: '/envio', badge: stats ? stats.envios_programados : undefined },
            { label: 'Fila de Envio', path: '/envio/fila', badge: stats ? stats.fila_envio : undefined },
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
          badge: stats ? stats.campanhas : '...',
          submenu: [
            { label: 'Todas as Campanhas', path: '/campanhas', badge: stats ? stats.campanhas : undefined },
            { label: 'Criar Campanha', path: '/campanhas/criar' },
            { label: 'Performance', path: '/campanhas/performance' }
          ]
        },
        {
          key: 'tags',
          icon: Tag,
          label: 'Tags',
          path: '/tags',
          badge: stats ? stats.tags : '...'
        },
        {
          key: 'historico',
          icon: History,
          label: 'Histórico',
          hasSubmenu: true,
          badge: stats ? stats.historico : '...',
          submenu: [
            { label: 'Atividades', path: '/historico', badge: stats ? stats.historico : undefined },
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
                {subItem.badge !== undefined && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full font-medium bg-muted text-muted-foreground">
                    {subItem.badge}
                  </span>
                )}
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
