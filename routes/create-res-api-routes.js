var db = require("../models");
var moment = require('moment');
const { checkSchema } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = function (app) {

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
  
    //CREATE RESERVATION BUTTON
    //GUEST INFORMATION | POST
    app.post("/reservation/new/create", function (req, res) {

    });
};