import { createContext, useState } from "react";

export const RadiusContext = createContext();

export const RadiusProvider = ({ children }) => {
  const [radius, setRadius] = useState(5); 

  return (
    <RadiusContext.Provider value={{ radius, setRadius }}>
      {children}
    </RadiusContext.Provider>
  );
};
