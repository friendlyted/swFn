import {swFrontend} from "https://friendlyted.github.io/swFn/swFrontend.js";
import Codes from "./codes.js";

await navigator.serviceWorker.register("./back.js", {type: "module"});

async function testSyncOk() {
    const result = await swFrontend(Codes.TEST_SYNC_OK);
    console.assert(result === "sync ok", "testSyncOk FAILED");
    console.log("TEST_SYNC_OK done")
}

async function testSyncError() {
    try {
        const result = await swFrontend(Codes.TEST_SYNC_ERROR);
        console.assert(false, "testSyncError FAILED");
    } catch (ex) {
        console.assert(ex.message === "sync error", "testSyncError FAILED");
    }
    console.log("TEST_SYNC_ERROR done")
}

async function testAsyncOk() {
    const result = await swFrontend(Codes.TEST_ASYNC_OK);
    console.assert(result === "async ok", "testAsyncOk FAILED");
    console.log("TEST_ASYNC_OK done")
}

async function testAsyncError() {
    try {
        const result = await swFrontend(Codes.TEST_ASYNC_ERROR);
        console.assert(false, "testAsyncError FAILED");
    } catch (ex) {
        console.assert(ex.message === "async error", "testAsyncError FAILED");
    }
    console.log("TEST_ASYNC_ERROR done")
}

await testSyncOk();
await testSyncError();
await testAsyncOk();
await testAsyncError();