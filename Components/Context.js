import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dimensions, AppState } from "react-native";
import cpkData from "../Utils/CpkData.json";

export const useMyContext = () => {
  return useContext(AppContext);
};

const AppContext = createContext(null);

export const CPK_Coloring = {
  JMOL: "Jmol",
  RASMOL: "Rasmol",
};

export default function Context({ children, ...props }) {
  const [activeColor, setActiveColor] = useState("Rasmol");
  const [activeModelisation, setActiveModelisation] = useState("Sphere");
  const [data, setData] = useState(cpkData);
  const [parse, setParse] = useState({});
  const [orientation, setOrientation] = useState("");
  const { light, setLight } = props;
  const shotRef = useRef();
  //   const [share, setShare] = useState(false);
  const shareRef = useRef(false);
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
        shareRef,
        shotRef,
        setActiveColor,
        setActiveModelisation,
        setLight,
        setParse,
        // setShare,
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
