const worker = await navigator.serviceWorker.register("./sw.js", {scope: "/swFn/"});

export async function swFn(type, ...args) {
    return new Promise((ok, err) => {
        const id = Math.random().toString(36).substring(2);

        navigator.serviceWorker.addEventListener("message", (event) => {
            const data = event.data;
            if (data.type !== type) return;
            if (data.id !== id) return;

            if (data.exception === true) {
                const restoredError = new Error(data.message);
                restoredError.name = data.name;
                try {
                    restoredError.stack = data.stack;
                } catch (ex) {
                    console.log("Cannot write stack field in exception. Stack was: ");
                    console.error(data.stack);
                }
                err(restoredError);
            } else {
                ok(data.result);
            }
        })
        worker.active.postMessage({id, type, args})
    })
}


export async function testSyncOk() {
    const result = await swFn("TEST_SYNC_OK");
    console.assert(result === "sync ok", "testSyncOk FAILED");
    console.log("TEST_SYNC_OK done")
}

export async function testSyncError() {
    try {
        const result = await swFn("TEST_SYNC_ERROR");
        console.assert(false, "testSyncError FAILED");
    } catch (ex) {
        console.assert(ex.message === "sync error", "testSyncError FAILED");
    }
    console.log("TEST_SYNC_ERROR done")
}

export async function testAsyncOk() {
    const result = await swFn("TEST_ASYNC_OK");
    console.assert(result === "async ok", "testAsyncOk FAILED");
    console.log("TEST_ASYNC_OK done")
}

export async function testAsyncError() {
    try {
        const result = await swFn("TEST_ASYNC_ERROR");
        console.assert(false, "testAsyncError FAILED");
    } catch (ex) {
        console.assert(ex.message === "async error", "testAsyncError FAILED");
    }
    console.log("TEST_ASYNC_ERROR done")
}
