import replaceall from "replaceall";
import _ from "lodash";
import nodemailer from "nodemailer";
import configVariables from "../../server/config";

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
    username: user.username,
    email: user.email,
    profile_image: user.profile_image,
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



