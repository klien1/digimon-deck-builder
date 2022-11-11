import { User } from "../../entities/User.js";
import { dataSource } from "../../configs/ormconfig.js";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { DigimonContext } from "../../types.js";
import { COOKIE_NAME } from "../../constants.js";
import { RegisterUserInput, UserResponse, CustomError } from "./types.js";

@Resolver()
export class UserResolver {
  constructor(
    private readonly userRepository = dataSource.getRepository(User)
  ) {}

  @Query(() => UserResponse, { nullable: true })
  async getCurrentUser(@Ctx() ctx: DigimonContext): Promise<UserResponse> {
    const { userId } = ctx.req.session;

    if (!userId)
      return {
        errors: [new CustomError("account", "Please login to proceed.")],
      };

    let user: User | null;
    try {
      user = await this.userRepository.findOneBy({ id: userId });
    } catch (error) {
      console.error("error retriving data from database");
      return {
        errors: [
          new CustomError(
            "connection",
            "We are have issues getting your data. Please try again in a few minutes"
          ),
        ],
      };
    }

    if (!user) {
      return {
        errors: [new CustomError("account", "Please login to a valid account")],
      };
    }

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: DigimonContext): Promise<boolean> {
    return new Promise((resolve) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          console.error("session", err);
          resolve(false);
          return;
        }

        ctx.res.clearCookie(COOKIE_NAME);
        resolve(true);
      });
    });
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() ctx: DigimonContext
  ): Promise<UserResponse> {
    let curUser: User | null;
    try {
      curUser = await this.userRepository.findOneBy({ username });
    } catch (error) {
      console.error("error accessing database to fetch user");
      return {
        errors: [
          new CustomError(
            "connection",
            "We are have issues getting your data. Please try again in a few minutes"
          ),
        ],
      };
    }

    // no user found
    if (!curUser) {
      return {
        errors: [
          new CustomError(
            "account",
            "Credentials do not match. Please try again."
          ),
        ],
      };
    }

    try {
      if (await argon2.verify(curUser.password, password)) {
        // password matches logs user in
        ctx.req.session.userId = curUser.id;
      } else {
        console.error("password does not match");
        return {
          errors: [
            new CustomError(
              "account",
              "Credentials do not match. Please try again."
            ),
          ],
        };
      }
    } catch (error) {
      console.error("error checking password");
      return {
        errors: [
          new CustomError(
            "account",
            "Credentials do not match. Please try again."
          ),
        ],
      };
    }

    return {
      user: curUser,
    };
  }

  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("data") newUserData: RegisterUserInput,
    @Ctx() ctx: DigimonContext
  ): Promise<UserResponse> {
    let hash: string;
    try {
      hash = await argon2.hash(newUserData.password);
    } catch (err) {
      console.error("error hashing password");
      return {
        errors: [
          new CustomError(
            "account",
            "Error creating account, please try again."
          ),
        ],
      };
    }

    let user: User | null;
    try {
      user = await this.userRepository.findOneBy({
        username: newUserData.username,
      });
    } catch (error) {
      console.error("issue retriveing data from database");
      return {
        errors: [
          new CustomError(
            "account",
            "Error creating account, please try again."
          ),
        ],
      };
    }

    if (user) {
      console.error("error user already exists");
      // user exists
      return {
        errors: [
          new CustomError(
            "account",
            "Account already exists, please choose a different username."
          ),
        ],
      };
    }

    const newUser = {
      ...newUserData,
      password: hash,
    };

    try {
      user = await this.userRepository.save(newUser);
    } catch (error) {
      return {
        errors: [
          new CustomError(
            "account",
            "Error creating account. Please try again."
          ),
        ],
      };
    }

    if (!user) {
      return {
        errors: [
          new CustomError(
            "account",
            "Error creating account. Please try to login."
          ),
        ],
      };
    }

    ctx.req.session.userId = user.id;
    return {
      user,
    };
  }
}
