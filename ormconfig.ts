import {DataSource} from "typeorm";

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    logging: true,
    synchronize: false,
    // name: 'default',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    // subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
