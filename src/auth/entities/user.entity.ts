import { Exclude, Expose } from "class-transformer"
import { UserRole } from "@prisma/client"

type TUser = {
  userId: string
  email: string
  role: UserRole
  image: string
}


export class UserEntity {
  designation: string
  department: string
  accessToken: string
  
  @Exclude()
  firstName: string

  @Exclude()
  lastName: string

  @Exclude()
  user: Array<TUser>

  @Expose()
  get name(): string {
    return `${this.firstName} ${this.lastName}`
  }

  @Expose()
  get userId(): string {
    return `${this.user[0].userId}`
  }

  @Expose()
  get email(): string {
    return `${this.user[0].email}`
  }
  
  @Expose()
  get role(): UserRole {
    return `${this.user[0].role}`
  }

  @Expose()
  get image(): string {
    return `${this.user[0].image}`
  }



  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }  
}