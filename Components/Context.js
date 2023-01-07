import React, { createContext, useContext, useState } from "react";
import cpkData from "../Utils/CpkData.json";

export const useMyContext = () => {
  return useContext(AppContext);
};

const AppContext = createContext(null);

export const CPK_Coloring = {
  JMOL: "jmol",
  RASMOL: "rasmol",
};

export default function Context({ children }) {
  const [cpkColoring, setcpkColoring] = useState("jmol");
  const [data, setData] = useState(cpkData);
  return (
    <AppContext.Provider value={{ cpkColoring, setcpkColoring, data }}>
      {children}
    </AppContext.Provider>
  );
}
