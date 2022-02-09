import { GuitarType } from '../const';

export const translateType = (type: string): string => {
  switch (type) {
    case GuitarType.Acoustic.Eng:
      return GuitarType.Acoustic.Ru;
    case GuitarType.Electric.Eng:
      return GuitarType.Electric.Ru;
    case GuitarType.Ukulele.Eng:
      return GuitarType.Ukulele.Ru;

    default:
      return type;
  }
};
