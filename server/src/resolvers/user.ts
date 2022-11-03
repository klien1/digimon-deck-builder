import { User } from "../entities/User.js";
import { dataSource } from "../configs/datasource.js";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";

@InputType({ description: "Registers new user" })
class RegisterUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  hashPassword: string;
}

// export class User {
//   @Field()
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Field()
//   @Column({ unique: true })
//   username: string;

//   @Field()
//   @Column({ unique: true })
//   email: string;

//   @Column()
//   hashPassword: string;

//   @CreateDateColumn()
//   createdDate: Date;

//   @UpdateDateColumn()
//   updatedDate: Date;
// }

@Resolver()
export class UserResolver {
  constructor(
    private readonly userRepository = dataSource.getRepository(User)
  ) {}

  @Query(() => [User])
  async getAllUsers() {
    return this.userRepository.find();
  }

  @Mutation(() => Boolean)
  async registerUser(@Arg("data") newUserData: RegisterUserInput) {
    let hash: string;
    try {
      hash = await argon2.hash(newUserData.hashPassword);
    } catch (err) {
      console.error("error hashing password");
      return false;
    }

    let user: User | null;
    try {
      user = await this.userRepository.findOneBy({
        username: newUserData.username,
      });
    } catch (error) {
      console.error("issue retriveing data from database");
      return false;
    }

    if (user) {
      // user exists
      return false;
    }

    const newUser = {
      ...newUserData,
      hashPassword: hash,
    };

    this.userRepository.save(newUser);

    return true;
  }
}
