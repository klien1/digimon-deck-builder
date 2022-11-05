/**
 * {
 *    "name":"Yokomon",
 *    "type":"Digi-Egg",
 *    "color":"Red",
 *    "stage":"In-Training",
 *    "digi_type":"Bulb",
 *    "attribute":null,
 *    "level":2,
 *    "play_cost":null,
 *    "evolution_cost":null,
 *    "cardrarity":"Rare",
 *    "artist":"TANIMESO",
 *    "dp":null,
 *    "cardnumber":"BT1-001",
 *    "maineffect":null,
 *    "soureeffect":"[When Attacking] When you attack an opponent's Digimon, this Digimon gets +1000 DP for the turn.",
 *    "set_name":"BT-01: Booster New Evolution",
 *    "card_sets": [
 *      "BT-01: Booster New Evolution",
 *      "BT01-03: Release Special Booster Ver.1.0",
 *      "BTC-01: Booster Ultimate Evolution"
 *    ],
 *    "image_url":"https:\/\/images.digimoncard.io\/images\/cards\/BT1-001.jpg"
 * }
 *
 * https://documenter.getpostman.com/view/14059948/TzecB4fH
 */

import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType({ description: "Digimon 2020 TCG Card Information" })
@Entity()
export class DigimonCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  color: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  stage?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  digit_type?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  attribute?: string | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: "integer", nullable: true })
  level?: number | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: "integer", nullable: true })
  play_cost?: number | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: "integer", nullable: true })
  evolution_cost?: number | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  cardrarity?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  artist?: string | null;

  @Field(() => Int, { nullable: true })
  @Column({ type: "integer", nullable: true })
  dp?: number | null;

  @Field(() => String, { nullable: true })
  @Column()
  cardnumber: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  maineffect?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  soureeffect?: string | null;

  @Field()
  @Column()
  set_name: string;

  @Column("varchar", { array: true })
  card_sets: string[];

  @Field()
  @Column()
  image_url: string;
}
