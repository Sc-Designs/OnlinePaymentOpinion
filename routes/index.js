var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const upload = require("./multer");
const passport = require("passport");
const localStrategy = require("passport-local");
const moment = require("moment");
passport.use(new localStrategy(userModel.authenticate()));
// GET home page. //
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get("/learn", function (req, res, next) {
  res.render("learn");
});
router.get("/profile", isLoggedIn, async function (req, res, next) {
  try{

    const user = 
    await userModel
    .findOne({username: req.session.passport.user})
    .populate("posts")
    const base64Image = user.profileImage
      ? user.profileImage.toString("base64")
      : null;
        res.render('profile',{user, base64Image: base64Image});
      }catch(e){
        res.redirect("/login");
      }
});
router.post("/fileupload",isLoggedIn, upload.single("image"),async function (req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  user.profileImage = req.file.buffer;
  await user.save();
  res.redirect("/profile");
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post("/register", function (req, res, next) {
  const user = new userModel({
    fullname:req.body.fullname,
    email:req.body.email,
    username:req.body.username
  })
  userModel.register(user, req.body.password)
  .then(function(){
      passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})
router.get("/login", function (req, res, next) {
  res.render("login",{ error: req.flash("error") });
});
router.post("/login",passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),function (req, res, next) {
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/docs', async function(req, res, next) {
  const posts = 
  await postModel.find({})
  .populate("user");
  router.get('/docs', async function(req, res, next) {
  const posts = await postModel.find({})
    .populate("user"); // Ensure user profile is populated
  
  // Convert each user's profile picture buffer to Base64
  posts.forEach(post => {
    if (post.user.profilePicture) {
      post.user.profilePictureBase64 = post.user.profilePicture.toString('base64');
    }
  });

  res.render('docs', { posts });
});
router.get('/contact', function(req, res, next) {
  res.render("contact");
});
router.get("/edit/:editid", async function(req, res, next) {
  const editpost = await postModel.findOne({_id : req.params.editid});
  res.render("editpost",{editpost});
});
router.post("/edit/:editid", async function (req, res, next) {
  let editpost = req.body.editpost;
  let postedtext = await postModel.findOneAndUpdate(
    { _id: req.params.editid },
    { $set: { text: editpost } },
    { new: true }
  );
  res.redirect("/profile");
});
router.get("/:anithing", function (req, res, next) {
  res.render("error");
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
router.post("/create", async function(req, res, next) {
  const dateAndTime = moment().format("Do MMM YYYY, h:mm a");  
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    text:req.body.content,
    user: user._id,
    date: dateAndTime
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
}) 
router.post("/update/:userid",async function(req, res, next) {
  let editname = req.body.editname;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },{ $set: { fullname: editname } },{ new: true });
  res.redirect("/profile");
})
router.post("/delete/:postid",async function(req, res, next) {
  let post = await postModel.findOneAndDelete({
    _id: req.params.postid
  })
  let user = await userModel.findOneAndUpdate(
    { _id: post.user },
    { $pull: { posts: req.params.postid } },
    { new: true }
  )
  res.redirect("/profile");
})
router.post("/logout", function(req, res, next) {
  req.logout(function(err){
    if (err) {return next(err);}
    res.redirect("/login");
  });
})
module.exports = router;
