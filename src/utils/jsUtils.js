export const createArrWithValues = (val, len) => Array(len).fill(val)

export const compareArraysOfStrings = (targetArr, comparedArr) => targetArr.toString() === comparedArr.toString()

export const compareMultiArraysOfStrings = (targetArr, comparedArr) => {
  return targetArr.every((el, idx) => compareArraysOfStrings(el, comparedArr[idx]))
}

export const deepCopyArray = targetArr => {
  let copiedArr = []
  for (const element of targetArr) {
    copiedArr = [...copiedArr, Array.isArray(element) ? deepCopyArray(element) : element]
  }
  return copiedArr
}

export const delay = (fn, time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      fn()
      resolve()
    }, time)
  })
}
