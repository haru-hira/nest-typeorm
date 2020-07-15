import {MigrationInterface, QueryRunner} from "typeorm";

export class migrator1594824175686 implements MigrationInterface {
    name = 'migrator1594824175686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "closure" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" integer, CONSTRAINT "PK_320f18692cc9062c46e6081d808" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "closure_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_e295a92f796968f541f20cdd97e" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d9b807d1afb187411bdbe1906d" ON "closure_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_2029f230595bed20b4d85591d9" ON "closure_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "closure" ADD CONSTRAINT "FK_7ff2d69d46873d28ec313354ab8" FOREIGN KEY ("parentId") REFERENCES "closure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "closure_closure" ADD CONSTRAINT "FK_d9b807d1afb187411bdbe1906d6" FOREIGN KEY ("id_ancestor") REFERENCES "closure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "closure_closure" ADD CONSTRAINT "FK_2029f230595bed20b4d85591d9b" FOREIGN KEY ("id_descendant") REFERENCES "closure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "closure_closure" DROP CONSTRAINT "FK_2029f230595bed20b4d85591d9b"`);
        await queryRunner.query(`ALTER TABLE "closure_closure" DROP CONSTRAINT "FK_d9b807d1afb187411bdbe1906d6"`);
        await queryRunner.query(`ALTER TABLE "closure" DROP CONSTRAINT "FK_7ff2d69d46873d28ec313354ab8"`);
        await queryRunner.query(`DROP INDEX "IDX_2029f230595bed20b4d85591d9"`);
        await queryRunner.query(`DROP INDEX "IDX_d9b807d1afb187411bdbe1906d"`);
        await queryRunner.query(`DROP TABLE "closure_closure"`);
        await queryRunner.query(`DROP TABLE "closure"`);
    }

}
