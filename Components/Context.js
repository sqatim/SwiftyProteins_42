import React, { createContext, useContext, useState } from "react";
import cpkData from "../Utils/CpkData.json";

export const useMyContext = () => {
  return useContext(AppContext);
};

const AppContext = createContext(null);

export const CPK_Coloring = {
  JMOL: "Jmol",
  RASMOL: "Rasmol",
};

export default function Context({ children }) {
  const [activeColor, setActiveColor] = useState("Rasmol");
  const [activeModelisation, setActiveModelisation] = useState("Sphere");
  const [data, setData] = useState(cpkData);
  return (
    <AppContext.Provider
      value={{
        activeColor,
        activeModelisation,
        setActiveColor,
        setActiveModelisation,
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
