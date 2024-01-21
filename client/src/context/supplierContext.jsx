import { createContext, useContext, useState } from 'react';

const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };


  return (
    <SupplierContext.Provider value={{ shouldUpdate, triggerUpdate, loading, setLoading}}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => useContext(SupplierContext);