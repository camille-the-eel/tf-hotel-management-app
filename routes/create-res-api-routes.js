var db = require("../models");
var moment = require('moment');
const { checkSchema } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = function (app) {

    //ROOM AVAILABILITY SEARCH FOR NEW RESERVATION | FORM METHOD = 
    app.get("/reservation/new/roomsearch", function (req, res) {
        console.log("HERE!");
        db.Reservation.findAll({
            attributes: ['date_in', 'date_out', 'RoomId']
        }).then(function (dbRooms) {
        
        
          res.json(dbRooms);
          console.log(dbRooms);
          console.log("Ahhhh", dbRooms[0].date_in);
        });
    });

    //CREATE RESERVATION BUTTON
    //GUEST INFORMATION | POST
    app.post("/reservation/new/create", function (req, res) {

    });
};