import React, { createContext, useContext, useState } from 'react';

type ModeContextType = {
  isHardMode: boolean;
  toggleHardMode: () => void;
};

const ModeContext = createContext<ModeContextType>({
  isHardMode: false,
  toggleHardMode: () => {},
});

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHardMode, setIsHardMode] = useState(false);

  const toggleHardMode = () => {
    setIsHardMode(prev => !prev);
  };

  return (
    <ModeContext.Provider value={{ isHardMode, toggleHardMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);