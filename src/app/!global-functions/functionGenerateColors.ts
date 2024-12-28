import chroma from "chroma-js";

export default function generateColor(): {
  id: string;
  colors: string[];
  isSaved: boolean;
}[] {
  const palets: { id: string; colors: string[]; isSaved: boolean }[] = [];

  for (let a = 0; a < 80; a++) {
    // Generar dos colores base aleatorios
    const startColor = chroma.random();
    const endColor = chroma.random();

    // Crear una escala de colores con Chroma.js
    const scale = chroma.scale([startColor, endColor]).mode("lab").colors(5);

    const obj = {
      id: crypto.randomUUID(),
      colors: scale,
      isSaved: false,
    };

    palets.push(obj);
  }
  return palets;
}

