import Express from "express";
import compression from "compression";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import chalk from "../server/chalk";
import cors from "cors";
import serverConfig from "../server/config";
import mainRoutes from "../server/routes/main.routes";
import userRoutes from "../server/routes/user.routes";
import otpRoutes from "../server/routes/otp.routes";


const app = new Express();
const http = require("http").Server(app);

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};


mongoose.Promise = global.Promise;

const dbOptions = {
  maxPoolSize: 8,
  minPoolSize: 0,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  retryWrites: true,
  w: 'majority'
};

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(serverConfig.mongoURL, dbOptions);
  } catch (error) {
    process.exit(1); // Exit if can't connect to database
  }
}

mongoose.set("debug", false);


app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(cookieParser());
app.enable("trust proxy");

app.use("*", (req, res, next) => {
  const { hostname, originalUrl, protocol, method } = req;
  console.log(
    `${method === "GET" ? chalk.getReq(method) : chalk.postReq(method)
    }  ${protocol}://${hostname}:${serverConfig.PORT}${originalUrl}`
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https: data:;"
  );
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  next();
});

app.use("/", mainRoutes);
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/otp", otpRoutes)

// Start server ONLY after database connection is established
connectDB().then(() => {
  http.listen(serverConfig.PORT, (error) => {
    if (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
    console.log(`🌐 Core API is running on port: ${serverConfig.PORT}`);
  });
}).catch((error) => {
  console.error('💥 Startup failed:', error);
  process.exit(1);
});

export default app;