import { parseToHsl, hsl } from 'polished';

const getComplementaryColors = (color: string) => {
  const { hue, saturation, lightness } = parseToHsl(color);
  const colors: string[] = [];

  // Original color
  colors.push(color);

  for (let i = 1; i <= 5; i++) {
    const rotatedHue = (hue + (i * 72)) % 360;  // Rotate the hue by 72 degrees (360/5)
    const complementaryColor = hsl(rotatedHue, saturation, lightness);
    colors.push(complementaryColor);
  }

  return colors;
};
export default getComplementaryColors;