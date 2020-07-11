import {MigrationInterface, QueryRunner} from "typeorm";

export class migrator1594467493543 implements MigrationInterface {
    name = 'migrator1594467493543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ALTER COLUMN "fileName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ALTER COLUMN "originalObjectContentType" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" ALTER COLUMN "originalObjectContentType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ALTER COLUMN "fileName" SET NOT NULL`);
    }

}
