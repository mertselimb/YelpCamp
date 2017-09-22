var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//------------------------------------------------------------------------------
//                               HOMEPAGE
//------------------------------------------------------------------------------

router.get("/" , function(req,res){
    res.render("landing");
});

//------------------------------------------------------------------------------
//                            AUTH ROUTES
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//                          Show register form
//------------------------------------------------------------------------------

router.get("/register" , function(req, res) {
    res.render("register");
});

//------------------------------------------------------------------------------
//                            Sign up logic
//------------------------------------------------------------------------------
router.post("/register" , function(req, res) {
    var newUser =new User({username:req.body.username}); 
    User.register(newUser , req.body.password , function(err , user){
        if (err) {
            console.log(err);
            req.flash("error" , err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success" , "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
    
});

//------------------------------------------------------------------------------
//                            Login form
//------------------------------------------------------------------------------

router.get("/login" , function(req, res) {
    res.render("login");
});

//------------------------------------------------------------------------------
//                            Login logic
//------------------------------------------------------------------------------
router.post("/login" ,passport.authenticate("local" , {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req,res){
    
});

//------------------------------------------------------------------------------
//                            Logout route
//------------------------------------------------------------------------------

router.get("/logout" , function(req,res){
    req.logout();
    req.flash("success" , "Logged you out.");
    res.redirect("/campgrounds");
});

module.exports = router;