import {SwBackend} from "../swBackend.js";
import Codes from "./codes.js";

function syncOk() {
    return "sync ok";
}

function syncError() {
    throw new Error("sync error");
}

async function asyncOk() {
    return "async ok";
}

async function asyncError() {
    throw new Error("async error");
}

new SwBackend(self)
    .attach()
    .add(Codes.TEST_SYNC_OK, syncOk)
    .add(Codes.TEST_SYNC_ERROR, syncError)
    .add(Codes.TEST_ASYNC_OK, asyncOk)
    .add(Codes.TEST_ASYNC_ERROR, asyncError);

