import React, { useState } from 'react';
import { Bot, Send, X, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! Sou seu assistente de IA para o CRM. Como posso ajudá-lo hoje?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('contatos') || message.includes('clientes')) {
      return 'Você tem 1.247 contatos cadastrados no sistema. 65% estão ativos, 25% inativos e 10% são prospects. Posso ajudá-lo a filtrar ou buscar contatos específicos.';
    }
    
    if (message.includes('campanhas')) {
      return 'Atualmente você tem 25 campanhas ativas. A campanha "Promoção de Verão" está com melhor performance, com 78% de taxa de abertura.';
    }
    
    if (message.includes('vendas') || message.includes('receita')) {
      return 'Sua receita mensal atual é de R$ 45.2K, representando um crescimento de 8% em relação ao mês anterior. O ticket médio está em R$ 2.850.';
    }
    
    if (message.includes('relatório') || message.includes('dashboard')) {
      return 'Posso gerar relatórios personalizados para você. Que tipo de dados gostaria de analisar? Vendas, contatos, campanhas ou performance geral?';
    }
    
    return 'Entendi sua pergunta. Posso ajudá-lo com informações sobre contatos, campanhas, vendas, relatórios e muito mais. Seja mais específico sobre o que precisa!';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 ai-chat-button rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 z-50"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-80 h-96'
    }`}>
      <div className="bg-card border border-border rounded-lg shadow-xl h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-medium">Assistente IA</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded hover:bg-primary/80 transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-primary/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

