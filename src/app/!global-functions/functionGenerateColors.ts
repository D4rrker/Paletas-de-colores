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

    // Ordenar colores de más oscuro a más claro usando luminosidad
    // const sortedColors = sortColors(scale);

    const obj = {
      id: crypto.randomUUID(),
      colors: scale,
      isSaved: false,
    };

    palets.push(obj);
  }
  return palets;
}

// // Función para convertir un color hexadecimal a RGB
// function hexToRgb(hex: string): { r: number; g: number; b: number } {
//   const bigint = parseInt(hex.slice(1), 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;

//   return { r, g, b };
// }

// // Función para calcular la luminosidad de un color
// function getLuminosity(rgb: { r: number; g: number; b: number }): number {
//   return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
// }

// // Función para ordenar colores de más oscuro a menos oscuro
// function sortColors(colors: string[]): string[] {
//   return colors.sort((a, b) => {
//     const luminosityA = getLuminosity(hexToRgb(a));
//     const luminosityB = getLuminosity(hexToRgb(b));
//     return luminosityA - luminosityB;
//   });
// }
