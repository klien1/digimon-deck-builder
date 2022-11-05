import { User } from "../entities/User.js";
import { dataSource } from "../configs/ormconfig.js";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { DigimonContext } from "../types.js";
import { COOKIE_NAME } from "../constants.js";

@InputType({ description: "Registers new user" })
class RegisterUserInput implements Partial<User> {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  hashPassword: string;
}

@Resolver()
export class UserResolver {
  constructor(
    private readonly userRepository = dataSource.getRepository(User)
  ) {}

  // @Query(() => [User])
  // async getAllUsers() {
  //   return this.userRepository.find();
  // }

  @Query(() => User, { nullable: true })
  async getCurrentUser(@Ctx() ctx: DigimonContext) {
    const { userId } = ctx.req.session;

    if (!userId) return null;

    let user;
    try {
      user = await this.userRepository.findOneBy({ id: userId });
    } catch (error) {
      console.error("error retriving data from database");
      return;
    }

    return {
      id: user?.id,
      username: user?.username,
      email: user?.email,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: DigimonContext) {
    return new Promise((resolve) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }

        ctx.res.clearCookie(COOKIE_NAME);
        resolve(true);
      });
    });
  }

  @Mutation(() => Boolean)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() ctx: DigimonContext
  ) {
    let curUser: User | null;
    try {
      curUser = await this.userRepository.findOneBy({ username });
    } catch (error) {
      console.error("error accessing databse to fetch user");
      return false;
    }

    // no user found
    if (!curUser) {
      console.error("user does not exists");
      return false;
    }

    try {
      if (await argon2.verify(curUser.hashPassword, password)) {
        // password matches logs user in
        ctx.req.session.userId = curUser.id;
      } else {
        console.error("password does not match");
        return false;
      }
    } catch (error) {
      console.error("error checking password");
      return false;
    }

    console.log("successfully logged in with " + curUser.username);
    return true;
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
      console.error("error user already exists");
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
