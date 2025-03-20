export class GetUserDTO {
    id: string;
    name: string;
    email: string;
    role: string;
  
    constructor(user: any) {
      this.id = user._id;
      this.name = user.name;
      this.email = user.email;
      this.role = user.role;
    }
  }
  