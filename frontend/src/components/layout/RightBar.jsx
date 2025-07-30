import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function RightBar({
  open,
  onClose,
  title,
  children,
  footer,
  width = 400,
  className = "",
}) {
  const [render, setRender] = React.useState(open);
  const [animState, setAnimState] = React.useState("closed");
  const overlayRef = useRef();

  useEffect(() => {
    if (open) setRender(true);
    else {
      setAnimState("closed");
      setTimeout(() => setRender(false), 300);
    }
  }, [open]);

  useEffect(() => {
    if (render && open) {
      requestAnimationFrame(() => setAnimState("open"));
    }
  }, [render, open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  if (!render) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className={`
          fixed inset-0 z-[99] bg-black transition-opacity duration-300
          ${open && animState === "open" ? "opacity-60" : "opacity-0 pointer-events-none"}
        `}
        style={{
          background: "rgba(32, 32, 48, 0.4)",
          height: "100vh",
        }}
        onClick={handleOverlayClick}
      />
      <aside
        className={`
          rightbar
          ${animState}
          ${className}
        `}
        style={{
          width: width,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-card">
          <h2 className="text-lg font-semibold text-foreground">{title || ""}</h2>
          <button className="p-2 rounded hover:bg-accent" onClick={onClose} aria-label="Fechar">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 flex-1 min-h-0 bg-card">
          {children}
        </div>
        <div className="px-6 py-4 border-t border-border bg-card">
          {footer}
        </div>
      </aside>
    </>
  );
}
