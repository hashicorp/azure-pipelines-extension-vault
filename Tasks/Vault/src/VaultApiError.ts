
/**
 * Represents an Error thrown by the Vault API
 */
export class VaultApiError extends Error {
    constructor(url : string, code: string | undefined, message: string) {
        super(`Vault API Exception: Status Code: ${code} URL: ${url} \n ${message}`)
    }
}