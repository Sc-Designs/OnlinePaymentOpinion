const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
host: process.env.HOST_NAME,
port: parseInt(process.env.EMAIL_PORT),
secure: true, // true for 465, false for 587
auth: {
    user: process.env.USER_NAME,
    pass: process.env.USER_PASSWORD,
},
  connectionTimeout: 10000, // Timeout for establishing a connection (in ms)
  greetingTimeout: 10000, // Timeout for the greeting after connection is established
  socketTimeout: 10000, // Timeout for data exchange
});
module.exports.sendEmail = async ({ email, sub, mess }) => {
  try {
    return await transport.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: sub,
      html: mess,
    });
  } catch (error) {
    console.error("error", "Error sending email: ", error.message);
    console.error("Error sending email: ", error.message);
  }
};

module.exports.sendBackMail = async ({email, sub, mess}) => {
  try { 
    return await transport.sendMail({ 
      from: email,
      to: process.env.SENDER_EMAIL,
      subject: sub,
      html: mess, 
    });
  } catch (error) {
    console.error("error", "Error sending email: ", error.message);
    console.error("Error sending email: ", error.message);
  }
};