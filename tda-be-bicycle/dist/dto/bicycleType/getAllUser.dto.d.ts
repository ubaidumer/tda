declare enum UserType {
    CUSTOMER = "Customer",
    ADMIN = "Admin"
}
export declare class GetAllUserDto {
    user_type: UserType;
    is_activated: number;
    sortList: any;
}
export {};
