var db = require("../models");
var moment = require('moment');
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

module.exports = function (app) {

//===========================================================================
//RENDERING IN EJS PARTIALS FOR NEW-RESERVATION HTML

    //NEW RESERVATION SEARCH PARTIAL
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

    //PREVIOUS GUEST SEARCH PARTIAL
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

    //CREATE NEW GUEST | POST
    app.post("/reservation/new/createguest", [

        check('first_name')
            .isLength({ min: 3, max: 50 })
            .trim(),
        check('last_name')
            .isLength({ min: 2, max: 50 })
            .trim(),
        check('guest_phone')
            .isMobilePhone(),
        check('guest_email')
            .isEmail()
            .normalizeEmail(),
        check('credit_card_number')
            .isCreditCard(),
        sanitize('notifyOnReply').toBoolean()

    ], function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        console.log("BODY!!!!!", req.body);
        //credit card type and expiration are not within body???

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
            console.log("BODY", req.body);
            
            db.Guest.findAll({
                where: {
                    id: data.id
                }
            }).then(function(dbGuest){
                console.log("dbGuest", dbGuest);
                res.render("partials/new-guest", {layout: false, newGuest : dbGuest});

            });
        });
    });


    //CREATE RESERVATION BUTTON
    // :(
};