import React, { createContext, useContext, useState, useCallback } from "react";
import Banner from "./Banner";

// Cria o contexto
const BannerContext = createContext();

export function useBanner() {
  return useContext(BannerContext);
}

// Provider global do Banner
export function BannerProvider({ children }) {
  const [state, setState] = useState({ show: false, type: "success", message: "" });

  // Exibir mensagem
  const showBanner = useCallback((type, message) => {
    setState({ show: true, type, message });
  }, []);

  // Fechar (esconde)
  const closeBanner = useCallback(() => {
    setState((s) => ({ ...s, show: false }));
  }, []);

  return (
    <BannerContext.Provider value={{ showBanner, closeBanner }}>
      <Banner
        show={state.show}
        type={state.type}
        message={state.message}
        onClose={closeBanner}
      />
      {children}
    </BannerContext.Provider>
  );
}
