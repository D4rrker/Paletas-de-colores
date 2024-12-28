export default function getTextColor(hex: string): string {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance < 128 ? "#FFFFFF" : "#000000";
}
