import {MigrationInterface, QueryRunner} from "typeorm";

export class migrator1594372491291 implements MigrationInterface {
    name = 'migrator1594372491291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "fileName" character varying NOT NULL, "originalObjectKey" character varying NOT NULL, "originalObjectContentType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "document"`);
    }

}
