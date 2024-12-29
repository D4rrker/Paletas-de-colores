import React from "react";
import TypeJsonColors from "@/app/types/propTypeJsonMainColor";

export default function saveFavoritePalets(
  { id, colors }: TypeJsonColors,
  setMainColors: React.Dispatch<React.SetStateAction<TypeJsonColors[]>>
) {
  const getSavePalets = localStorage.getItem("allFavPalets");
  const savedPalets = getSavePalets ? JSON.parse(getSavePalets) : [];

  const existingPaletIndex = savedPalets.findIndex(
    (item: TypeJsonColors) => item.id === id
  );

  if (existingPaletIndex !== -1) {
    savedPalets.splice(existingPaletIndex, 1);
    setMainColors((prev: TypeJsonColors[]) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isSaved: false,
          };
        }
        return item;
      });
    });
  } else {
    const uptade = { id, colors, isSaved: true };
    savedPalets.push(uptade);

    setMainColors((prev: TypeJsonColors[]) => {
      return prev.map((item) => {
        if (item.id === id) {
          const update = { ...item, isSaved: true };
          return update;
        }

        return item;
      });
    });
  }

  localStorage.setItem("allFavPalets", JSON.stringify(savedPalets));
};
