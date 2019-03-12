var db = require("../models");
var moment = require('moment');

module.exports = function (app) {
    app.get("/reservation/new/roomsearch", function (req, res) {
        db.Reservation.findAll({
            include: [db.Rooms],
            where: {
                
            }
        }).then(function (dbRoomsAvailable) {
            // res.render("partialCurrent", { layout: false, reservation_room: dbReservationRoom });
        })
    });

};