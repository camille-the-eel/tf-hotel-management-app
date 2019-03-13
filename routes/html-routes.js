var db = require("../models");
var moment = require('moment');


module.exports = function (app) {
    app.get("/", function (req, res) {

        

        var cur = {
            query: {
                cur_date: moment(new Date).format('YYYY-MM-DD')
            }
        };
        db.Reservation.findAll({
            include:[db.Guest],
            where: {
                date_in: 
                { 
                    [db.Sequelize.Op.and]: [
                        cur.query.cur_date
                    ]
                }
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
                            include : [db.Guest], 
                            where: {
                                date_out:
                                { 
                                    [db.Sequelize.Op.and]: [
                                        cur.query.cur_date
                                    ]
                                }
                            }
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
   
    //CREATE NEW RESERVATION HTML PAGE ROUTE
    app.get("/reservation/new", function (req, res) {
    
    db.Rooms.findAll({}).then(function (dbRooms) {
        res.render("new-reservation", { rooms: dbRooms });
    });

    });

//===========================================================================
//RENDERING IN EJS PARTIALS FOR INDEX HTML

    //GUESTS CURRENTLY IN HOUSE | GET
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

    //COMPLETE GUEST LIST | GET
    app.get("/partial/allguests", function (req, res) {
        db.Guest.findAll({}).then(function (dbGuest) {
            res.render("partialAllGuests", { layout: false, Guest: dbGuest });
        })
    });

  
    //ARRIVALS FOR TODAY LIST | GET
    app.get("/arrivals", function (req, res) {
        var cur = {
            query: {
                cur_date: moment(new Date).format('YYYY-MM-DD')
            }
        };
        db.Reservation.findAll({
            include: [db.Guest],
            where: {
                date_in: 
                { 
                    [db.Sequelize.Op.and]: [
                        cur.query.cur_date
                    ]
                }
            }
        }).then(function (dbReservation) {
            res.render("arrivals", {layout : false, Reservation : dbReservation});
        });
    });

    //DEPARTURES FOR TODAY LIST | GET
    app.get("/departures", function (req, res) {
        var cur = {
            query: {
                cur_date: moment(new Date).format('YYYY-MM-DD')
            }
        };
        db.Reservation.findAll({
            include: [db.Guest],
            where: {
                date_out:
                { 
                    [db.Sequelize.Op.and]: [
                        cur.query.cur_date
                    ]
                }
            }
        }).then(function (dbReservation) {
            res.render("departures", {layout : false, Reservation2 : dbReservation});  
        });
    });

    //OCCUPIED ROOMS | GET
    app.get("/occupied", function(req, res){
        db.Rooms.findAll({
            where : {
                occupied : 1
            }
         }).then(function(dbRooms){
             res.render("occupied", {layout : false, Room : dbRooms })
         });
    });

    //ROOMS AVAILABLE TODAY | GET
    app.get("/available", function(req, res){
        db.Rooms.findAll({
            where : {
                occupied : 0
            }
        }).then(function(dbRooms){
            res.render("available", {layout: false, Room2:dbRooms })
        });
    });

    //SEARCH GUEST THAT IS NOT WORKING
    app.post("/", function(req, res){

        console.log("THIS IS A STRING");
        db.Guest.findAll({where : [req.query]}).then(function(dbGuest){
            
      res.render("searchguest", {layout: false, searchguest: dbGuest});

      });
     });
   
    // app.post("/rooms", function(req, res){
    //     db.Rooms.findAll({where: {
    //         date_in: req.body.date_in
    //     }}).then(function(dbRooms){res.render("rooms", {rooms: dbRooms})});
    // });
    // app.get("/rooms", function(req, res){

    //     res.render("rooms");
    // });
    };