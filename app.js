var passportLocalMongoose = require("passport-local-mongoose"),
    localStrategy         = require("passport-local"),
    User                  = require("./models/user"),
    Campground            = require("./models/campground"),
    passport              = require("passport"),
    methodOverride        = require("method-override"),
    Comment               = require("./models/comment"),
    flash                 = require("connect-flash"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    express               = require("express"),
    seedDB                = require("./seed"),
    app                   = express();
    
var campgroundRoutes      = require("./routes/campgrounds"),
    commentsRoutes        = require("./routes/comments"),
    indexRoutes            = require("./routes/index");
    
//artidokuz:Msst.310216@ds143754.mlab.com:43754/yelp-camp
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp" 
mongoose.connect(url);


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();//Seed database

//------------------------------------------------------------------------------
//                            Passport
//------------------------------------------------------------------------------
app.use(require("express-session")({
    secret: "el psy congroo",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req , res , next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use("/campgrounds" , campgroundRoutes);
app.use("/campgrounds/:id/comments" , commentsRoutes);



app.listen(process.env.PORT , process.envIP,function(){
   console.log("YelpCamp has started!") ;
});

