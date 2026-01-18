const configVariables = {
  stage: process.env.STAGE || "dev",
  mongoURL:
    process.env.MONGO_URL ||
    "mongodb+srv://rajputrishabh359_db_user:Jg6tYOn26tcY3s5e@cluster0.tw1ptdq.mongodb.net/", // mongodb+srv://testusername:8DaXAe9sRUz8T01b@unfiltered-cluster.qfccv.mongodb.net/test?retryWrites=true&w=majority
  PORT: Number(process.env.PORT) || 8080,
  JWT_SECRET: "neev1234567890",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",
  // for prod
  // RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "rzp_test_RTQXhKmDvfL3Z4", // for testing
  // RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "gkmHPKhW75FOzu3bIXolWaox", // for testing
};
export default configVariables;
