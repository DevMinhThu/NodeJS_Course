const nodemailer = require("nodemailer");
const config = require("config");
const mail = config.get("mail");

const transporter = nodemailer.createTransport(mail);

module.exports = transporter;
