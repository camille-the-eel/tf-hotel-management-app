var db = require("../models");
var moment = require('moment');


module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Reservation.findAll().then(function (dbReservation) {
            // res.render("index", {reservation : dbReservation});
            console.log("reservation data: ", dbReservation);
            db.Guest.findAll({}).then(function (dbGuest) {
                // console.log("guest data: ", dbGuest);
                db.Rooms.findAll({}).then(function (dbRooms) {
                    // console.log("rooms data: ", dbRooms);
                    db.Reservation_Room.findAll({
                        where: {
                            in_house : 1
                        }
                    }).then(function (dbReservationRoom) {
                        console.log("reservation room data: ", dbReservationRoom);

                        res.render("index", {
                            guest: dbGuest,
                            reservation: dbReservation,
                            room : dbRooms,
                            reservation_room: dbReservationRoom
                        });
                    });
                });

            });
        });

    });




    app.get("/reservation/new", function (req, res) {
        db.Rooms.findAll({}).then(function (dbRooms) {
            res.render("new-reservation", { rooms: dbRooms });
        });
    });
};