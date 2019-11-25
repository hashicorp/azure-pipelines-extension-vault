import { injectable } from "inversify";
import { VaultAuthentication } from './VaultAuthentication'

/**
 * An authentication provider for Vault
 */
@injectable()
export abstract class VaultAuthenticationProvider {
    /**
     * Authenticates with the Vault API
     * 
     * @returns Data needed to interact with vault in subsequent requests
     */
    abstract authenticate() : Promise<VaultAuthentication>;
}