/**
 * A Generic Vault Api HTTP Response
 */
export interface VaultApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
}