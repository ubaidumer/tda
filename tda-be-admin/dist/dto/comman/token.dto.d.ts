declare class Realm_access {
    roles: [string];
}
export declare class Token {
    exp: number;
    lat: number;
    iss: string;
    aud: [string];
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    acr: string;
    realm_access: Realm_access;
}
export {};
