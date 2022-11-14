import { User } from "../../entities/User.js";
import { Field, InputType, ObjectType } from "type-graphql";
import * as yup from "yup";

@InputType({ description: "New registered user input" })
export class RegisterUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  verifyPassword: string;
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

export const registrationSchema = yup.object().shape({
  username: yup.string().min(5).required(),
  password: yup
    .string()
    .min(5)
    .matches(/(?=.*\d)/, "Must contain a number")
    .matches(/(?=.*[A-Z])/, "Must contain an upper case letter")
    .matches(/(?=.*[a-z])/, "Must contain a lower case letter")
    .matches(
      /(?=.*[!@#\$%\^&\*])/,
      "Must contain on of the following symbols: ! @ # $ % ^ & *"
    )
    .required(),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .min(5, "Re-enter password must be at least 5 characters")
    .required("you must verify your password"),
  email: yup.string().email().required(),
});
