export class KeycloakCreateuser{
    username: string;
    enabled: boolean;
    emailVerified:boolean;
    firstName: string;
    email: string;
    lastName: string;
    credentials: CredientialsInput[];
    role:string;
  }
  
  class CredientialsInput{
      type:string;
      value:string;
      temporary:boolean;
    
    }