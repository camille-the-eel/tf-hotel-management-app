var db = require("../models");


module.exports = function(app){
    app.get("/api/guests/all", function(req, res){
        db.Guest.findAll({
            include: [db.Reservation]
        }).then(function(dbGuest){
            res.json(dbGuest);
        });
    });
    app.get("/api/guests/:condition", function(req, res){
        db.Guest.findOne({
            where:
            {
                $or : [{id: req.params.condition}, {first_name: req.params.condition}, {last_name: req.params.condition},{guest_phone: req.params.condition},{guest_email: req.params.condition}]
            }
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
    app.post("/api/searchGuest", function(req, res){
        console.log(req.body);
        db.Guest.findOne({
            
            where: [req.body]

        }).then(function(dbGuest){
            console.log(dbGuest);

            res.render("searchguest", {layout:false, searchguest: dbGuest});
            
        });
    });
    

};


