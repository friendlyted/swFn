# swFn

Library for calling service worker staff as async function.

## Usage

In your page you include:
```javascript
import {swFn} from "https://friendlyted.github.io/swFn/swFn.js";
// ...
async function yourCallerFunction(...args){
    //...
    const your_payload = await swFn("_YOUR_FUNCTION_CODE_HERE_", ...args);
    //...
}
// ...
```

In your worker you do:
```javascript
self.importScripts("https://friendlyted.github.io/swFn/sw.js"); // this will crate a global variable SERVICE_WORKER_FUNCTIONS 
// ...
SERVICE_WORKER_FUNCTIONS.set("_YOUR_FUNCTION_CODE_HERE_", (...args) => {
    // do staff here
    return your_payload;
});
// ...
```

## Example

https://friendlyted.github.io/swFn/showcase/
