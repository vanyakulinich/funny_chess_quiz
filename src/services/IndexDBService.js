export class IndexDBService {
  constructor() {
    this.dbName = 'db'
    this.dbVersion = 1

    const { indexDB, indexDBTransaction } = this._getDB()
    this.indexDB = indexDB
    this.indexDBTransaction = indexDBTransaction
    this.storageName = null
    this.activeConnection = null
  }

  _getDB() {
    const indexDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    const indexDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
    return { indexDB, indexDBTransaction }
  }

  _openDBConnection(storageName, callbacks) {
    const openRequest = this.indexDB.open(this.dbName, this.dbVersion)

    openRequest.onupgradeneeded = function(event) {
      let db = event.target.result
      if (!db.objectStoreNames.contains(storageName)) {
        db.createObjectStore(storageName, { keyPath: 'id' })
      }
    }
    openRequest.onerror = function(err) {
      // TODO
      console.log({ err })
    }
    openRequest.onsuccess = event => {
      // TODO
      this.activeConnection = event.target.result
      console.log('CONNECTED', this.activeConnection)
      //   TESTS
      this.getDataFromDB()
    }
  }

  connect(storageName, callbacks) {
    this.storageName = storageName
    this._openDBConnection(storageName, callbacks)
    return this
  }

  getDataFromDB(key) {
    const transaction = this.activeConnection.transaction([this.storageName], 'readonly')
    const objectStore = transaction.objectStore(this.storageName)
    // const request = objectStore.get(key)
    // TODO: unfinished
    console.log({ objectStore })
  }

  storeDataInDB(key, data) {}

  updateDataInDB(key, data) {}

  deleteDataFromDB(key) {}

  deleteCurrentDB() {}
}
