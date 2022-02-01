declare enum Status {
    PENDING = "Pending",
    IN_PROGRESS = "In_Progress",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed"
}
export declare class CreateBookingDto {
    start_time: string;
    end_time: string;
    booking_date: Date;
    user_id: number;
    status: Status;
    created_by: string;
}
export {};
