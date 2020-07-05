import {MigrationInterface, QueryRunner} from "typeorm";

export class migrator1593908149113 implements MigrationInterface {
    name = 'migrator1593908149113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_categories_category" ("questionId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_11044aadb95ef30daf7d1363d31" PRIMARY KEY ("questionId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21433e6d9a0e7e79c36b4ae69f" ON "question_categories_category" ("questionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9cf04f10454634f887ade56562" ON "question_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "question_categories_category" ADD CONSTRAINT "FK_21433e6d9a0e7e79c36b4ae69fd" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" ADD CONSTRAINT "FK_9cf04f10454634f887ade565622" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_categories_category" DROP CONSTRAINT "FK_9cf04f10454634f887ade565622"`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" DROP CONSTRAINT "FK_21433e6d9a0e7e79c36b4ae69fd"`);
        await queryRunner.query(`DROP INDEX "IDX_9cf04f10454634f887ade56562"`);
        await queryRunner.query(`DROP INDEX "IDX_21433e6d9a0e7e79c36b4ae69f"`);
        await queryRunner.query(`DROP TABLE "question_categories_category"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
