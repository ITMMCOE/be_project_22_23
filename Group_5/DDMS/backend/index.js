const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const compression = require("compression");

const sessionStore = require("connect-session-sequelize")(session.Store);
const ExpressError = require("./utils/ExpressError");

const app = express();
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
const path = require("path");
const auth = require("./Auth/passportConfig");

const { sequelize, Sequelize } = require("./utils/database");
const { User } = require("./models/user");
const { Subject } = require("./models/subject");
const { Faculty } = require("./models/faculty");
const associations = require("./models/associations");
const documentation = require("./documentation/swagger_output.json");

const { register } = require("./controllers/user");

const userRoutes = require("./routes/user");
const subjectRoutes = require("./routes/subject");
const facultyRoutes = require("./routes/faculty");
const studentRoutes = require("./routes/student");
const attendanceRoutes = require("./routes/attendance");
const markRoutes = require("./routes/mark");
const unitTestRoutes = require("./routes/unitTest");
const parentRoutes = require("./routes/parent");
const notifRoutes = require("./routes/notification");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CORSconfig = {
  credentials: true,
};

CORSconfig["origin"] =
  process.env.NODE_ENV === "production"
    ? `http://${process.env.FRONTEND_IP}:3000`
    : "http://localhost:3000";
// "http://192.168.217.107:3000";

app.use(cors(CORSconfig));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

sequelize
  .authenticate()
  .then((res) => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const store = new sessionStore({
  db: sequelize,
});

const sessionConfig = {
  secret: "Ganpati Bappa Morya!",
  store: store,
  resave: false,
  proxy: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

if (process.env.NODE_ENV === "production") {
  sessionConfig.cookie["secure"] = true;
  sessionConfig.cookie["sameSite"] = "None";
}

app.use(session(sessionConfig));
app.use(flash());
// sequelize.sync({ force: true });
sequelize.sync();

const initialize = async () => {
  const admin = await User.findOne({ where: { role: "admin" } });
  if (admin == null) {
    await register(
      { fullname: "admin", role: "admin", email: "admin@gmail.com" },
      "password"
    );
    console.log("Admin Credentials\nCHANGE @ FIRST LOGIN:", {
      fullname: "admin",
      role: "admin",
      email: "admin@gmail.com",
      password: "password",
    });
  }
};
app.use(passport.initialize());
app.use(passport.session());
auth(passport);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(compression());

app.use("/users", userRoutes);
app.use("/subjects", subjectRoutes);
app.use("/faculty", facultyRoutes);
app.use("/student", studentRoutes);
app.use("/attend", attendanceRoutes);
app.use("/marks", markRoutes);
app.use("/unitTest", unitTestRoutes);
app.use("/parents", parentRoutes);
app.use("/notify", notifRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(documentation));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (err.message == undefined) {
    err.message = "Something Went Wrong!";
  }
  res
    .status(statusCode)
    .send({ status: "error", objects: null, err: err.message });
});
const PORT =
  process.env.NODE_ENV === "production" ? process.env.BACKEND_PORT : 5000;
app.listen(5000, async () => {
  await initialize();
  console.log(`Listening on Port ${PORT}`);
});
