import { User } from 'src/api/user/user.entity';
declare const CONFIG: {
    DATABASE_TYPE: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_ENTITIES: (typeof User)[];
    DATABASE_SYNCHRONIZE: boolean;
    DATABASE_MULTI_STATEMENT: boolean;
    NEST_APP_PORT: string;
    KEYCLOAK_URL: string;
    KEYCLOAK_REALM: string;
    KEYCLOAK_CLIENT: string;
    KEYCLOAK_CLIENT_SECRET: string;
};
export default CONFIG;
