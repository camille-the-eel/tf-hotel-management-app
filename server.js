var express = require("express");
var app = express();
var PORT = process.env.PORT || 9999;
var db = require("./models");
var path = require("path");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


require("./routes/html-routes")(app);
require("./routes/guests-api-routes")(app);
require("./routes/reservations-api-routes")(app);
require("./routes/rooms-api-routes")(app);
require("./routes/new-res-api-routes")(app);

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("listening on: " + PORT);
    });
});

