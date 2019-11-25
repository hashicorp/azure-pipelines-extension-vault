import task = require('azure-pipelines-task-lib/task');
import { injectable } from "inversify";
import {
    endpointAuthorizationScheme,
    endpointDataParameter,
    taskVariable,
    endpointUrl
} from "./Options"

/**
 * Strong-type accessor for Task configuration
 */
@injectable()
export class TaskOptions {

    // Basic
    readonly command : string = "";
    readonly path : string = "";
    readonly data : string = "";
    readonly prefix : string = "";
    
    @endpointUrl("vaultServiceConnectionName")
    public baseUrl : string = "";

    @endpointAuthorizationScheme("vaultServiceConnectionName")
    public authMethod : string = "";

    @endpointDataParameter("vaultServiceConnectionName", "vaultTLSVerify")
    public tlsVerify : string = ""; 

    @taskVariable("Agent.TempDirectory")
    readonly tempDir : string | undefined;
}