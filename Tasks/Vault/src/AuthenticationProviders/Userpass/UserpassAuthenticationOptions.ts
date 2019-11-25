import { injectable } from "inversify";
import { 
    endpointAuthorizationParameter,
} from "../../Options";

@injectable()
export class UserpassAuthenticationOptions {
    @endpointAuthorizationParameter("vaultServiceConnectionName", "username")
    public username : string = ""; 

    @endpointAuthorizationParameter("vaultServiceConnectionName", "password")
    public password : string = ""; 
}