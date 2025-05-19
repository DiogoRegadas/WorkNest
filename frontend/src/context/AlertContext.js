// src/context/AlertContext.js
import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const showAlert = (mensagem, tipo = 'sucesso') => {
    setAlert({ message: mensagem, type: tipo });
    setTimeout(() => setAlert(null), 4000);
  };

  const showConfirm = (mensagem, onConfirm, onCancel) => {
    setConfirmData({
      message: mensagem,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setConfirmData(null);
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setConfirmData(null);
      }
    });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, confirmData, showConfirm }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
