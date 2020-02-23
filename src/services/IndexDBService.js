export class IndexDBService {
  constructor() {
    this.dbName = 'db'
    this.dbVersion = 1

    this.indexDB = this._getDB()
    this.storageName = null
    this.activeConnection = null
  }

  _getDB() {
    const indexDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    return indexDB
  }

  async _openDBConnection(callbacks) {
    const openDB = this.indexDB.open(this.dbName, this.dbVersion)
    openDB.onupgradeneeded = function(event) {
      let db = event.target.result
      if (!db.objectStoreNames.contains(this.storageName)) {
        db.createObjectStore(this.storageName, { autoIncrement: true })
      }
    }
    openDB.onerror = function(err) {
      console.log({ err })
    }
    openDB.onsuccess = event => {
      this.activeConnection = event.target.result
    }
  }

  connect(storageName, callbacks) {
    this.storageName = storageName
    this._openDBConnection(storageName, callbacks)
    return this
  }

  async getDBStore(storageName, actionType) {
    try {
      const transaction = await this.activeConnection.transaction([storageName], actionType)
      const store = await transaction.objectStore(storageName)
      return { store }
    } catch (err) {
      return null
    }
  }

  async getDataFromDB(key = null) {
    const { store } = await this.getDBStore(this.storageName, 'readonly')
    let returnData = new Promise((resolve, reject) => {
      const firstIdx = 1
      const dbResponse = !key ? store.get(firstIdx) : store.get(key)
      dbResponse.onsuccess = e => {
        returnData = e.target.result
        resolve(returnData)
      }
      dbResponse.onerror = e => reject()
    })
    try {
      return await returnData
    } catch (er) {
      throw Error()
    }
  }

  async storeDataInDB(data, isAddNew = false) {
    const { store } = await this.getDBStore(this.storageName, 'readwrite')
    try {
      if (!store) throw new Error()
      const firstIdx = 1
      if (isAddNew) {
        await store.put(data)
      } else {
        await store.put(data, firstIdx)
      }
      return true
    } catch (err) {
      throw new Error()
    }
  }

  // another methods to interact with db can be added, e.g. deleteDB, deleteFromDB and so on..
}
