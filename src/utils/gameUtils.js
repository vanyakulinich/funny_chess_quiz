import { createArrWithValues } from "./jsUtils";

export const createGamePositions = positionsArr => {
  return positionsArr.reduce((acc, element, idx) => {
    const [horse] = Object.keys(element);
    acc.push(...createArrWithValues(horse, element[horse]));
    return acc;
  }, []);
};
