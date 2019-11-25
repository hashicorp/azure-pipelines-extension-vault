import { VaultAuthenticationResponse } from "../VaultAuthenticationResponse";

/**
 * A Vault GitHub Authentication Response
 */
export class GitHubAuthenticationResponse {
    public lease_id! : string;
    public renewable! : boolean;
    public lease_duration! : Number;
    public auth! : VaultAuthenticationResponse;
}
