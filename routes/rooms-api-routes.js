var db = require("../models");

module.exports = function(app){

    app.get("/api/room/search", function(req, res){

        var validWhere = {}
      

        if (req.query.id){
            validWhere.id = req.query.id;

        }
        if (req.query.min_price && req.query.max_price){
            validWhere.price_per_night = {
                [db.Sequelize.Op.between]: [req.query.min_price, req.query.max_price]
            }
        }
        if (req.query.min_price){
            validWhere.price_per_night = {
                [db.Sequelize.Op.between]: [0, req.query.min_price]
            }
        }
        if (req.query.max_price){
            validWhere.price_per_night = {
                [db.Sequelize.Op.between]: [0, req.query.max_price]
            }
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
        console.log(validWhere);
        db.Rooms.findAll({
            where : validWhere
        }).then(function(dbRoom){
            res.json(dbRoom);
        });
    });



};