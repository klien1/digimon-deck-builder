import { Resolver, Query } from "type-graphql";
import { DigimonCard } from "../../entities/DigimonCard.js";
import { dataSource } from "../../configs/ormconfig.js";

@Resolver()
export class DigimonCardResolver {
  constructor(
    private readonly digimonCardRepository = dataSource.getRepository(
      DigimonCard
    )
  ) {}

  @Query(() => [DigimonCard])
  async getDigimonCards() {
    const cards = await this.digimonCardRepository
      .createQueryBuilder("card")
      // .take(20)
      .getMany();

    return cards;
  }
}
