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
import adminRoutes from "../server/routes/admin.routes";
import propertyRoutes from "../server/routes/property.routes";
import marketingRoutes from "../server/routes/marketing.routes";
import marketingLeadRoutes from "../server/routes/marketingLead.routes";
import salesLeadRoutes from '../server/routes/salesLead.routes'
import leadRoutes from "../server/routes/lead.routes";
import startupProducts from "../server/routes/startupProducts.routes";
import startupProductsLead from "../server/routes/startupProductsLead.routes";
import commercialVehicles from "../server/routes/commercialVehicles.routes";
import commercialVehicleLead from '../server/routes/commercialVehicleLead.routes'
import preownedVehicles from "../server/routes/preownedVehicles.routes";
import preownedVehicleLead from "./routes/preownedVehiclesLead.routes";

import axios from "axios";


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
    console.log("Connected to MongoDB");

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
app.get('/health', (req, res) => {
  res.status(200).send('OK'); // Health check endpoint
});
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/otp", otpRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/property", propertyRoutes)
app.use("/api/v1/marketing", marketingRoutes)
app.use("/api/v1/marketingLead", marketingLeadRoutes)
app.use("/api/v1/salesLead", salesLeadRoutes)
app.use("/api/v1/lead", leadRoutes)
app.use("/api/v1/startupProducts", startupProducts)
app.use("/api/v1/startupProductsLead", startupProductsLead)
app.use("/api/v1/commercialVehicle", commercialVehicles)
app.use("/api/v1/commercialVehicleLead", commercialVehicleLead)
app.use("/api/v1/preownedVehicle", preownedVehicles)
app.use("/api/v1/preownedVehicleLead", preownedVehicleLead)


// Start server ONLY after database connection is established
connectDB().then(() => {
  http.listen(serverConfig.PORT, (error) => {
    if (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
    console.log(`Core API is running on port: ${serverConfig.PORT}`);
    setInterval(async () => {
      try {
        const response = await axios.get('https://neev-backend.onrender.com/health')
        console.log(response.data)
      } catch (error) {
        console.error('Health check failed:', error)
      }
    }, 10 * 60 * 1000)
  });
}).catch((error) => {
  console.error('Startup failed:', error);
  process.exit(1);
});

export default app;