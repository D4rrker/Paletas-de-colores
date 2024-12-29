"use client";

import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import generateColor from "@/app/!global-functions/functionGenerateColors.js";
import TypeJsonColors from "@/app/types/propTypeJsonMainColor";

interface TypeColors {
  mainColors: TypeJsonColors[];
  setMainColors: React.Dispatch<React.SetStateAction<TypeJsonColors[]>>;
}

const MainColorsContext = createContext<TypeColors | undefined>(undefined);

export const MainColorsProvider = ({ children }: { children: ReactNode }) => {
  const [mainColors, setMainColors] = useState<TypeJsonColors[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("allPalets");
    const storedDataFav = localStorage.getItem("allFavPalets");

    if (!storedDataFav)
      localStorage.setItem("allFavPalets", JSON.stringify([]));

    if (!storedData) {
      const generatedData = generateColor();
      setMainColors(generatedData);
      sessionStorage.setItem("allPalets", JSON.stringify(generatedData));
    } else {
      const parsedData = JSON.parse(storedData) as TypeJsonColors[];
      setMainColors(parsedData);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("allPalets", JSON.stringify(mainColors));
  }, [mainColors]);

  return (
    <MainColorsContext.Provider value={{ mainColors, setMainColors }}>
      {children}
    </MainColorsContext.Provider>
  );
};

export const useMainColorsContext = () => {
  const context = useContext(MainColorsContext);

  if (!context) {
    throw new Error(
      "useMainColorsContext must be used within a MainColorsProvider"
    );
  }
  return context;
};
