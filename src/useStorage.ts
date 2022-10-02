export interface StoreObject {
    [key: string]: string | number | boolean | StoreObject | StoreArray;
}

export interface StoreArray {
    [index: number]: string | number | boolean | StoreObject | StoreArray;
}

/**
 * Get item with key from localStorage.
 *
 * @param {string} key - key of the item
 * @returns {(null|string|number|boolean|Array|Object)} typecasted object from localStorage or null
 */
export function getItem(key: string) {
    let value = window.localStorage.getItem(key);
    if (value == null) {
        console.warn(`${key} not found in localStorage`);
        return value;
    }
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(+value)) return +value;

    try {
        const val = JSON.parse(value);
        value = val;
    } catch (error) {}
        
    return value;
}

/**
 * Set item with key in localStorage.
 *
 * @param {string} key - key of the item
 * @param {(string|number|boolean|Array|Object)} value - value to write to localStorage
 * @throws {TypeError}
 *
 * @returns {void}
 */
export function setItem(key: string, value: string | number | boolean | StoreArray | StoreObject) {
    let val: any = '';

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        val = value;
    } else {
        val = JSON.stringify(value);
    }

    window.localStorage.setItem(key, val);
}

/**
 * Set item in localStorage and handle dynamic properties of parent object.
 *
 * @param {string} key - key of the item
 * @param {(string|number|boolean|Array|Object)} value - value to write to localStorage,
 * if value is of type Array or Object, it must be json serializable
 *
 * @returns {void}
 */
function _setItem(key: string, value: string | number | boolean | StoreArray | StoreObject) {
    'use strict';

    setItem(key, value);

    if (!this.hasOwnProperty(key))
        Object.defineProperty(this, key, {
            get: () => getItem(key),
            set: (val) => setItem(key, val),
            enumerable: true,
            configurable: true,
        });
}

/**
 * Delete all handled items from localStorage and Object.properties
 *
 * @returns {void}
 */
function _clear() {
    'use strict';

    for (const key in this) {
        if (key === 'get' || key === 'set' || key === 'remove' || key === 'clear' || key === 'clearAll') continue;

        delete this[key];
        window.localStorage.removeItem(key);
    }
}

/**
 * wrapper for localStorage
 */
export default {
    set: _setItem,
    get: getItem,
    remove: window.localStorage.removeItem,
    clear: _clear,
    clearAll: window.localStorage.clear,
};
