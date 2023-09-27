const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const studentsRoutes = require("./routes/studentRoutes");
const teachersRoutes = require("./routes/teacherRoutes");
const groupsRoutes = require("./routes/groupRoutes");
const attendenceRoutes = require("./routes/attendenceRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");

const swaggerDocument = require("./path/swagger-output.json");

const app = express();

// app.enable("trust proxy");
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      allowOrigins: ["*"],
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["*"],
        scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
      },
    },
  })
);

app.use(
  cors({
    origin: [
      "*",
      "http://*",
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:8000",
      "https://sumer.vercel.app",
      "https://sumer-dashboard.vercel.app",
      "http://localhost:4200",
    ],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

app.use("/swagger-json", (req, res, next) =>
  res.status(200).json(swaggerDocument)
);
app.use("/swagger-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", (req, res, next) => res.status(200).json({ message: "OK" }));

app.use("/api/v1/students", studentsRoutes);
app.use("/api/v1/teachers", teachersRoutes);
app.use("/api/v1/groups", groupsRoutes);
app.use("/api/v1/attendence", attendenceRoutes);
app.use("/api/v1/transactions", transactionRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
