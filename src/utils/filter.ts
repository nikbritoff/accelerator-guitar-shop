import { GuitarFilterInfo } from '../types/guitar-filter-info';

export const getAvailableStrings = (guitars: GuitarFilterInfo[]):number[] => {
  const strings: number[] = [];
  guitars.map((element: GuitarFilterInfo) =>
    element.strings.map((string: number) =>
      strings.push(string)),
  );

  return [...new Set(strings)].sort((a, b) => a - b);
};
