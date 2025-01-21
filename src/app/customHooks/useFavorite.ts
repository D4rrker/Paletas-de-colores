import { useEffect, useState } from "react";
import TypeJsonColors from "../types/propTypeJsonMainColor";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<TypeJsonColors[]>([]);

  const syncFavorites = () => {
    const fromLocal = localStorage.getItem("allFavPalets");
    if (fromLocal) {
      setFavorites(JSON.parse(fromLocal));
    }
  };

  useEffect(() => {
    syncFavorites();
  }, []);

  return { favorites, syncFavorites };
};
