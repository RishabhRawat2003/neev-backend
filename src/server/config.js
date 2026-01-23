const configVariables = {
  stage: process.env.STAGE || "dev",
  mongoURL:
    process.env.MONGO_URL ||
    "mongodb+srv://rajputrishabh359_db_user:Jg6tYOn26tcY3s5e@cluster0.tw1ptdq.mongodb.net/", // mongodb+srv://testusername:8DaXAe9sRUz8T01b@unfiltered-cluster.qfccv.mongodb.net/test?retryWrites=true&w=majority
  PORT: Number(process.env.PORT) || 8080,
  JWT_SECRET: "neev1234567890",
  EMAIL_USER: process.env.EMAIL_USER || "neevglobalsolutions@gmail.com",
  EMAIL_PASS: process.env.EMAIL_PASS || "aukkqawlvxnngmrr",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "dvmm4ldjc",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "264649746887875",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "-5HXfhBl5FuAkof3dvBO0PEtQV0",
};
export default configVariables;
