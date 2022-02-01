declare enum Status {
    PENDING = "Pending",
    IN_PROGRESS = "In_Progress",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed"
}
export declare class UpdateBookingStatusDto {
    status: Status;
}
export {};
