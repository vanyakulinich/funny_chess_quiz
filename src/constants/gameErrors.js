export const ERRORS_NAMES = {
  connect: 'connectionFail',
  save: 'saveFail',
  load: 'loadFail',
}

export const ERROR_MESSAGES = {
  [ERRORS_NAMES.connect]: "Error occured when connecting to database. Sorry, but you can't load and save games",
  [ERRORS_NAMES.save]: 'Error occured when saving the game. Please try again later',
  [ERRORS_NAMES.load]: 'Error occured when loading the game. Please try again later',
}
