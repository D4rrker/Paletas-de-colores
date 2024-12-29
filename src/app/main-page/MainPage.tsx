"use client";

import AllMainPalets from "@/app/main-page/AllMainPalets";
// import Link from "next/link";
import { useMainColorsContext } from "@/app/!context/MainColorsContext";
import generateColor from "@/app//!global-functions/functionGenerateColors";
import NotificationCopy from "@/app/components/NotificationCopy";
import { useEffect, useRef, useState } from "react";

export default function MainPage() {
  const { setMainColors } = useMainColorsContext();
  const btnGenerateColors = useRef<HTMLButtonElement | null>(null);
  const [btnGenerateColorsInViewPort, setBtnGenerateColorsInViewPort] =
    useState<boolean>(true);
  const spanBtnGenerateColorRef = useRef<HTMLSpanElement | null>(null);
  const [spanBtnWidth, setSpanBtnWidth] = useState<boolean>(false);

  // Se obtiene el width del span hijo del segundo botón de 'btnGenerateColors'
  const dinamicSpanWidth = spanBtnGenerateColorRef.current?.offsetWidth;

  useEffect(() => {
    const btn = btnGenerateColors.current;

    if (!btn) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setBtnGenerateColorsInViewPort(true);
        else setBtnGenerateColorsInViewPort(false);
      });
    };
    const intersection = new IntersectionObserver(callback, {
      rootMargin: "0px",
      root: null,
    });

    intersection.observe(btn);

    return () => {
      intersection.unobserve(btn);
    };
  }, []);

  return (
    <main className="flex justify-center">
      <div className="container py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold ">Paletas de colores</h2>
          <div className="flex items-center gap-x-6">
            <button
              className={`transition-all px-8 py-3 rounded-md hover:shadow-md border border-gray-300 bg-white`}
              onClick={() => setMainColors(generateColor())}
              ref={btnGenerateColors}
            >
              Generar nuevas paletas
            </button>
            {
              <button
                className={`${
                  btnGenerateColorsInViewPort
                    ? "right-0 translate-x-full"
                    : "right-5 translate-x-0"
                } w-10 h-10 bg-black rounded-full fixed bottom-32 z-50 transition-all duration-300 group overflow-hidden hover:w-auto`}
                style={{
                  width: spanBtnWidth ? `${dinamicSpanWidth}px` : "40px",
                }}
                onMouseEnter={() => setSpanBtnWidth(true)}
                onMouseLeave={() => setSpanBtnWidth(false)}
                onClick={() =>
                  !btnGenerateColorsInViewPort && setMainColors(generateColor())
                }
              >
                <span
                  className="flex opacity-0 min-w-max group-hover:opacity-100 transition-opacity duration-300 text-white px-4"
                  ref={spanBtnGenerateColorRef}
                >
                  Generar nuevas paletas
                </span>
              </button>
            }
            {/* <Link
              href={"/fav-colors"}
              className="bg-[#1e1e1e] text-white px-8 py-3 rounded-md"
            >
              Personalizar Paleta
            </Link> */}
          </div>
        </div>
        <div>
          <AllMainPalets />
        </div>
      </div>
      <NotificationCopy />
    </main>
  );
}
