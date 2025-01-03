"use client";

import Image from "next/image";
import Link from "next/link";
import TypeJsonColors from "@/app/types/propTypeJsonMainColor";

export default function CompColorPalette({
  mainColor,
  position,
  getTextColor,
  setShowColor,
  setColorCopy,
}: {
  mainColor: TypeJsonColors[];
  position: number | undefined | null;
  getTextColor: (color: string) => string;
  setShowColor: (value: boolean) => void;
  setColorCopy: (color: string) => void;
}) {
  if (position !== undefined && position !== null)
    return (
      <div className="relative w-full h-48 grid grid-rows-[1fr_auto] rounded-md shadow-md overflow-hidden hover:shadow-[0px_0px_10px] hover:shadow-blue-400/50 transition-all">
        <div className="flex w-full h-full">
          {mainColor &&
            Array.from({ length: 5 }).map((_, index) => (
              <div
                className="relative cursor-pointer h-full group flex justify-center items-center flex-grow hover:flex-grow-[2] transition-all"
                title="Copiar"
                key={index}
                style={{
                  backgroundColor: mainColor[position].colors[index],
                  color: getTextColor(mainColor[position].colors[index]),
                }}
                onClick={() => {
                  const hex = mainColor[position].colors[index];
                  navigator.clipboard.writeText(hex);
                  setShowColor(true);
                  setColorCopy(hex);
                }}
              >
                <span className="absolute font-medium pointer-events-none select-none group-hover:opacity-100 opacity-0 transition-opacity">
                  {mainColor[position].colors[index]}
                </span>
              </div>
            ))}
        </div>
        <div className="w-full flex items-center justify-center bg-white">
          <Link
            href={`/palets/${mainColor[position].id}`}
            className="flex justify-between w-full h-full p-3 font-normal group "
          >
            Personalizar
            <Image
              src={"/right-arrow.svg"}
              width={24}
              height={24}
              alt="Icono de flecha hacia la derecha"
              className="group-hover:opacity-100 group-hover:translate-x-0 opacity-0 -translate-x-1 transition-all "
            />
          </Link>
        </div>
      </div>
    );
}
