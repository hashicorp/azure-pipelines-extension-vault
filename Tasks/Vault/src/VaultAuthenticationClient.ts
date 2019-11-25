import { RestClient } from 'typed-rest-client/RestClient'
import { TaskOptions } from './TaskOptions'
import { injectable } from 'inversify'

const url = require('url');

@injectable()
export class VaultAuthenticationClient {
    private _http! : RestClient;

    public get http() : RestClient {
        if (this._http) {
            return this._http;
        }

        this._http = new RestClient("azure-pipelines-vault-extension", url.resolve(this.taskOptions.baseUrl, "v1"));
        return this._http;
    }
    
    constructor(private taskOptions : TaskOptions) {
       
    }
}

