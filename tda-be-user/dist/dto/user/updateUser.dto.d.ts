declare enum Gender {
    MALE = "Male",
    FEMALE = "Female"
}
declare enum UserType {
    CUSTOMER = "Customer",
    ADMIN = "Admin"
}
export declare class UpdateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    gender: Gender;
    address: string;
    city: string;
    country: string;
    keycloak_id: string;
    postal_code: string;
    user_type: UserType;
    updated_by: string;
}
export {};