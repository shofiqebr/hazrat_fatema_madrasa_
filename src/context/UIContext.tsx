'use client';

import { createContext, useContext, useState } from 'react';

const UIContext = createContext<{
  isModalOpen: boolean;
  toggleModal: () => void;
}>({
  isModalOpen: false,
  toggleModal: () => {},
});

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <UIContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
