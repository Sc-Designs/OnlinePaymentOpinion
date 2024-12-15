const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email, // Include user's email in the token payload
      id: user._id, // Include user's ID in the token payload
    },
    process.env.JWT_KEY // Sign the token with the secret key from environment variables
  );
};

// Export the generateToken function
module.exports.generateToken = generateToken;
