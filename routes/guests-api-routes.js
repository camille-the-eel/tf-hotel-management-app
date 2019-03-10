var db = require("../models");

module.exports = function(app){
    app.get("/api/guests/all", function(req, res){
        db.Guest.findAll({
            include: [db.Reservation]
        }).then(function(dbGuest){
            res.json(dbGuest);
        });
    });
    app.get("/api/guests/:id", function(req, res){
        db.Guest.findOne({
            where:
            {
                id: req.params.id
            }
        }).then(function(dbGuest){
            
            res.json(dbGuest);
        });
    });
    app.post("/api/guests", function(req, res){
        db.Guest.create(req.body).then(function(dbGuest){
            res.json(dbGuest);
        });
    });

    app.delete("/api/guests/:id", function(req, res){
        db.Guest.destroy({
            where :{
                id : req.params.id
            }
        }).then(function(dbGuest){
            res.json(dbGuest);
        });
    });
    // Testing post
    app.post("/api/guests", function(req, res){
        console.log(req.body);
    });

};


