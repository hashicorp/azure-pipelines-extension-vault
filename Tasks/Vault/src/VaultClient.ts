import { injectable } from 'inversify';
import axios, { AxiosError } from 'axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TaskOptions } from './TaskOptions'
import { VaultAuthenticationProvider } from './AuthenticationProviders/VaultAuthenticationProvider'
import { VaultAuthentication } from './AuthenticationProviders/VaultAuthentication';
import { KeyValueEngine } from './Engines/KeyValue/KeyValueEngine';
import { VaultApiError } from './VaultApiError';
import { VaultApiResponse } from './VaultAPIResponse';

const url = require('url');

@injectable()
export class VaultClient {
    private client! : AxiosInstance;
    private _keyValue! : KeyValueEngine;

    public get keyValue() : KeyValueEngine {
        if (this._keyValue) {
            return this._keyValue;
        }

        if (!this.client) {
            throw new Error('Valut Client not initialized');
        }

        this._keyValue = new KeyValueEngine(this);
        return this._keyValue;
    }

    constructor(private options : TaskOptions, private authenticationProvider : VaultAuthenticationProvider) {
       
    }

    /**
     * Authenticates and initializes the client
     */
    public async initialize() {
        let apiUrl : string = url.resolve(this.options.baseUrl, 'v1');

        let auth = await this.authenticationProvider.authenticate();

        this.client = axios.create({
            baseURL: apiUrl,
            headers: { 'Authorization': 'Bearer ' + auth.clientToken }
        } as AxiosRequestConfig);
    }

    /**
     * Issues an HTTP GET request to the Vault API
     * 
     * @param path The relative URL to call
     */
    public async get<T>(path : string) : Promise<VaultApiResponse<T>> {
        try {
            return await this.client.get<T>(path) as VaultApiResponse<T> ;
        } catch(error) {
            throw this.createApiError(path, error);
        }
    }

    /**
     * Issues an HTTP PUT request to the Vault API
     * 
     * @param path The relative URL to call
     * @param data The data  to serialize to JSON and send
     */
    public async put<T>(path : string, data : any) : Promise<VaultApiResponse<T>> {
        try {
            return await this.client.put<T>(path, data) as VaultApiResponse<T>;
        } catch(error) {
            throw this.createApiError(path, error);
        }
    }

    /**
     * Issues an HTTP PATCH request to the Vault API
     * 
     * @param path The relative URL to call
     * @param data The data  to serialize to JSON and send
     */
    public async patch<T>(path : string, data : any) : Promise<VaultApiResponse<T>> {
        try {
            return await this.client.patch<T>(path, data) as VaultApiResponse<T>;
        } catch(error) {
            throw this.createApiError(path, error);
        }
    }

    /**
     * Issues an HTTP POST request to the Vault API
     * 
     * @param path The relative URL to call
     * @param data The data  to serialize to JSON and send
     */
    public async post<T>(path : string, data : any) : Promise<VaultApiResponse<T>> {
        try {
            return await this.client.post<T>(path, data) as VaultApiResponse<T>;
        } catch(error) {
            throw this.createApiError(path, error);
        }
    }

    /**
     * Issues an HTTP DELETE request to the Vault API
     * 
     * @param path The relative URL to call
     * @param data The data  to serialize to JSON and send
     */
    public async delete<T>(path : string) : Promise<VaultApiResponse<T>> {
        try {
            return await this.client.delete<T>(path) as VaultApiResponse<T>;
        } catch(error) {
            throw this.createApiError(path, error);
        }
    }

    /**
     * Issues an HTTP HEAD request to the Vault API
     * 
     * @param path The relative URL to call
     * @param data The data  to serialize to JSON and send
     */
    public async head<T>(path : string) : Promise<VaultApiResponse<T>> {
        try {
            return await this.client.head<T>(path) as VaultApiResponse<T>;
        } catch(error) {
            throw this.createApiError(path, error);
        }
    }

    // Creates an apporpriate Error or ValutApiError instance given the inputs
    private createApiError(url : string, error : any) : Error {
        let axiosError = error as AxiosError;
        return new VaultApiError(url, axiosError.code, axiosError.message);
    }
}

