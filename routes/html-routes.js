var path = require("path");

module.exports = function(app){
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/index.html"));
        });

    app.get("/guests", function(req, res){
        res.sendFile(path.join(__dirname, "../public/guests.html"));
    });

    app.get("/reservations", function(req, res){
        res.sendFile(path.join(__dirname, "../public/reservations.html"));

    });

    app.get("/reservation/new", function(req, res){
        res.sendFile(path.join(__dirname, "../public/new-reservation.html"));
    });
};