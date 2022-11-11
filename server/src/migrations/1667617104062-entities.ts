import { MigrationInterface, QueryRunner } from "typeorm";

export class entities1667617104062 implements MigrationInterface {
  name = "entities1667617104062";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "digimon_card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "stage" character varying, "digit_type" character varying, "attribute" character varying, "level" integer, "play_cost" integer, "evolution_cost" integer, "cardrarity" character varying, "artist" character varying, "dp" integer, "cardnumber" character varying NOT NULL, "maineffect" character varying, "soureeffect" character varying, "set_name" character varying NOT NULL, "card_sets" character varying array NOT NULL, "image_url" character varying NOT NULL, CONSTRAINT "PK_de3d2a6beef1dc080b3b5f45777" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "digimon_card"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
