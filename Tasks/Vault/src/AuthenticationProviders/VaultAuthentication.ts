/**
 * Authentication details needed to communicate with Vault
 */
export class VaultAuthentication {
    public clientToken : string;

    constructor(clientToken : string) {
        this.clientToken = clientToken;
    }
}