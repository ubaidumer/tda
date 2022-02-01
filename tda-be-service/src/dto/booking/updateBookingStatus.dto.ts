enum Status {
  PENDING='Pending',
  IN_PROGRESS='In_Progress',
  CANCELLED='Cancelled',
  COMPLETED='Completed'
}
export class UpdateBookingStatusDto {
  status:Status;
}
  