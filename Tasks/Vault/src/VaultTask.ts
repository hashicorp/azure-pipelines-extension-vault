import path = require("path");
import fs = require("fs");
import os = require("os");
import task = require('azure-pipelines-task-lib/task');

import { injectable } from "inversify";
import { VaultClient } from "./VaultClient";
import { TaskOptions } from './TaskOptions';
import { KeyValueReadResponse } from "./Engines/KeyValue/KeyValueReadResponse"
import { KeyValueGetResponse } from "./Engines/KeyValue/KeyValueGetResponse"

@injectable()
export class VaultTask {

    constructor(
        private vault : VaultClient,
        private options: TaskOptions)
    {
        
    }

    public async run() {
        await this.vault.initialize();
        let data : { [key: string]: string; };

        switch(this.options.command) {
            case 'kvGet':
                let kvGetResponse : KeyValueGetResponse = await this.vault.keyValue.get(this.options.path);
                //todo: add prefix
                this.setResultVariables(kvGetResponse.data.data, this.options.path);
                break;
            case 'kvPut':
                data = JSON.parse(this.options.data);
                await this.vault.keyValue.put(this.options.path, data)
                break;
            case 'read':
                let readResponse : KeyValueReadResponse = await this.vault.keyValue.read(this.options.path);
                //todo: add prefix
                this.setResultVariables(readResponse.data, this.options.path);
                break;
            case 'write':
                data = JSON.parse(this.options.data);
                await this.vault.keyValue.write(this.options.path, data)
                break;
            default:
                throw new Error("Invalid command");
        }
    }

    /**
     * Sets all key/value pairs in data as environment variables
     * 
     * Note: all / values will be replaced with underscores
     * 
     * @param data The data to set
     * @param prefix A prefix string to invlude on all environment variable names
     */
    private setResultVariables(data: { [key: string]: string; }, prefix = "") {
        // Strip trailing slash
        prefix = prefix.replace(/\/+$/, "");
        prefix = prefix.split('/').join('_');
        prefix = prefix.toUpperCase();

        if (prefix != "") {
            prefix = prefix + "_";
        }

        for(let key in data) {
            let value = data[key];
            let safekey = key.toUpperCase();
            task.setVariable(prefix + safekey, value, true);
        }
    }
}