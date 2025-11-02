const SERVICE_WORKER_FUNCTIONS = new Map();

function responseException(source, id, type, ex) {
    source.postMessage({
        id,
        type,
        exception: true,
        name: ex.name,
        message: ex.message,
        stack: ex.stack
    });
}

self.onmessage = (event) => {
    const data = event.data;
    const type = data.type;
    const id = data.id;

    if (!SERVICE_WORKER_FUNCTIONS.has(type)) {
        const error = new Error(`There is no worker function for type ${type}`)
        responseException(event.source, id, type, error)
    } else {
        const targetFn = SERVICE_WORKER_FUNCTIONS.get(type);
        let result;
        try {
            result = targetFn(...data.args);
        } catch (ex) {
            responseException(event.source, id, type, ex);
            return;
        }

        if (result instanceof Promise) {
            result
                .then(r => event.source.postMessage({id, type, result: r}))
                .catch(ex => responseException(event.source, id, type, ex));
        } else {
            event.source.postMessage({id, type, result});
        }
    }
}