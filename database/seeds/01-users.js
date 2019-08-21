exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users").insert([
    { username: "Shane", password: "1234", departments: "a" },
    { username: "Shane1", password: "1234", departments: "a" },
    { username: "Shane2", password: "1234", departments: "b" },
    { username: "Shane3", password: "1234", departments: "b" },
    { username: "Shane4", password: "1234", departments: "c" }
  ]);
};
