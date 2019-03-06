import utils from './misc'
class Storage {
    constructor(storage) {
        this.storage = storage
    }

    put(key, value) {
        !utils.isEmpty(value) && this.storage.setItem(key, value)
    }

    putObject(key, value) {
        if (!utils.isEmpty(value) || typeof value !== 'object') return
        value = JSON.stringify(key, value)
        this.storage.setItem(key, value)
    }

    get(key) {
        return this.storage.getItem(key)
    }

    getObject(key) {
        let value = this.storage.getItem(key)
        if (value === null) return value
        try {
            value = JSON.parse(value)
        } catch (e) {
            console.error(e)
        }
        return value
    }

    remove(key) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }
}

let defaultStorage = window.localStorage

export default {

    SESSION_STORAGE: window.sessionStorage,

    LOCAL_STORAGE: window.localStorage,

    setDefaultStorage(storage) {
        defaultStorage = storage
    },

    getDefaultStorage() {
        return new Storage(defaultStorage)
    },

    getLocalStorage() {
        return new Storage(window.localStorage)
    },

    getSessionStorage() {
        return new Storage(window.sessionStorage)
    }
}
