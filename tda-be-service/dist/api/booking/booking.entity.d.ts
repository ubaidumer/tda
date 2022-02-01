declare enum Status {
    PENDING = "Pending",
    IN_PROGRESS = "In_Progress",
    CANCELLED = "Cancelled",
    COMPLETED = "Completed"
}
export declare class Booking {
    id: number;
    status: Status;
    start_time: String;
    end_time: String;
    booking_date: Date;
    user_id: Date;
    user: number;
    is_activated: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
export {};
