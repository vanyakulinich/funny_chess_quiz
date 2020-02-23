export const DEFAULT_WIN_RECORD = 20
export const ERROR_RESET_TIME = 6000 // 6sec

export const HORSES = {
  black: 'black',
  white: 'white',
  noHorse: '',
}

const { black, white, noHorse } = HORSES

export const START_GAME_POSITIONS = Object.freeze([
  [white, white, white],
  [noHorse, noHorse, noHorse],
  [noHorse, noHorse, noHorse],
  [black, black, black],
])

export const WIN_GAME_POSITIONS = Object.freeze([
  [black, black, black],
  [noHorse, noHorse, noHorse],
  [noHorse, noHorse, noHorse],
  [white, white, white],
])

// prettier-ignore
export const AVALIABLE_MOVES_MAP = Object.freeze({
  // each position key is str sum of row and cell positions
  // each position key value is array of positions [[row, col],..]
  "00": [[1, 2], [2, 1]],
  "01": [[2, 0], [2, 2]],
  "02": [[1, 0], [2, 1]],
  "10": [[0, 2], [2, 2], [3, 1]],
  "11": [[3,0], [3,2]],
  "12": [[0,0], [2,0], [3,1]],
  "20": [[0,1], [1,2], [3,2]],
  "21": [[0,0], [0,2]],
  "22": [[0,1], [1,0], [3,0]],
  "30": [[1,1], [2,2]],
  "31": [[1,0], [1,2]],
  "32": [[2,0], [1,1]]
});

export const MESSAGES = {
  saveSuccess: 'The game was succesfully saved',
  loadSuccess: 'The game was succesfully loaded',
}
