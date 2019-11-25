export class KeyValuePutRequest {
    public data: { [key: string]: string; };
    public options: KeyValuePutRequestOptions

    constructor(data: { [key: string]: string; }, cas : Number | undefined = undefined) {
        this.data = data;
        this.options = new KeyValuePutRequestOptions(cas);
    }
}

export class KeyValuePutRequestOptions {
    public cas : Number | undefined;

    constructor(cas : Number | undefined = undefined) {
        this.cas = cas;
    }
}
