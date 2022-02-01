declare enum Gender {
    MALE = "Male",
    FEMALE = "Female"
}
declare enum UserType {
    CUSTOMER = "Customer",
    ADMIN = "Admin"
}
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: Gender;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    user_type: UserType;
    keycloak_id: string;
    is_activated: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
export {};
