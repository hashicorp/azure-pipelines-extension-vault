import { injectable } from "inversify";
import {
    endpointAuthorizationParameter,
} from "../../Options";

@injectable()
export class TokenAuthenticationOptions {
    @endpointAuthorizationParameter("vaultServiceConnectionName", "apitoken")
    public token : string = ""; 
}