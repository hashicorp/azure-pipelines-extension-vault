import { injectable } from "inversify";
import { VaultAuthenticationProvider } from "../VaultAuthenticationProvider";
import { GitHubAuthenticationOptions } from "./GitHubAuthenticationOptions";
import { RestClient } from 'typed-rest-client/RestClient'
import { GitHubAuthenticationResponse } from "./GitHubAuthenticationResponse";
import { GitHubAuthenticationRequest } from "./GitHubAuthenticationRequest";
import { VaultAuthentication } from "../VaultAuthentication";
import { VaultAuthenticationClient } from '../../VaultAuthenticationClient'

/**
 * GitHub authentication provider for Vault
 */
@injectable()
export class GitHubAuthenticationProvider extends VaultAuthenticationProvider {

    constructor(private options : GitHubAuthenticationOptions, private client : VaultAuthenticationClient) {
        super();
    }

    /**
     * Loads the ARM connected service information into the environment
     */
    public async authenticate() : Promise<VaultAuthentication> {
        let request = new GitHubAuthenticationRequest(this.options.personalAccessToken);
        let response = await this.client.http.create<GitHubAuthenticationResponse>('auth/github/login', request);
        
        if (response.statusCode >= 400 || !response.result) {
            throw new Error(`GitHub authentication error ${response.statusCode} - ${response.result}`)
        }

        let authentication = new VaultAuthentication(response.result.auth.client_token);

        return authentication;
    }
}

