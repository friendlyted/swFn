# swFrontend

Library for calling service worker staff as async functions.

## Usage

In your page you include:

```javascript
import {swFrontend} from "https://friendlyted.github.io/swFrontend/swFrontend.js";

// ...
async function yourCallerFunction(...args) {
    //...
    const your_payload = await swFrontend("_YOUR_FUNCTION_CODE_HERE_", ...args);
    //...
}

// ...
```

In your worker you do:

```javascript
self.importScripts("https://friendlyted.github.io/swFrontend/SwBack.js"); // this will create a global variable SERVICE_WORKER_FUNCTIONS 
// ...
SERVICE_WORKER_FUNCTIONS.set("_YOUR_FUNCTION_CODE_HERE_", (...args) => {
    // do staff here
    return your_payload;
});
// ...
```

## Example

https://friendlyted.github.io/swFn/showcase/

## Other

Service worker with `{type: "module"}` doesn't work properly in IDEA internal preview server (http status 404).
