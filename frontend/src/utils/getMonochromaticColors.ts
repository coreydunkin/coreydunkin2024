import { darken, shade } from "polished";

const getMonochromaticColors = (color: string) => {
  const colors: string[] = [];

  // Original color
  colors.push(color);

  for (let i = 1; i <= 4; i++) {
    const ratio = i * 0.05; // 20%, 40%, 60%, 80%
    colors.push(shade(ratio, color));
  }

  return colors;
};

export default getMonochromaticColors;
