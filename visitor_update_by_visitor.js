// require('server');
const mongoose = require("mongoose");
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
var QRCode = require('qrcode')
module.exports = function (app) {


  const User = mongoose.model("User");


  app.get("/visitor_update_by_visitor", function (req, res) {
    res.redirect("/profile");
  });


  app.post("/visitor_update_by_visitor", function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    console.log(username);  //v1000001
    console.log(req.user.name); //Saloni
    console.log(req.user); //Saloni

    User.findOne({ username: username }, function (err, user) {
      if (err) {
        console.log(err)
      }
      else {
        if (user) {
          User.updateOne({ username: req.body.username }, { name: req.body.name, email: req.body.email, mobile: req.body.mobile, address: req.body.address, inDate: req.body.indate, outDate: req.body.outdate }, function (err) {
            // User.find({username:{ $regex: /^v/ }},function(err,check){
            //console.log(req.body);
            // console.log("hi");
            // console.log(req.user.outDate);
            if (err)
              console.log(err);
            else {
              // console.log(user.email);
              // user = {
              //   "name": req.body.name,
              //   "sex": req.body.sex,
              //   "username": req.body.username,
              //   "address": req.body.address,
              //   "email": req.body.email,
              //   "mobile": req.body.mobile,
              //   "aadhar": req.body.aadhar,
              //   "password": "",
              // "status": ""
              // }
              req.session.message = {
                type: 'success',
                intro: 'Updated',
                message: 'Details updated successfully'
              }
              QRCode.toDataURL(req.user.username, function (err, img) {
                res.render("visitor_profile.ejs", { Visitor_Name: username, visitor: user, qr_code: img, message: req.session.message });
              });

              // res.render("visitor_profile.ejs",{Visitor_Name:req.user.name,visitor:user,message:req.session.message});
              // res.redirect("/profile");


            };

            // res.redirect("/");
            // }
          });
          // res.redirect("/profile");
          // });
        }


      }
    })
  });
  //other routes..
}
