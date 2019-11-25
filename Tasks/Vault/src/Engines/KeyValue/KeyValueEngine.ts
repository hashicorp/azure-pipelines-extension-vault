const url = require("url");

import { VaultClient } from '../../VaultClient'
import { KeyValueGetResponse } from "./KeyValueGetResponse"
import { KeyValuePutRequest } from "./KeyValuePutRequest"
import { KeyValuePutResponse } from "./KeyValuePutResponse"
import { KeyValueReadResponse } from "./KeyValueReadResponse"

/**
 * A Key-value engine API Accessor
 */
export class KeyValueEngine {
    constructor(private client : VaultClient) {

    }

    /**
     * Gets data at a Vault KeyValue V2 path
     * 
     * @param path The path to write to
     */
    public async get(path : string) : Promise<KeyValueGetResponse> {
        var response = await this.client.get<KeyValueGetResponse>(path);
        return response.data;
    }

    /**
     * Puts data at a Vault KeyValue V2 path
     * 
     * @param path The path to write to
     * @param data The data to be written
     * @param cas Check-and-set value
     */
    public async put(
        path : string,
        data: { [key: string]: string; },
        cas : Number | undefined = undefined
    ) : Promise<KeyValuePutResponse> {
        let request = new KeyValuePutRequest(data, cas);
        let response = await this.client.post<KeyValuePutResponse>(path, request);

        return response.data;
    }

    /**
     * Reads data at a Vault KeyValue V1 path
     * 
     * @param path The Vault path to write to
     */
    public async read(path : string) : Promise<KeyValueReadResponse> {
        let response = await this.client.get<KeyValueReadResponse>(path);

        return response.data;
    }

    /**
     * Writes data to a Vault  KeyValue V1 path
     * 
     * @param path The Vault path to write to
     * @param data The data to write
     */
    public async write(
        path : string,
        data: { [key: string]: string; }
    ) {
        // write apparently does not have a response other than errors
        await this.client.post(path, data);
    }
}