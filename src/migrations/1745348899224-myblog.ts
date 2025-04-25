import { MigrationInterface, QueryRunner } from 'typeorm';

export class Myblog1745348899224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "email" VARCHAR(255) NOT NULL
);

CREATE TABLE "merch_packages" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
  "merchType" VARCHAR(255) NOT NULL,   
  "designType" VARCHAR(255) NOT NULL,  
  "collection" VARCHAR(255) NOT NULL,   
  "dateCreated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "price" DECIMAL(10, 2) NOT NULL,
  "merch_package_id" INTEGER REFERENCES "merch_packages"("id") ON DELETE CASCADE
);

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "merch_package_id" INTEGER REFERENCES "merch_packages"("id") ON DELETE CASCADE
);

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "dateCreated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
