const express = require("express");

const router = express.Router();

let user = require("../controllers/users.controller");

module.exports = controller => {
  router.get("/", user.list);

  router.get("/details/:id", user.show);

  router.get("/add", user.create);

  router.post("/save", user.save);

  router.get("/edit/:id", user.edit);

  router.post("/update/:id", user.update);

  router.post("/delete/:id", user.delete);

  return router;
};
