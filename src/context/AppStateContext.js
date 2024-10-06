import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [videoStatus, setVideoStatus] = useState({ playing: false, currentTime: 0 });

  return (
    <AppStateContext.Provider value={{ videoStatus, setVideoStatus }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
