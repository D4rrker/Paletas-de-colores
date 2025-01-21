"use client";

import { useParams } from "next/navigation";
import { useMainColorsContext } from "@/app/context/MainColorsContext";
import { useStateNotificationContext } from "@/app/context/StateNotificationCopyColor";
import getTextColor from "@/app/global-functions/functionGetTextColor";
import NotificationCopy from "@/app/components/NotificationCopy";
import TypeJsonColors from "@/app/types/propTypeJsonMainColor";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useFavorites } from "@/app/customHooks/useFavorite";

export default function GetPathName() {
  const params = useParams<{ palets: string }>();
  const getParam = params.palets;
  const { mainColors } = useMainColorsContext();
  const { favorites } = useFavorites();
  const { setShowColor, setColorCopy } = useStateNotificationContext();
  const [cloneColors, setCloneColors] = useState<TypeJsonColors | undefined>();
  const inputColor = useRef<(HTMLInputElement | null)[]>([]);

  const findPalet: TypeJsonColors | undefined =
    mainColors.find((obj) => getParam === obj.id) ||
    favorites.find((obj) => getParam === obj.id);

  useEffect(() => {
    setCloneColors(findPalet);
  }, [findPalet]);

  if (!cloneColors)
    return (
      <div className="flex justify-center">
        <div className="container">
          <div className="flex justify-end p-6">
            <Link
              className="hidden md:block px-4 py-2 bg-white outline outline-1 outline-gray-300 rounded-sm hover:shadow-md"
              href={"/"}
            >
              Volver
            </Link>
          </div>
          <div className="w-full text-center">Paleta no encontrada.</div>
        </div>
      </div>
    );

  const updateColors = (index: number, color: string) => {
    setCloneColors((prev) => {
      if (!prev) return prev;

      const newArrColors = [...prev.colors];
      newArrColors[index] = color;

      return { ...prev, colors: newArrColors };
    });
  };

  const handleHTMLDiv = (index: number) => {
    const inputElement = inputColor.current[index];
    if (inputElement) {
      inputElement.click();
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="container h-full lg:h-screen flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold py-10 text-[#1e1e1e]">
            Personaliza tu Paleta
          </h1>
          <Link
            className="hidden md:block px-4 py-2 bg-white outline outline-1 outline-gray-300 rounded-sm hover:shadow-md"
            href={"/"}
          >
            Volver
          </Link>
        </div>
        <div className="w-full h-full flex flex-col gap-y-10 items-center">
          <div className="flex flex-wrap items-center justify-center gap-10 p-10 rounded-sm bg-white">
            {cloneColors &&
              cloneColors?.colors.map((color, index) => (
                <div
                  className={`w-36 h-36 flex items-center gap-y-5 rounded-2xl cursor-pointer shadow-xl hover:scale-110 transition-transform`}
                  onClick={() => handleHTMLDiv(index)}
                  key={index}
                  style={{
                    backgroundColor: color,
                  }}
                >
                  <input
                    className="-z-50 w-0 outline outline-1 outline-gray-300"
                    type="color"
                    defaultValue={color}
                    ref={(el) => {
                      inputColor.current[index] = el;
                    }}
                    onChange={(e) => {
                      const newColor = e.target.value;
                      updateColors(index, newColor);
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="relative w-full">
            <h2 className="text-2xl font-medium mb-10">Vista previa</h2>
            <div className="flex flex-col sm:flex-row w-full h-80 sm:h-64 rounded-sm overflow-hidden outline outline-1 outline-gray-300">
              {cloneColors &&
                cloneColors?.colors.map((color: string, index: number) => (
                  <div
                    className="w-full h-full relative cursor-pointer group flex justify-center items-center flex-grow hover:flex-grow-[2] transition-all"
                    key={index}
                    style={{
                      backgroundColor: color,
                      color: getTextColor(cloneColors.colors[index]),
                    }}
                    onClick={() => {
                      const hex = cloneColors.colors[index];
                      navigator.clipboard.writeText(hex);
                      setShowColor(true);
                      setColorCopy(hex);
                    }}
                  >
                    <span className="absolute font-medium pointer-events-none select-none sm:group-hover:opacity-100 sm:opacity-0 transition-opacity">
                      {cloneColors.colors[index]}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <NotificationCopy />
        </div>
      </div>
    </div>
  );
}
