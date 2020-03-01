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

  _openDBConnection(storageName) {
    const service = this
    return new Promise((resolve, reject) => {
      const openDB = this.indexDB.open(service.dbName, service.dbVersion)
      if (!openDB) reject({ isError: true })
      openDB.onupgradeneeded = function(event) {
        let db = event.target.result
        if (!db.objectStoreNames.contains(storageName)) {
          db.createObjectStore(storageName, { autoIncrement: true })
        }
      }
      openDB.onerror = function(err) {
        reject({ isError: true })
      }
      openDB.onsuccess = event => {
        this.activeConnection = event.target.result
        resolve({ isError: false })
      }
    })
  }

  async connect(storageName) {
    this.storageName = storageName
    const response = await this._openDBConnection(storageName)
    return response.isError ? response : this
  }

  async getDBStore(storageName, actionType) {
    try {
      const transaction = await this.activeConnection.transaction([storageName], actionType)
      const store = await transaction.objectStore(storageName)
      return { store }
    } catch (err) {
      return { isError: true }
    }
  }

  async getDataFromDB(key = null) {
    const { store } = await this.getDBStore(this.storageName, 'readonly')
    return new Promise((resolve, reject) => {
      const firstIdx = 1
      if (!store) reject({ isError: true })
      const dbResponse = !key ? store.get(firstIdx) : store.get(key)
      dbResponse.onsuccess = e => resolve(e.target.result)
      dbResponse.onerror = e => reject({ isError: true })
    }).catch(er => er)
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
}
