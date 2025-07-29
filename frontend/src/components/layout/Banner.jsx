import React, { useEffect, useState } from 'react';

// Ícones Fontisto (pode ajustar para seu framework de ícones, mas funciona com CDN Fontisto, Bootstrap Icons ou outros)
const icons = {
  error: <i className="fi fi-br-exclamation text-red-600 text-xl mr-2" />,
  success: <i className="fi fi-br-check-circle text-green-600 text-xl mr-2" />,
};

export function Banner({ type = 'success', message = '', show = false, onClose }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      // Fecha automaticamente após 3 segundos
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed z-[9999] top-6 left-1/2 transform -translate-x-1/2
        flex items-center px-6 py-3 rounded-xl shadow-lg
        ${type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}
        animate-fadeIn
        min-w-[240px] max-w-[94vw]
      `}
      style={{ minWidth: 260 }}
    >
      {/* Ícone */}
      {icons[type]}
      {/* Mensagem */}
      <span className={`flex-1 text-base font-semibold ${type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
        {message}
      </span>
      {/* Botão X */}
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="ml-4 text-lg font-bold text-gray-400 hover:text-gray-700 transition"
        aria-label="Fechar"
        tabIndex={0}
        type="button"
      >
        ×
      </button>
    </div>
  );
}

export default Banner;
