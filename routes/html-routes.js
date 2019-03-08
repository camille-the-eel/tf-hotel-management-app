var db = require("../models");
var moment = require('moment');


module.exports = function(app){
    app.get("/", function(req, res){
        db.Reservation.findAll().then(function(dbReservation){
            res.render("index", {reservation : dbReservation});
        });
    });

    app.get("/", function(req, res){
        db.Guest.findAll().then(function(dbGuest){
            res.render("index", {guest : dbGuest});
        });
    });

    app.get("/reservation/new", function(req, res){
        db.Rooms.findAll({}).then(function(dbRooms){
            res.render("new-reservation", {rooms : dbRooms});
        });
    });
};