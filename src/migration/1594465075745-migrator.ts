import {MigrationInterface, QueryRunner} from "typeorm";

export class migrator1594465075745 implements MigrationInterface {
    name = 'migrator1594465075745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ADD "status" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "status"`);
    }

}
