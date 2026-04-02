import replaceall from "replaceall";
import _ from "lodash";
import nodemailer from "nodemailer";
import configVariables from "../../server/config";
import otpHelper from "../helpers/otp.helper";

export const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net", // GoDaddy SMTP
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // your GoDaddy email
    pass: process.env.EMAIL_PASS, // your GoDaddy password
  },
});

export function sanitizeCountryCode(text) {
  if (text) {
    return replaceall("+", "", text); // text.replace('+', '')
  }
  return "";
}

export function getUserInfo(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    created_at: user.created_at
  };
}

export function getAdminInfo(user) {
  return {
    _id: user._id,
    email: user.email,
    phone: user.phone,
    name: user.name,
    role: user.role,
  };
}

export function generateOtp(range) {
  var add = 1,
    max = 12 - add;
  if (range > max) {
    return generate(max) + generate(n - max);
  }
  max = Math.pow(10, range + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return ("" + number).substring(add);
}

export function generateOtpExpireDate() {
  var date = new Date();
  var otpExpiry = new Date(date);
  otpExpiry.setMinutes(date.getMinutes() + 40);
  return otpExpiry;
}

export function getDateMinutesDifference(date) {
  var countDownDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  var diff = Math.abs(currentDate - countDownDate);
  var minutes = Math.floor(diff / 1000 / 60);
  return minutes;
}



export async function sendVerificationEmail(email, subject) {
  try {
    // Generate OTP
    const otp = generateOtp(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await otpHelper.updateOneAndUpdate({
      query: { email },
      updateQuery: {
        otp,
        expiresAt,
        created_at: new Date(),
        updated_at: new Date(),
      },
      options: { upsert: true, new: true },
    });

    // Send Email
    const htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - Neev Global Solutions</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; color: #2E415D;">
      
      <div style="max-width: 600px; margin: 0 auto; background-color: #FEFEFE; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(46, 65, 93, 0.15);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2E415D 0%, #3A5270 100%); padding: 40px 30px; text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
            <span style="color: #FEE568; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">NEEV</span>
            <span style="color: #FEFEFE; font-size: 32px; font-weight: 300; letter-spacing: -0.5px; margin-left: 8px;">Global Solutions</span>
          </div>
          <p style="color: rgba(254, 254, 254, 0.95); margin: 10px 0 0 0; font-size: 16px; font-weight: 400;">
            Connecting Markets • Building Opportunities
          </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Greeting -->
          <h2 style="color: #2E415D; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
            Welcome to Neev Global Solutions
          </h2>
          
          <p style="color: #4b5563; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            Hello!<br><br>
            Thank you for joining <strong style="color: #2E415D;">Neev Global Solutions</strong>. We're excited to help you explore opportunities across property listings, product marketing, startup promotions, trading, and commercial vehicles. Let's start by verifying your email address.
          </p>

          <!-- OTP Box -->
          <div style="background: linear-gradient(135deg, #FEFEFE 0%, #f8f9fa 100%); border: 2px solid #FEE568; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
            <p style="color: #2E415D; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
              Your Verification Code
            </p>
            <div style="background: #FEFEFE; border: 2px dashed #2E415D; border-radius: 8px; padding: 20px; margin: 15px 0;">
              <span style="color: #2E415D; font-size: 36px; font-weight: 800; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </span>
            </div>
            <p style="color: #6b7280; margin: 15px 0 0 0; font-size: 14px;">
              ⏰ <strong style="color: #2E415D;">Expires in 10 minutes</strong>
            </p>
          </div>

          <!-- Instructions -->
          <div style="background: #f8f9fa; border-left: 4px solid #FEE568; padding: 20px; border-radius: 6px; margin: 30px 0;">
            <h3 style="color: #2E415D; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
              🚀 How to complete verification:
            </h3>
            <ul style="color: #2E415D; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
              <li>Copy the 6-digit verification code above</li>
              <li>Return to the Neev Global Solutions verification page</li>
              <li>Enter the code to activate your account</li>
              <li>Begin exploring business opportunities</li>
            </ul>
          </div>

          <!-- What's Next -->
          <div style="background: #f0f7ff; border: 1px solid #2E415D; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #2E415D; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
              📈 Your Business Advantage:
            </h3>
            <ul style="color: #2E415D; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
              <li>Access premium property listings and real estate opportunities</li>
              <li>Market products and services across multiple sectors</li>
              <li>Connect with innovative startups and investment opportunities</li>
              <li>Explore trading and commercial vehicle solutions</li>
              <li>Comprehensive business networking platform</li>
            </ul>
          </div>

          <!-- Business Philosophy -->
          <div style="background: #f8f9fa; border: 1px solid #FEE568; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #2E415D; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
              💼 Our Commitment:
            </h3>
            <p style="color: #2E415D; margin: 0; font-size: 14px; line-height: 1.5;">
              At Neev Global Solutions, we bridge markets and create opportunities. Whether you're looking for property investments, product marketing, startup collaborations, or commercial solutions, we provide the platform for growth and success.
            </p>
          </div>

          <!-- Security Note -->
          <div style="background: #fff5f5; border: 1px solid #fed7d7; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="color: #c53030; margin: 0; font-size: 14px; font-weight: 500;">
              🔒 <strong>Security Notice:</strong>
            </p>
            <p style="color: #742a2a; margin: 10px 0 0 0; font-size: 14px; line-height: 1.4;">
              We protect your business information with enterprise-grade security. Never share this verification code with anyone. Neev Global Solutions will never ask for your code via phone or unsolicited contact.
            </p>
          </div>

          <!-- Support -->
          <p style="color: #6b7280; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; text-align: center;">
            Need assistance? Our business support team is here to help.<br>
            Contact us for inquiries about property listings, marketing, or business opportunities.
          </p>

        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #2E415D;">
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <span style="color: #2E415D; font-size: 18px; font-weight: 700;">NEEV</span>
            <span style="color: #2E415D; font-size: 18px; font-weight: 300; margin-left: 4px;">Global Solutions</span>
          </div>
          <p style="color: #2E415D; margin: 0 0 5px 0; font-size: 12px; font-style: italic;">
            "Building Foundations for Business Success"
          </p>
          <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 12px;">
            Property • Marketing • Trading • Startups • Commercial Vehicles
          </p>
          <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 12px;">
            © ${new Date().getFullYear()} Neev Global Solutions. All rights reserved.
          </p>
          <p style="color: #6b7280; margin: 0; font-size: 11px;">
            This email was sent to ${email}. If you didn't create an account, please ignore this message.
          </p>
        </div>

      </div>

      <!-- Mobile Responsiveness -->
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
          .padding { padding: 20px !important; }
          .otp-code { font-size: 28px !important; letter-spacing: 4px !important; }
        }
      </style>

    </body>
    </html>
    `;

    const textMessage = `
    📧 NEEV GLOBAL SOLUTIONS - Email Verification
    
    Hello!
    
    Welcome to Neev Global Solutions! Thank you for joining our platform for business opportunities across multiple sectors.
    
    Your Verification Code: ${otp}
    
    ⏰ This code expires in 10 minutes.
    
    How to verify:
    1. Copy the code above
    2. Return to the Neev Global Solutions verification page  
    3. Enter the code to activate your account
    4. Begin exploring business opportunities
    
    Your Business Advantage:
    • Access premium property listings and real estate opportunities
    • Market products and services across multiple sectors
    • Connect with innovative startups and investment opportunities
    • Explore trading and commercial vehicle solutions
    • Comprehensive business networking platform
    
    Our Commitment: At Neev Global Solutions, we bridge markets and create opportunities for growth and success.
    
    🔒 Security Notice: We protect your business information with enterprise-grade security. Never share this code.
    
    Need assistance? Our business support team is here to help with property listings, marketing, or business opportunities.
    
    © ${new Date().getFullYear()} Neev Global Solutions.
    "Building Foundations for Business Success"
    Property • Marketing • Trading • Startups • Commercial Vehicles
    `;

    const mailOptions = {
      from: `"Neev Global Solutions" <${configVariables.EMAIL_USER}>`,
      to: email,
      subject,
      text: textMessage,
      html: htmlMessage,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  }
  catch (e) {
    return { success: false, message: e.message };
  }
}


export function generateSlug(name) {
  return name
    .toLowerCase()                 // convert to lowercase
    .trim()                        // remove extra spaces
    .replace(/[^\w\s-]/g, "")      // remove special characters
    .replace(/\s+/g, "-")          // replace spaces with -
    .replace(/-+/g, "-");          // remove multiple -
}