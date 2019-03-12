var db = require("../models");

module.exports = function(app){

    app.get("/api/reservations/:condition", function(req, res){
        db.Reservation.findOne({
            include : [{
                model: db.Guest,
                where : {
                   first_name: req.params.condition
                }
            }],
            where : {
                id: req.params.condition
            }
        }).then(function(dbReservation){
            res.json(dbReservation);
        })
    });

    // app.get("/api/reservations/Canceled/:condition", function(req, res){
    //     db.Reservation_Room.findOne({
    //         include: [{
    //             model: db.Reservation,
    //             include: [db.Guest]
    //         }],
    //         where: {
    //             canceled: req.params.condition
    //         }
    //     }).then(function(dbReservation){
    //         res.json(dbReservation);
    //     });
    // });
        
};