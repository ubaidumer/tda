enum UserType{
  CUSTOMER='Customer',
  ADMIN='Admin'
}
export class GetAllUserDto {

    user_type:UserType;
    is_activated:number;
    sortList:any;

  }
  