const db = require("../database/dbConfig.js");

module.exports = {
  get,
  add,
  find
};

function get() {
  return db("users");
}

function find(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users").insert(user);
}
