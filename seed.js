var mongoose    = require("mongoose"),
    Comment     = require("./models/comment"),
    Campground  = require("./models/campground");
    
var data = [
            {
            name:"Clouds Rest" , 
            image:"https://www.wildretreat.com/wp-content/uploads/2017/01/CWR-Cloud-Camp-View-Sunset-Empty-Pair-of-Chairs-5x3.jpg",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at nibh libero. Nunc non turpis a tortor scelerisque pharetra. Sed tempor, neque at semper luctus, quam arcu iaculis metus, a sagittis ligula felis vel sem. Curabitur vitae finibus ligula. Sed dui justo, faucibus viverra porta sed, hendrerit a tortor. Nunc tempus faucibus auctor. Aenean pellentesque turpis eget fermentum bibendum. Aenean convallis nisi sapien, nec auctor mi accumsan ut. Maecenas tempor mattis elementum. Vivamus a maximus arcu. Donec placerat tristique augue vel suscipit."
            },
            {
            name:"Desert Mesa" , 
            image:"https://cdn.pixabay.com/photo/2016/07/10/17/50/desert-1508107_960_720.jpg",
            description:"Sed nec ex ligula. Phasellus rhoncus elit sed urna sodales ornare. Vivamus eget hendrerit libero. Vestibulum vehicula lorem sed risus dapibus eleifend. Suspendisse commodo lorem id volutpat vulputate. Sed at dapibus leo. Pellentesque nec aliquet elit, id varius leo. Nam et lobortis enim. Donec scelerisque nisi a ligula ullamcorper, vel lobortis magna suscipit. Vestibulum eu mi eget velit rhoncus vehicula. Quisque et ultrices enim. Morbi lobortis tristique tellus sit amet scelerisque. Curabitur varius rhoncus pulvinar."
            },
            {
            name:"Clouds Rest" , 
            image:"https://jameskaiser.com/wp-content/uploads/2016/07/grand-canyon-river-trip-camping.jpg",
            description:"Donec eget arcu at enim varius aliquet condimentum vel erat. Vivamus iaculis scelerisque eros quis euismod. In vel lorem commodo justo mattis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc enim ipsum, fermentum sollicitudin diam eu, suscipit porttitor est. Etiam sollicitudin, purus vel egestas auctor, augue lacus laoreet risus, dignissim laoreet diam augue id elit. Aenean cursus cursus mi eget vestibulum. Integer luctus leo eget sem laoreet sollicitudin. In ipsum quam, porttitor id risus vitae, placerat sodales ipsum. Donec vehicula dolor suscipit justo venenatis, vel laoreet tortor dignissim."
            }
            ];
    
    function seedDB(){    
        //remove all
        Campground.remove({}, function(err){
            if (err) {
                console.log(err);
            } else {
          console.log("removed campgrounds!");
          //create campgroud
        //     data.forEach(function(seed){
        //         Campground.create(seed , function(err , campground){
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("Added campgrounds");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text:"This place is great but i wish there was internet!",
        //                         author:"Homer"
        //                     }, function(err , comment){
        //                         if (err) {
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                         }
        //                     });
        //             };
        //         });
        // });
            }
        });
    };
    module.exports = seedDB;