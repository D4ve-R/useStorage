# useStorage
Simple wrapper for the [StorageAPI](https://developer.mozilla.org/en-US/docs/Web/API/Storage),  handles variable types and access through dynamic properties.
 
## Usage
```javascript
import store, { setItem, getItem } from '@d4ve-r/useStorage';

let val = 1;
setItem('key', val)
// equivalent to 
store.set('key', val);

// once the key is set, variable can be accessed through props
store.key = val;

// get item
let val = getItem('key');
// equivalent to
val = store.get('key'); 
val = store.key;

// delete all 
store.clear();
```
