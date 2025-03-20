export class CreateUserDTO {
    id: string;
    name: string;
    email: string;
    password:string;
    role: string;

    constructor(user: any) {
      this.id = user._id;
      this.name = user.name;
      this.email = user.email;
      this.password=user.password;
      this.role = user.role;
    }
  }
  