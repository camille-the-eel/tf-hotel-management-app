var db = require("../models");

module.exports = function(app){

    app.get("/api/room/search", function(req, res){

        var validWhere = {}

        if (req.query.id){
            validWhere.id = req.query.id;

        }
        if (req.query.price_per_night){
            validWhere.price_per_night = req.query.price_per_night;
        }
        if (req.query.bed_type){
            validWhere.bed_type = req.query.bed_type;
        }
        if (req.query.number_of_beds){
            validWhere.number_of_beds = req.query.number_of_beds;
        }
        if (req.query.max_occupancy){
            validWhere.max_occupancy = req.query.max_occupancy;
        }
        if (req.query.adjoining){
            validWhere.adjoining = req.query.adjoining;
        }
        if (req.query.jacuzzi){
            validWhere.jacuzzi = req.query.jacuzzi;
        }
        if (req.query.balcony){
            validWhere.balcony = req.query.balcony;
        }
        if (req.query.smoke){
            validWhere.smoke = req.query.smoke;
        }

        db.Rooms.findAll({
            where : validWhere
        }).then(function(dbRoom){
            res.json(dbRoom)
        });
    });


};