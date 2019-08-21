const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users.model.js");
const secrets = require("../config/secrets.js");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(err => {
      res.status(500).json({ message: "Error" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.find({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        const token = getJwt(user);
        res.status(200).json({
          message: `${user.username} is logged in!`,
          token
        });
      } else {
        res.status(401).json({ message: "invalid login/password" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error " });
    });
});

function getJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    jwtid: 1
  };
  const options = {
    expiresIn: "2 days"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
