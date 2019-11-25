import { VaultAuthenticationResponse } from "../VaultAuthenticationResponse";

/**
 * A Vault Userpass Authentication Response
 */
export class UserpassAuthenticationResponse {
    public lease_id! : string;
    public renewable! : boolean;
    public lease_duration!: Number;
    public auth!  : VaultAuthenticationResponse;
}
