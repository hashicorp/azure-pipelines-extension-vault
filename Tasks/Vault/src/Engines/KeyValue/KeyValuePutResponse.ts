export class KeyValuePutResponse {
    public data! : KeyValuePutResponseData;
}

export class KeyValuePutResponseData {
    public created_time! : string;
    public deletion_time! : string;
    public destroyed! : boolean;
    public version! : Number;
}
