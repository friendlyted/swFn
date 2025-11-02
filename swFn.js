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

        navigator.serviceWorker.getRegistration().then(worker=>
            worker.active.postMessage({id, type, args})
        )
    })
}

