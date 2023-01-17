import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [parse, setParse] = useState({});
  const [orientation, setOrientation] = useState("");
  const [light, setLight] = useState(true);
  const shotRef = useRef();

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
        light,
        parse,
        shotRef,
        setActiveColor,
        setActiveModelisation,
        setLight,
        setParse,
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
