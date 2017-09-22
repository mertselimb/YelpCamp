var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwnership= function(req , res , next) {
    if (req.isAuthenticated()) {
        //does user have this post
            Comment.findById(req.params.comment_id , function(err , foundComment){
        if (err) {
            req.flash("error" , "Comment not found.");
            res.redirect("back");
        } else {
            if (foundComment.author.id.equals(req.user._id) || req.user.username == "artiDokuz") {
            next();
            } else {
                req.flash("error" , "You don't have permission to do that.");
                res.redirect("back");
            }
        }
    });
    //if not redirect
    } else {
        res.redirect("back");
        req.flash("error" , "You need to be logged in to do that.");
    }
};

middlewareObj.isLoggedIn = function(req , res , next){
    if (req.isAuthenticated()) {
        return next();
    };
    req.flash("error" , "You need to be logged in for this.");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership= function(req , res , next) {
    if (req.isAuthenticated()) {
        //does user have this post
            Campground.findById(req.params.id , function(err , foundCampground){
        if (err) {
            req.flash("error" , "Campground not found.");
            res.redirect("back");
        } else {
            if (foundCampground.author.id.equals(req.user._id)|| req.user.username == "artiDokuz" ) {
            next();
            } else {
                req.flash("error" , "You don't have permission to do that.");
                res.redirect("back");
            }
        }
    });
    //if not redirect
    } else {
        res.redirect("back");
        req.flash("error" , "You need to be logged in to do that.");
    }
};


module.exports = middlewareObj;