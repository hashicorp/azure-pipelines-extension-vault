export class KeyValueGetResponse {
    public data! : KeyValueGetResponseData;
}

export class KeyValueGetResponseData {
    public data! : { [key: string]: string; }
    public metadata! : KeyValueGetResponseMetaData;
}

export class KeyValueGetResponseMetaData {
    public created_time! : string;
    public deletion_time! : string;
    public destroyed! : boolean;
    public version! : Number;
}
