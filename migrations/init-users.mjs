/** @type {import('node-pg-migrate').ColumnDefinitions | undefined} */

export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true, unique: true },
    created_at: { type: "timestamp", notNull: true, default: pgm.func("current_timestamp") },
  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
}