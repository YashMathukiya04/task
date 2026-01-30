import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767868926517 implements MigrationInterface {
    name = 'InitSchema1767868926517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1️⃣ Create stock_entry table
        await queryRunner.query(`
            CREATE TABLE "stock_entry" (
                "id" SERIAL NOT NULL,
                "added_at" TIMESTAMP NOT NULL DEFAULT now(),
                "description" character varying,
                CONSTRAINT "PK_31f794b522f1d6348a526581c34" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`ALTER TABLE "stock" ADD "stock_entry_id" integer`);

        await queryRunner.query(`UPDATE "product" SET "name" = 'Unnamed Product' WHERE "name" IS NULL`);

        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "name" SET NOT NULL`);
        
        await queryRunner.query(`
            ALTER TABLE "stock" 
            ADD CONSTRAINT "FK_d4bc790ca028031c19c1680269f" 
            FOREIGN KEY ("stock_entry_id") REFERENCES "stock_entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_d4bc790ca028031c19c1680269f"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "stock_entry_id"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "stock_entry"`);
    }
}
