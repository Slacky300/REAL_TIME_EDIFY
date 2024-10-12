import { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';


const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [quill, setQuill] = useState(null); 
  const [darkMode, setDarkMode] = useState(false);

  const socket = io(import.meta.env.VITE_APP_SOCKET_URL || '/');

  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };


  return (
    <SupplierContext.Provider value={{ darkMode, setDarkMode, shouldUpdate, triggerUpdate, loading, quill, setQuill, setLoading, currentDoc, setCurrentDoc, socket}}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => useContext(SupplierContext);