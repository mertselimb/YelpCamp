var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware= require("../middleware");

//------------------------------------------------------------------------------
//                            INDEX - SHOW ALL
//------------------------------------------------------------------------------
router.get("/" , function(req,res){
    Campground.find({},function(err, allcampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index" , {campgrounds:allcampground});
        };
    });
});
//------------------------------------------------------------------------------
//                        CREATE - add new campground
//------------------------------------------------------------------------------
router.post("/", middleware.isLoggedIn ,   function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampground = {name: name, image: image , description: desc , author: author};
    Campground.create(newCampground , function(err , args){
       if (err) {
           console.log(err);
       }else{
            req.flash("success" , "Campground created.");
            res.redirect("/campgrounds");
       };
    });
});
//------------------------------------------------------------------------------
//                  NEW - show form to create new campgrounds
//------------------------------------------------------------------------------
router.get("/new" , middleware.isLoggedIn ,   function(req,res){
    // find the campgroudn with provided id
    //render show template with show campground
    res.render("campgrounds/new");
});
//------------------------------------------------------------------------------
//                      SHOW - show selected campground
//------------------------------------------------------------------------------
router.get("/:id" , function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){
        if (err) {
           console.log(err);
       } else {
            res.render("campgrounds/show" , {campground : foundCampground});
       };
    });
});    
//------------------------------------------------------------------------------
//                       EDIT - show update campground site
//------------------------------------------------------------------------------

router.get("/:id/edit" ,middleware.checkCampgroundOwnership , function(req, res) {
    Campground.findById(req.params.id , function(err , foundCampground){
        res.render("campgrounds/edit" , {campground : foundCampground});
    });
});
//------------------------------------------------------------------------------
//                          UPDATE - update campground
//------------------------------------------------------------------------------

router.put("/:id" ,middleware.checkCampgroundOwnership ,  function(req , res){
   Campground.findByIdAndUpdate(req.params.id , req.body.campground , function(err , updatedCampground){
       if (err) {
           res.redirect("/campgrounds");
           req.flash("error" , "Campground not found.");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
           req.flash("success" , "Campground updated.");
       };
   }); 
});

//------------------------------------------------------------------------------
//                          Destroy - destroy campground
//------------------------------------------------------------------------------

router.delete("/:id" ,middleware.checkCampgroundOwnership ,  function(req , res){
   Campground.findByIdAndRemove(req.params.id , function(err){
       if (err) {
           res.redirect("/campgrounds");
           req.flash("error" , "Campground not found.");
       } else {
           res.redirect("/campgrounds");
           req.flash("success" , "Campground deleted.");
       };
   });     
});




module.exports = router;