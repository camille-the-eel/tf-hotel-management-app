var db = require("../models");
var moment = require('moment');
const { checkSchema } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = function (app) {

//===========================================================================
//RENDERING IN EJS PARTIALS FOR NEW-RESERVATION HTML

    // NEW RESERVATION SEARCH PARTIAL
    app.get("/reservation/new/roomsearch", function (req, res, next) {

        db.Reservation.findAll({
            include: [db.Rooms]
        }).then(function (dbRooms) {

            var startDate = req.query.start_date;
            var endDate = req.query.end_date;
            var validRooms = [];

            for (i = 0; i < dbRooms.length; i++) {

                if (moment(startDate).isBetween(dbRooms[i].date_in, dbRooms[i].date_out, 'day','[)') === false && moment(endDate).isBetween(dbRooms[i].date_in, dbRooms[i].date_out, 'day','[]') === false) {
                    validRooms.push(dbRooms[i]);
                } 
            }
            console.log(validRooms);
            res.render("partials/new-reservation-search", {layout: false, validRoom : validRooms});
            // res.json(validRooms);
        });
    });

    //NEW RESERVATION PREVIOUS GUEST SEARCH PARTIAL
    app.get("/reservation/new/previousguestsearch", function(req, res){

        var validWhere = {};

        if(req.query.first_name) {
            validWhere.first_name = req.query.first_name;
        }
        if(req.query.last_name) {
            validWhere.last_name = req.query.last_name;
        }
        if(req.query.guest_email) {
            validWhere.guest_email = req.query.guest_email;
        }
        if(req.query.guest_phone) {
            validWhere.guest_phone = req.query.guest_phone;
        }

        db.Guest.findAll({
            where: validWhere
        }).then(function(dbGuest){
            res.render("partials/previous-guests", {layout: false, Guest : dbGuest});
        });
    });

    //CREATE RESERVATION BUTTON

    //CREATE NEW GUEST | POST
    app.post("/reservation/new/createguest", function (req, res) {
        db.Guest.create({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            guest_phone: req.body.guest_phone,
            guest_email: req.body.guest_email,
            guest_notes: req.body.guest_notes,
            credit_card_number: req.body.credit_card_number,
            credit_card_type: req.body.credit_card_type,
            credit_card_expiration: req.body.credit_card_expiration
        }).then(function(data) {
            console.log(req.body);
            console.log(req.body.first_name);
            res.json({ newGuest: data});
        })
    });
};