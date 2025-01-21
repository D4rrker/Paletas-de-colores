"use client";

import { useState, useEffect } from "react";
import CompColorPalette from "@/app/color-palette/component/components/CompColorPalette";
import getTextColor from "@/app/global-functions/functionGetTextColor";
import { useStateNotificationContext } from "@/app/context/StateNotificationCopyColor";
import TypeJsonColors from "@/app/types/propTypeJsonMainColor";
import { InfiniteScroll } from "@/app/global-functions/functionInfiniteScroll";
import NotificationCopy from "@/app/components/NotificationCopy";
import Link from "next/link";

export default function FavoriteColors() {
  const { setColorCopy, setShowColor } = useStateNotificationContext();
  const [favoritePalettes, setFavoritePalettes] = useState<TypeJsonColors[]>(
    []
  );
  const initialLoadCount = 8;

  useEffect(() => {
    const fromLocal = localStorage.getItem("allFavPalets");
    if (fromLocal) {
      setFavoritePalettes(JSON.parse(fromLocal));
    }
  }, []);

  const handleRemoveFavorite = (id: string) => {
    const updatedPalettes = favoritePalettes.filter(
      (palette) => palette.id !== id
    );
    setFavoritePalettes(updatedPalettes);
    localStorage.setItem("allFavPalets", JSON.stringify(updatedPalettes));
  };

  const loadMoreItems = (prevCount: number): number => {
    return Math.min(prevCount + 8, favoritePalettes.length);
  };

  return (
    <div className="flex justify-center p-6">
      <div className="container">
        <div className="flex justify-between mb-14">
          <h1 className="text-2xl font-semibold">Paletas favoritas</h1>
          <Link
            className="hidden md:block px-4 py-2 bg-white outline outline-1 outline-gray-300 rounded-sm hover:shadow-md"
            href={"/"}
          >
            Volver
          </Link>
        </div>
        <InfiniteScroll
          loadMoreItems={loadMoreItems}
          itemCount={initialLoadCount}
        >
          {(visibleCount) => (
            <div
              className={`${
                favoritePalettes.length > 0
                  ? "grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] auto-rows-auto gap-10"
                  : ""
              }`}
            >
              {favoritePalettes.length > 0 ? (
                favoritePalettes
                  .slice(0, visibleCount)
                  .map((palette, index) => (
                    <CompColorPalette
                      key={index}
                      mainColor={favoritePalettes}
                      position={index}
                      getTextColor={getTextColor}
                      setColorCopy={setColorCopy}
                      setShowColor={setShowColor}
                      onRemoveFavorite={() => handleRemoveFavorite(palette.id)}
                    />
                  ))
              ) : (
                <div>
                  <p className="text-center">No hay paletas en favoritos</p>
                </div>
              )}
            </div>
          )}
        </InfiniteScroll>
      </div>
      <NotificationCopy />
    </div>
  );
}
