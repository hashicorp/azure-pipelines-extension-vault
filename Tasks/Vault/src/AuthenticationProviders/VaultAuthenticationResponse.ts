/**
 * Standardized `auth` object returned in response from a Vault login request
 */
export class VaultAuthenticationResponse {
    public client_token! : string;
    public accessor! : string;

    // Docs show both of these --- why two??
    public policies! : Array<string>;
    public token_policies! : Array<string>;
}