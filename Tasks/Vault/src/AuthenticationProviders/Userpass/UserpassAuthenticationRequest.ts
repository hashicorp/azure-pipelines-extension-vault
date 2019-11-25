/**
 * A Vault Userpass Authentication Request
 */
export class UserpassAuthenticationRequest {
    /**
     * Creates a new Userpass Authentication Request
     * 
     * @param password Password
     */
    constructor(public password: string) {

    }
}