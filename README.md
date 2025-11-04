# swFrontend

Library for calling service worker staff as async functions.

## Usage

In your page you include:

```javascript
import {swFrontend} from "https://friendlyted.github.io/swFn/swFrontend.js";

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
import {SwBackend} from "https://friendlyted.github.io/swFn/swBackend.js"; 
// ...
function yourFunction(...args) {
    // do staff here
    return your_payload;
}
// ...
new SwBackend(self)
    .attach()
    .add("_YOUR_FUNCTION_CODE_HERE_", yourFunction);
// ...
```

## Example

https://friendlyted.github.io/swFn/showcase/

## Other

Service worker with `{type: "module"}` doesn't work properly in IDEA internal preview server (http status 404).
