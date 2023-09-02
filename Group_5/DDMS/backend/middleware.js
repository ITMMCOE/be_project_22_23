const { User } = require("./models/user");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    res.status(401).send({
      status: "error",
      err: "You must be signed in",
      data: { redirectLink: "/login" },
    });
  } else {
    if (!req.user) {
      res.redirect("/users/logout");
    } else {
      next();
    }
  }
};

module.exports.isFacultyOrAdmin = async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findOne({
    where: {
      id: currentUser.id,
      fullname: currentUser.username,
    },
  });
  if (user.role !== "student") {
    next();
  } else {
    res.status(403).send({
      status: "error",
      data: null,
      err: "You Don't have the required permissions",
    });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  const currentUser = req.user;
  const user = await User.findOne({
    where: {
      id: currentUser.id,
      fullname: currentUser.username,
    },
  });
  if (user.role === "admin") {
    next();
  } else {
    res.status(403).send({
      status: "error",
      data: null,
      err: "You Don't have the required permissions",
    });
  }
};
