const User = require("../models/users.model");

let UsersController = {};

UsersController.list = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/list", { users: users.map(u => u.toObject()) });
    }
  });
};
UsersController.show = function(req, res) {
  User.findOne({ _id: req.params.id }).exec(function(err, user) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/details", { user: user });
    }
  });
};
UsersController.create = function(req, res) {
  res.render("../views/add");
};
UsersController.save = function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      console.log(err);
      res.render("../views/add");
    } else {
      console.log("Successfully created an employee.");
      res.redirect("/details/" + user._id);
    }
  });
};

UsersController.edit = function(req, res) {
  User.findOne({ _id: req.params.id }).exec(function(err, user) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/edit", { user: user });
    }
  });
};

UsersController.update = function(req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }
    },
    { new: true },
    function(err, user) {
      if (err) {
        console.log(err);
        res.render("../views/edit", { user: req.body });
      }
      res.redirect("/detail/" + user._id);
    }
  );
};
UsersController.delete = function(req, res) {
  User.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("User deleted!");
      res.redirect("/users");
    }
  });
};

module.exports = UsersController;

// let lastId = 0;

// let users = [
//   {
//     id: lastId++,
//     firstName: "Lucien",
//     lastName: "DROGO",
//     email: "ldrogo@toto.fr"
//   },
//   {
//     id: lastId++,
//     firstName: "Bob",
//     lastName: "RANDOM",
//     email: "bvrandom@toto.fr"
//   }
// ];
// const user = new UserModel({
//   id: lastId++,
//   firstName: "John",
//   lastName: "Doe",
//   email: "john@dummy.com"
// });
// user.save(err => {
//   if (!err) {
//   }
// });
// User.create(
//   { firstName: "David", lastName: "Michel", email: "david.michel@site.fr" },
//   (err, user) => {
//     if (!err) {
//     }
//   }
// );
// module.exports = class UsersController {
//   getAll() {
//     return new Promise((resolve, reject) => {
//       resolve(users);
//     });
//   }

//   getOne(id) {
//     return new Promise((resolve, reject) => {
//       const user = users.find(u => u.id === id);
//       if (user) {
//         resolve(user);
//       } else {
//         reject(new Error("User not found"));
//       }
//     });
//   }

//   create(user) {
//     const newUser = {
//       ...user,
//       id: lastId++
//     };

//     return new Promise((resolve, reject) => {
//       users.push(newUser);
//       resolve(newUser);
//     });
//   }

//   delete(id) {
//     return new Promise((resolve, reject) => {
//       users = users.filter(u => !(u.id === id));
//       resolve(true);
//     });
//   }
// };
