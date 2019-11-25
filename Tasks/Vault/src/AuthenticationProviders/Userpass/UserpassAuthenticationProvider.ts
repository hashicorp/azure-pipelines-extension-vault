import { injectable } from "inversify";
import { VaultAuthenticationProvider } from "../VaultAuthenticationProvider";
import { UserpassAuthenticationOptions } from "./UserpassAuthenticationOptions";
import { VaultAuthentication } from "../VaultAuthentication";
import { VaultAuthenticationClient} from "../../VaultAuthenticationClient"
import { UserpassAuthenticationRequest } from "./UserpassAuthenticationRequest"
import { UserpassAuthenticationResponse } from "./UserpassAuthenticationResponse"

/**
 * Token authentication provider for Vault
 */
@injectable()
export class UserpassAuthenticationProvider extends VaultAuthenticationProvider {

    constructor(private options : UserpassAuthenticationOptions, private client : VaultAuthenticationClient) {
        super();
    }

    /**
     * Loads the ARM connected service information into the environment
     */
    public async authenticate() : Promise<VaultAuthentication> {
        let request = new UserpassAuthenticationRequest(this.options.password);
        let response = await this.client.http.create<UserpassAuthenticationResponse>(
            "auth/userpass/login/" + this.options.username,
            request
        );

        if (response.statusCode >= 400 || !response.result) {
            throw new Error(`Userpass authentication error ${response.statusCode} - ${response.result}`)
        }

        return new VaultAuthentication(response.result.auth.client_token);
    }
}
