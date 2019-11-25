/**
 * A Vault GitHub Authentication Request
 */
export class GitHubAuthenticationRequest {
    /**
     * Creates a new GitHub Authentication Request
     * 
     * @param token GitHub Personal Access Token
     */
    constructor(public token : string) {

    }
}