"use client";

import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface TypeStateNotification {
  colorCopy: string;
  setColorCopy: (data: string) => void;
  showColor: boolean;
  setShowColor: (data: boolean) => void;
}

const StateNotificationContext = createContext<
  TypeStateNotification | undefined
>(undefined);

export const StateNotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showColor, setShowColor] = useState<boolean>(false);
  const [colorCopy, setColorCopy] = useState<string>("");

  useEffect(() => {
    if (!showColor) return;

    const timeOutId = setTimeout(() => setShowColor(false), 3000);

    return () => clearTimeout(timeOutId);
  }, [showColor]);

  return (
    <StateNotificationContext.Provider
      value={{ colorCopy, setColorCopy, showColor, setShowColor }}
    >
      {children}
    </StateNotificationContext.Provider>
  );
};

export const useStateNotificationContext = () => {
  const context = useContext(StateNotificationContext);

  if (!context) {
    throw new Error(
      "useStateNotification must be used within a StateNotificationProvider"
    );
  }

  return context;
};
