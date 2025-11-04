export class SwBackend {
    #functions;
    #worker;

    constructor(worker, functions = new Map()) {
        this.#worker = worker;
        this.#functions = functions;
    }

    add(code, fn) {
        this.#functions.set(code, fn);
        return this;
    }

    attach() {
        self.addEventListener(
            "message",
            (event) => this.onMessage(event)
        );
        return this;
    }

    onMessage(event) {
        const data = event.data;
        const type = data.type;
        const id = data.id;

        if (!this.#functions.has(type)) {
            const error = new Error(`There is no worker function for type ${type}`)
            SwBackend.responseException(event.source, id, type, error)
        } else {
            const targetFn = this.#functions.get(type);
            let result;
            try {
                result = targetFn(...data.args);
            } catch (ex) {
                SwBackend.responseException(event.source, id, type, ex);
                return;
            }

            if (result instanceof Promise) {
                result
                    .then(r => event.source.postMessage({id, type, result: r}))
                    .catch(ex => SwBackend.responseException(event.source, id, type, ex));
            } else {
                event.source.postMessage({id, type, result});
            }
        }
    }

    static responseException(source, id, type, ex) {
        source.postMessage({
            id,
            type,
            exception: true,
            name: ex.name,
            message: ex.message,
            stack: ex.stack
        });
    }
}



