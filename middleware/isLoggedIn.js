//////////////////////////////////////////IMPORT THE REQIREMENT////////////////////////////////////////

// Import the JWT Module
const jwt = require("jsonwebtoken");

// Import the User Model
const userModel = require("../routes/users");

// Export the User Is_LoggedIn Middleware
module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.flash("error", "You must be logged in first!");
      return res.redirect("/login");
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      req.flash("error", "User not found!");
      res.clearCookie("token");
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    req.flash("error", "Something went wrong!");
    return res.redirect("/login");
  }
};

///////////////////////////////////////////////////END/////////////////////////////////////////////////