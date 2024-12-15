const userModel = require("../routes/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generate.token");
const randomOtp = require("../utils/otp.function");
const { sendEmail } = require("../utils/email.sender");
const { OtpVarify } = require("../EmailTemplates/emails");

module.exports.RegisterUser = async (req, res) => {
    try {
        let {
          fullname,
          email,
          password,
          username
        } = req.body;
        let existingUser = await userModel.findOne({ email: email });
        if (existingUser){
            console.log("User already exists");
          return res.status(406).redirect("/login");
        }
        else {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              if (err) return res.status(500).send("Error generating");
              else {
                let newUser = await userModel.create({
                  fullname,
                  email,
                  username,
                  password: hash,
                });
                let Token = generateToken(newUser);
                res.cookie("token", Token);
                res.status(201).redirect("/profile");
              }
            });
          });
        }
      }catch(e){
        res.status(500).json({ message: e.message });
    }
}

module.exports.LoginUser = async (req, res, next) => {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await userModel.findOne({ email });
  
      // If user is not found, send 401 Unauthorized response
      if (!user) {
        console.log("error", "User not found!");
        return res.status(401).redirect("/login");
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        console.log("error", "Incorrect password.");
        return res.status(401).redirect("/login");
      } else {
        // Generate a JWT token
        const token = generateToken(user);
        // Set the token as a cookie
        res.cookie("token", token);
      }
  
      // Generate an OTP
      const otp = randomOtp();
  
      sendEmail({
        email,
        sub: "OTP Varification",
        mess: OtpVarify(otp),
      });
      //save the otp
      user.otp = otp;
      // 60 second expiry
      user.otpExpiry = Date.now() + 60 * 1000;
      // Save the user document with the otp
      await user.save();
  
      // Redirect to OTP verification page without email in the URL
      return res.redirect(`/otp/${user._id}`);
    } catch (err) {
      // Log the error and send a 500 Internal Server Error response
      console.error("Login error:", err);
      return res.status(500).send("Server Unavailable");
    }
};

module.exports.LogOut = (req, res) => {
    res.cookie("token", "");
    res.status(200).redirect("/login");
};

module.exports.Re_sendOtp = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ Email: email });
      let NewOtp = randomOtp();
      sendEmail({
        email,
        sub: "OTP Varification",
        mess: OtpVarify(NewOtp),
      });
      //save the otp
      user.otp = NewOtp;
      // 60 second expiry
      user.otpExpiry = Date.now() + 60 * 1000;
      // Save the user document with the otp
      await user.save();
      // Redirect to OTP verification page without email in the URL
      return res.redirect(`/users/otp/${user._id}`);
    } catch (err) {
      throw new Error(err);
    }
  }