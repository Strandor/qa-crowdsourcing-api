import * as redis from "redis";
import * as utils from "util";

const client = redis.createClient();

client.on("error", (error) => {
    console.error("REDIS ERROR", error.message);
});

const _get = utils.promisify(client.get).bind(client);
const _set = utils.promisify(client.set).bind(client);
const _setTTL = utils.promisify(client.setex).bind(client);

export const set = async <T>(key: string, value: T) => {
    await _set(key, JSON.stringify(value));
}

export const setTTL = async <T>(key: string, value: T, seconds: number) => {
    await _setTTL(key, JSON.stringify(value), seconds);
}

export const get = async <T>(key: string): Promise<T> => {
    return await JSON.parse(_get(key));
}