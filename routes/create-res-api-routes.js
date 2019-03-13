var db = require("../models");
var moment = require('moment');
const { checkSchema } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = function (app) {

    //ROOM AVAILABILITY SEARCH FOR NEW RESERVATION | FORM METHOD = 
    app.get("/reservation/new/roomsearch", function (req, res) {
        db.Reservation.findAll({
            include: [db.Rooms],
            where: {
                
            }
        }).then(function (dbRoomsAvailable) {

        });
    });

    //CREATE RESERVATION BUTTON
    //GUEST INFORMATION | POST
    app.post("/reservation/new/create", function (req, res) {

    });
};