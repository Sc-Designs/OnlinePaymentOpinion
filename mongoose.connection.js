//////////////////////////////////////////IMPORT THE REQIREMENT////////////////////////////////////////

// Import the Mongoose
const mongoose = require("mongoose");

// Custom Mongoose Link
const link = "mongodb://127.0.0.1:27017/OnlinePaymentAwareness";


// Mongoose Connection_Retry
const connectWithRetry = () => {
  mongoose
    .connect(link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
    })
    .then(function () {
      console.log("connect");
    })
    .catch(function (err) {
      console.log(err);
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};

// Call the Connection_retry function
connectWithRetry();


// Connect Debug Message
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

// Error Debug Message
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

// Disconnect Debug Message
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

// Ensure the connection is established before performing database operations
mongoose.connection.once("open", () => {
  console.log("Mongoose connection open");
});

// Export the Mongoose Connection
module.exports = mongoose.connection;

///////////////////////////////////////////////////END/////////////////////////////////////////////////