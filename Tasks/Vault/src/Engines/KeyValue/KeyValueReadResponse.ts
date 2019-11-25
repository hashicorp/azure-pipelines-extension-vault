export class KeyValueReadResponse {
    public data! : { [key: string]: string; }
    public lease_duration! : string;
    public lease_id! : string;
    public renewable! : boolean;
}
