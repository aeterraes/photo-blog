"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Myblog1745341381292 = void 0;
class Myblog1745341381292 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE images (
        id SERIAL PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        alt_text VARCHAR(255)
      );
      
      CREATE TABLE merch_packages (
        id SERIAL PRIMARY KEY,
        merch_type TEXT NOT NULL,
        design_type TEXT NOT NULL,
        collection TEXT NOT NULL,
        image_id INTEGER REFERENCES images(id) ON DELETE SET NULL
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_id INTEGER REFERENCES images(id) ON DELETE SET NULL
      );

      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        description TEXT NOT NULL,
        image_id INTEGER REFERENCES images(id) ON DELETE SET NULL
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE posts;
      DROP TABLE products;
      DROP TABLE merch_packages;
      DROP TABLE images;
      DROP TABLE users;
    `);
    }
}
exports.Myblog1745341381292 = Myblog1745341381292;
//# sourceMappingURL=1745341381292-myblog.js.map