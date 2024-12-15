var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const upload = require("./multer");
const jwt = require("jsonwebtoken");
const { RegisterUser, LoginUser, LogOut, Re_sendOtp } = require("../controlers/user.controler");
const isLoggedIn  = require("../middleware/isLoggedIn");
const moment = require("moment");

// GET home page. //

router.get('/', function(req, res) {
  res.render('index');
});
router.get("/learn", function (req, res) {
  res.render("learn");
});
router.get("/profile", isLoggedIn, async function (req, res) {
  try {
    if (!req.user || !req.user._id) {
      console.error("No user found in request");
      return res.status(401).redirect("/login");
    }

    const user = await userModel
      .findById(req.user._id)
      .populate("posts");
    
    if (!user) {
      console.error(`No user found with ID: ${req.user._id}`);
      return res.status(404).redirect("/login");
    }

    const base64Image = user.profileImage
      ? user.profileImage.toString("base64")
      : null;
    
    res.render('profile', {
      user, 
      base64Image: base64Image,
      error: req.flash("error")
    });
  } catch(e) {
    console.error("Profile route error:", e);
    req.flash("error", "An unexpected error occurred");
    res.redirect("/login");
  }
});
router.post("/fileupload",isLoggedIn, upload.single("image"),async function (req, res) {
  const user = await userModel.findOne({_id: req.user._id});
  user.profileImage = req.file.buffer;
  await user.save();
  res.redirect("/profile");
});
router.get('/register', function(req, res) {
  res.render('register');
});
router.post("/register", RegisterUser);

router.get("/login", function (req, res) {
  res.render("login",{ error: req.flash("error") });
});
router.post("/login", LoginUser);

router.get('/about', function(req, res) {
  res.render('about');
});
router.get('/docs', async function(req, res) {
  try {
    const posts = await postModel.find()
      .populate({
        path: 'user',
        model: 'userModel',
        select: '-password -__v'
      })
      .sort({date: -1});

    const postsWithBase64 = posts.map(post => {
      // Add null check for post.user
      if (!post.user) return null;

      return {
        ...post.toObject(),
        user: {
          ...post.user.toObject(),
          profileImage: post.user.profileImage 
            ? post.user.profileImage.toString('base64') 
            : null
        }
      };
    }).filter(Boolean); // Remove any null entries

    res.render('docs', { 
      posts: postsWithBase64,
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Error fetching docs:', error);
    req.flash('error', 'Unable to fetch documents');
    res.status(500).render('error');
  }
});
router.get('/contact', function(req, res) {
  res.render("contact");
});
router.get("/edit/:editid", async function(req, res) {
  const editpost = await postModel.findOne({_id : req.params.editid});
  res.render("editpost",{editpost});
});
router.post("/edit/:editid", async function (req, res) {
  let editpost = req.body.editpost;
  await postModel.findOneAndUpdate(
    { _id: req.params.editid },
    { $set: { text: editpost } },
    { new: true }
  );
  res.redirect("/profile");
});
router.get("/:anithing", function (req, res) {
  res.render("error");
});
router.post("/create", async function(req, res) {
  const dateAndTime = moment().format("Do MMM YYYY, h:mm a");
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).redirect("/login");
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findOne({email: decoded.email});
  if (!user) {
    return res.status(404).send("User not found");
  }
  const post = await postModel.create({
    text:req.body.content,
    user: user._id,
    date: dateAndTime
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
}) 
router.post("/update/:userid",async function(req, res) {
  let editname = req.body.editname;
  await userModel.findOneAndUpdate(
    { _id: req.params.userid },{ $set: { fullname: editname } },{ new: true });
  res.redirect("/profile");
})
router.post("/delete/:postid",async function(req, res) {
  let post = await postModel.findOneAndDelete({
    _id: req.params.postid
  })
  await userModel.findOneAndUpdate(
    { _id: post.user },
    { $pull: { posts: req.params.postid } },
    { new: true }
  )
  res.redirect("/profile");
})
router.get("/otp/:id", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    res.status(200).render("otppage", { user: user });
  } catch (err) {
    res.status(404).render("/:anything");
  }
});


router.post("/verifyOtp", async (req, res) => {
  const { otp } = req.body;

  // Find the admin by OTP (and make sure it's not expired)
  const user = await userModel.findOne({
    otp: otp,
    otpExpiry: { $gt: Date.now() }, // Ensure OTP is not expired
  });

  if (!user) {
    req.flash("error", "Invalid or expired OTP. Please Re-Login");
    return res.redirect('/login');
  }

  // OTP is valid, clear OTP and expiry in the database
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  // Redirect to profile page
  return res.redirect("/profile");
});


router.post("/reSend_otp", Re_sendOtp);
router.post("/logout", LogOut)
module.exports = router;
