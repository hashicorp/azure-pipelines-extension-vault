import { injectable } from "inversify";
import { VaultAuthenticationProvider } from "../VaultAuthenticationProvider";
import { TokenAuthenticationOptions } from "./TokenAuthenticationOptions";
import { RestClient } from 'typed-rest-client/RestClient'
import { VaultAuthentication } from "../VaultAuthentication";

/**
 * Token authentication provider for Vault
 */
@injectable()
export class TokenAuthenticationProvider extends VaultAuthenticationProvider {

    constructor(private options : TokenAuthenticationOptions) {
        super();
    }

    /**
     * Loads the ARM connected service information into the environment
     */
    public async authenticate() : Promise<VaultAuthentication> {
        return new VaultAuthentication(this.options.token);
    }
}
