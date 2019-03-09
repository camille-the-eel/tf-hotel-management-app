var db = require("../models");
var moment = require('moment');


module.exports = function(app){
    app.get("/", function(req, res){
        db.Reservation.findAll().then(function(dbReservation){
            // res.render("index", {reservation : dbReservation});
            console.log("reservation data: ", dbReservation);
            db.Guest.findAll({
                where : {
                    
                }
            }).then(function(dbGuest){
                // console.log("guest data: ", dbGuest);
                res.render("index", {
                    guest : dbGuest,
                    reservation : dbReservation
                });
                
            });
        });
        
        
        
    });
    // app.get("/", function(req, res){
       
        
    // });


    app.get("/reservation/new", function(req, res){
        db.Rooms.findAll({}).then(function(dbRooms){
            res.render("new-reservation", {rooms : dbRooms});
        });
    });
};