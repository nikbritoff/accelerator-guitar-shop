import { company, datatype, finance, image, random } from 'faker';
import { GUITARS } from '../const';
import { Guitar } from '../types/guitar';

export const makeFakeGuitar = (): Guitar => {
  const guitarType = GUITARS[Math.floor(Math.random() * GUITARS.length)];

  return {
    id: datatype.number(),
    name: company.companyName(),
    vendorCode: finance.currencyCode(),
    type: guitarType.type,
    description: random.words(),
    previewImg: image.dataUri(),
    stringCount: guitarType.strings[0],
    rating: Math.floor(Math.random() * 5),
    price: datatype.number(),
  };
};

export const makeFakeGuitarsList = (amount = 9): Guitar[] => {
  const list = new Array(amount).fill('').map((element) => element = makeFakeGuitar());

  return list;
};
