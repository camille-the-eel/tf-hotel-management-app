var db = require("../models");


module.exports = function(app){
    app.get("/api/guests/all", function(req, res){
        db.Guest.findAll({
            include: [db.Reservation]
        }).then(function(dbGuest){
            res.json(dbGuest);
        });
    });
    app.get("/api/guests/search", function(req, res){

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
            where:validWhere
            
        }).then(function(dbGuest){
            
            res.json(dbGuest);
        });
    });


    app.post("/api/guests/new", function(req, res){
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
    

};


