export declare class KeycloakCreateuser {
    username: string;
    enabled: boolean;
    emailVerified: boolean;
    firstName: string;
    email: string;
    lastName: string;
    credentials: CredientialsInput[];
    role: string;
}
declare class CredientialsInput {
    type: string;
    value: string;
    temporary: boolean;
}
export {};
