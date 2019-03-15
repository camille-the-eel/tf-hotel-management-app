var db = require("../models");

module.exports = function(app){

    app.get("/api/reservations/reservation/search", function(req, res){
        console.log(req.query.id);
        console.log(req.query.date_in);
        console.log(req.query.date_out);

        // let idWhere = req.query.id ? {id: req.query.id} : {};
        // let dateInWhere = req.query.date_in ? {date_in: req.query.date_in} : {};
        // let dateOutWhere = req.query.date_out ? {date_out: req.query.date_out} : {};
        var validWhere = {};
        if (req.query.id) {
            validWhere.id = req.query.id;
        }
        if (req.query.date_in) {
            validWhere.date_in = req.query.date_in;
        }
        if (req.query.date_out) {
            validWhere.date_out = req.query.date_out;
        }

        console.log(validWhere);

        db.Reservation.findAll({
            where: validWhere
            // [db.Sequelize.Op.or] : [{id: req.params.condition}, {date_in:req.params.condition}, {date_out:req.params.condition}]
            ,
            include: db.Guest
        }).then(function(dbReservation){
            res.json(dbReservation);
        });
    });

    app.get("/api/reservations/guests/search", function(req, res){
        console.log(req.query.first_name);
        console.log(req.query.last_name);
        console.log(req.query.guest_phone);
        console.log(req.query.guest_email);

        var validWhere = {};
        if (req.query.first_name) {
            validWhere.first_name = req.query.first_name;
        }
        if (req.query.last_name) {
            validWhere.last_name = req.query.last_name;
        }
        if (req.query.guest_phone) {
            validWhere.guest_phone = req.query.guest_phone;
        }
        if (req.query.guest_email) {
            validWhere.guest_email = req.query.guest_email;
        }

        db.Guest.findAll({
            where: validWhere,
            include : db.Reservation
           
        }).then(function(dbGuest){
            res.json(dbGuest);
        });
    });

    app.get("/api/reservations/canceled/search", function(req, res){

        var validWhere = {}

        if (req.query.id){
            validWhere.id = req.query.id
        }
        if (req.query.canceled){
            validWhere.canceled = req.query.canceled
        }
        
        db.Reservation_Room.findAll({
            where : {
                canceled : true
            },
           
            include: [{
                model: db.Reservation,
                where: {
                    id: req.query.id
                },
                include: [db.Guest]
            }]
            
        }).then(function(dbCanceled){
            res.json(dbCanceled);
        });
    });
    app.get("/api/reservations/checkin", function(req, res){
        db.Reservation_Room.findAll({
            where : {
                in_house :0
            }
        }).then(function(dbReservations){
            res.json(dbReservations);
        });
    });
    app.put("/api/reservations/checkin/:id", function(req, res){
        db.Reservation_Room.update([{in_house : 1}, {check_in: [moment(new Date).format('YYYY-MM-DD HH:mm:ss')] }],{ 
            where: {ReservationId: req.params.id}
        }).then(function(dbReservations){
            res.json(dbReservations);
        });
    });

    app.get("/api/reservations/checkout", function(req, res){
        console.log(req.body);
        db.Reservation_Room.findAll({
            where : {
                in_house :1
            }
        }).then(function(dbReservations){
            res.json(dbReservations);
        });
    });
    app.put("/api/reservations/checkout/:id", function(req, res){
        db.Reservation_Room.update({in_house : 0},{
            where: {ReservationId :req.params.id}
        }).then(function(dbReservations){
            res.json(dbReservations);
        });
    });


    
        
};