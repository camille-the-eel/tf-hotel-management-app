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


            for (i = 0; i < dbRooms.length; i++) {

                startDate = req.query.start_date;
                endDate = req.query.end_date;
                validRooms = [];

                if (moment(startDate).isBetween(dbRooms[i].date_in, dbRooms[i].date_out, 'day','[)') === false && moment(endDate).isBetween(dbRooms[i].date_in, dbRooms[i].date_out, 'day','[]') === false) {
                    // console.log("ROOM AVAILABLE: ID: ", dbRooms[i].id, " Date In: ", dbRooms[i].date_in, " Date Out: ", dbRooms[i].date_out);
                    validRooms.push(dbRooms[i]);
                    // console.log("Success!", " startDate: ", startDate, " endDate: ", endDate, " date_in: ", dbRooms[i].date_in, " date_out: ", dbRooms[i].date_out);
                } 
            }
            console.log(validRooms);
            res.render("partials/new-reservation-search", {layout: false, validRoom : validRooms});
            // res.json(validRooms);
        });
    });


    //ROOM AVAILABILITY SEARCH FOR NEW RESERVATION | GET
    // app.get("/reservation/new/roomsearch", function (req, res, next) {

    //     db.Reservation.findAll({
    //         include: [db.Rooms]
    //     }).then(function (dbRooms) {

    //         var startDate = req.query.start_date;
    //         var endDate = req.query.end_date;
    //         var validRooms = [];

    //         // if (moment(startDate).isBetween(dbRooms[0].date_in, dbRooms[0].date_out, 'day','[)') === false && moment(endDate).isBetween(dbRooms[0].date_in, dbRooms[0].date_out, 'day','[]') === false) {
    //         //     console.log("Success!", " startDate: ", startDate, " endDate: ", endDate, " date_in: ", dbRooms[0].date_in, " date_out: ", dbRooms[0].date_out);
    //         // } else if (moment(startDate).isBetween(dbRooms[0].date_in, dbRooms[0].date_out, 'day','[)') === true) {
    //         //     console.log("Start date is overlapping");
    //         // } else if (moment(endDate).isBetween(dbRooms[0].date_in, dbRooms[0].date_out, 'day','[]') === true)
    //         //     console.log("End date is overlapping");

    //         // console.log("startDate: ", startDate);
    //         // console.log("endDate: ", endDate);
    //         // console.log("date_in: ", dbRooms[0].date_in);
    //         // console.log("date_out: ", dbRooms[0].date_out);

    //         // var test = moment(startDate).isBetween(dbRooms[0].date_in, dbRooms[0].date_out, 'day','[)')

    //         // var test2 = moment(endDate).isBetween(dbRooms[0].date_in, dbRooms[0].date_out, 'day','[]')

    //         // console.log("Test: ", test);
    //         // console.log("Test2: ", test2);

    //         for (i = 0; i < dbRooms.length; i++) {
    //             if (moment(startDate).isBetween(dbRooms[i].date_in, dbRooms[i].date_out, 'day','[)') === false && moment(endDate).isBetween(dbRooms[i].date_in, dbRooms[i].date_out, 'day','[]') === false) {
    //                 // console.log("ROOM AVAILABLE: ID: ", dbRooms[i].id, " Date In: ", dbRooms[i].date_in, " Date Out: ", dbRooms[i].date_out);
    //                 validRooms.push(dbRooms[i]);
    //                 // console.log("Success!", " startDate: ", startDate, " endDate: ", endDate, " date_in: ", dbRooms[i].date_in, " date_out: ", dbRooms[i].date_out);
    //             } 
    //         }
    //         console.log(validRooms);
    //         res.render("partialCreateRes", {layout: false, availableRooms : validRooms});
    //         // res.json(dbRooms);

    //     });
    // });
  

    //NEW RESERVATION SEARCH PARTIAL
    // app.get("/reservation/new/roomsearch", function (req, res) {
    //     var startDate = req.query.start_date;
    //     var endDate = req.query.end_date;

    //     db.Reservation.findAll({
    //         include: [db.Guest]
    //     }).then(function (dbGuest) {
    //         db.Guest.findAll({
    //         include: [db.Rooms], 
    //         where: {
    //             [db.Sequelize.Op.and]: [
    //                 {
    //                     date_in: { 
    //                         [db.Sequelize.Op.notBetween] : [
    //                             { value: startDate, inclusive: true} , {value: endDate, inclusive: false }
    //                         ] 
    //                     }   
    //                 },
    //                 {
    //                     date_out: { 
    //                         [db.Sequelize.Op.notBetween] : [
    //                             { value: startDate, inclusive: true} , {value: endDate, inclusive: true }
    //                         ] 
    //                     }   
    //                 }
    //             ]
    //         }
    //     }).then(function (dbRooms) {
    //         console.log(dbRooms);
    //         res.render("partials/new-reservation-search", {layout: false, Rooms : dbRooms});
    //         });
    //     });
    // });

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
    app.post("/reservation/new/guest", function (req, res) {
        
    });
};