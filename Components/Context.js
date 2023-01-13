import React, { createContext, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
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
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation("Portrait");
      } else {
        setOrientation("Landscape");
      }
    });
  }, []);
  return (
    <AppContext.Provider
      value={{
        activeColor,
        activeModelisation,
        orientation,
        setActiveColor,
        setActiveModelisation,
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
