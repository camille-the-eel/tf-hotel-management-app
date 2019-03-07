var db = require("../models");

module.exports = function(app){
    app.get("/", function(req, res){
        db.Reservation.findAll().then(function(dbReservation){
            res.render("index", {dbReservation});
        });
    });
};