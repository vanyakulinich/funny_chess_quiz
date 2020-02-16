export const createArrWithValues = (val, len) => Array(len).fill(val);

export const compareArraysOfStrings = (targetArr, comparedArr) =>
  targetArr.toString() === comparedArr.toString();

export const compareMultiArraysOfStrings = (targetArr, comparedArr) =>
  targetArr.every((el, idx) => compareArraysOfStrings(el, comparedArr[idx]));
