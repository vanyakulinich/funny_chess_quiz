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

  _openDBConnection() {
    try {
      const openDB = this.indexDB.open(this.dbName, this.dbVersion)
      if (!openDB) throw new Error()
      openDB.onupgradeneeded = function(event) {
        let db = event.target.result
        if (!db.objectStoreNames.contains(this.storageName)) {
          db.createObjectStore(this.storageName, { autoIncrement: true })
        }
      }
      openDB.onerror = function(err) {
        throw new Error()
      }
      openDB.onsuccess = event => {
        this.activeConnection = event.target.result
      }
      return {}
    } catch (err) {
      return { isError: true }
    }
  }

  connect(storageName) {
    this.storageName = storageName
    const response = this._openDBConnection()
    return response.error ? response : this
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
      return { isError: true }
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
      return { isError: true }
    }
  }

  // another methods to interact with db can be added, e.g. deleteDB, deleteFromDB and so on..
}
