var db = require("..models/");

module.exports = function(app){

    app.get("/api/reservations", function(req, res){
        var query = {};
        if (req.query.guest)
    });
};