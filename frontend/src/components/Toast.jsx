import React, { useEffect } from "react";

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColors = {
    success: "#83e39a",
    error: "#ff6a5c",
    info: "#eceb8e",
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 2000,
        background: bgColors[type] || bgColors.success,
        color: "#08383a",
        padding: "12px 20px",
        borderRadius: 999,
        fontWeight: 800,
        fontSize: "0.9rem",
        boxShadow: "0 10px 30px rgba(8, 23, 26, 0.18)",
        border: "2px solid rgba(8, 56, 58, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        animation: "slideInUp 260ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Cerrar notificación"
        style={{
          background: "none",
          border: "none",
          color: "#08383a",
          fontWeight: 900,
          cursor: "pointer",
          padding: "0 4px",
        }}
      >
        ✕
      </button>
    </div>
  );
}
