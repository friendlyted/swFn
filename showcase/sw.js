self.importScripts("https://friendlyted.github.io/swFn/sw.js");

SERVICE_WORKER_FUNCTIONS.set("TEST_SYNC_OK", () => {
    return "sync ok";
});

SERVICE_WORKER_FUNCTIONS.set("TEST_SYNC_ERROR", () => {
    throw new Error("sync error");
});

SERVICE_WORKER_FUNCTIONS.set("TEST_ASYNC_OK", async () => {
    return "async ok";
});

SERVICE_WORKER_FUNCTIONS.set("TEST_ASYNC_ERROR", async () => {
    throw new Error("async error");
});