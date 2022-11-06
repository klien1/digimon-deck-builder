import { User } from "../../entities/User.js";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType({ description: "New registered user input" })
export class RegisterUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  hashPassword: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [CustomError], { nullable: true })
  errors?: CustomError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class CustomError {
  @Field()
  errorName: string;

  @Field()
  message: string;

  constructor(errorName: string, message: string) {
    this.errorName = errorName;
    this.message = message;
  }
}
