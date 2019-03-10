var db = require("../models");
var moment = require('moment');


module.exports = function (app) {
    app.get("/", function (req, res) {

        db.Reservation.findAll({
            include:[db.Guest],
            where: {
                date_in: "Sun Mar 10 2019 20:00:00 GMT-0400 (Eastern Daylight Time)",
            }
        }).then(function (dbReservation) {
            // res.render("index", {reservation : dbReservation});
            // console.log("reservation data: ", dbReservation);
            db.Guest.findAll({}).then(function (dbGuest) {
                // console.log("guest data: ", dbGuest);
                db.Rooms.findAll({
                    where : {
                        occupied : 1
                    }
                }).then(function (dbRooms) {


                    // console.log("rooms data: ", dbRooms);
                    db.Reservation_Room.findAll({
                        include: [{
                            model: db.Reservation,
                            include: [db.Guest]
                        }],
                        where: {
                            in_house: 1
                        }
                    }).then(function (dbReservationRoom) {

                        db.Reservation.findAll({
                            where: {date_out: "Sun Mar 10 2019 20:00:00 GMT-0400 (Eastern Daylight Time)"},
                            include : [db.Guest]
                        }).then(function(dbReserv){

                            db.Rooms.findAll({
                                where : {
                                    occupied : 0
                                }
                            }).then(function(dbRooms2){
                                res.render("index", {
                                    Guest: dbGuest,
                                    Reservation: dbReservation,
                                    Reservation2: dbReserv,
                                    Room: dbRooms,
                                    Room2 : dbRooms2,
                                    reservation_room: dbReservationRoom
                            })

                            });

                            
                        // console.log("reservation room data: ", dbReservationRoom);

                        
                        });
                    });
                });

            });
        });

    });
   
    //Rendering in partials instead of index

    app.get("/partial/inHouse", function (req, res) {
        db.Reservation_Room.findAll({
            include: [{
                model: db.Reservation,
                include: [db.Guest]
            }],
            where: {
                in_house: 1
            }
        }).then(function (dbReservationRoom) {
            res.render("partialCurrent", { layout: false, reservation_room: dbReservationRoom });
        })
    });

    app.get("/partial/allguests", function (req, res) {
        db.Guest.findAll({}).then(function (dbGuest) {
            res.render("partialAllGuests", { layout: false, Guest: dbGuest });
        })
    });

  

    app.get("/arrivals", function (req, res) {
        db.Reservation.findAll({
            include: [db.Guest],
            where: {
                date_in: "Sun Mar 10 2019 20:00:00 GMT-0400 (Eastern Daylight Time)"
            }

        }).then(function (dbReservation) {
            res.render("arrivals", {layout : false, Reservation : dbReservation});
            
        });
    });
    app.get("/departures", function (req, res) {
        db.Reservation.findAll({
            include: [db.Guest],
            where: {
                date_out: "Sun Mar 10 2019 20:00:00 GMT-0400 (Eastern Daylight Time)"
            }

        }).then(function (dbReservation) {
            res.render("departures", {layout : false, Reservation2 : dbReservation});
            
        });
    });
    app.get("/occupied", function(req, res){
        db.Rooms.findAll({
            where : {
                occupied : 1
            }
         }).then(function(dbRooms){
             res.render("occupied", {layour : false, Room:dbRooms })
         });
    });
    app.get("/available", function(req, res){
        db.Rooms.findAll({
            where : {
                occupied : 0
            }
        }).then(function(dbRooms){
            res.render("available", {layout: false, Room2:dbRooms })
        });
    });

    






        app.get("/reservation/new", function (req, res) {
            db.Rooms.findAll({}).then(function (dbRooms) {
                res.render("new-reservation", { rooms: dbRooms });
            });
        });
    };