"use client";

import getTextColor from "@/app/!global-functions/functionGetTextColor";
import { useMainColorsContext } from "@/app/!context/MainColorsContext";
import { useStateNotificationContext } from "@/app/!context/StateNotificationCopyColor";
import CompColorPalette from "./components/CompColorPalette";

export default function ColorPalette({ position }: { position: number }) {
  const { mainColors } = useMainColorsContext();
  const { setShowColor, setColorCopy } = useStateNotificationContext();

  if (!mainColors || mainColors.length === 0) return null;

  return (
    <CompColorPalette
      key={position}
      mainColor={mainColors}
      position={position}
      getTextColor={getTextColor}
      setShowColor={setShowColor}
      setColorCopy={setColorCopy}
    />
  );
}
