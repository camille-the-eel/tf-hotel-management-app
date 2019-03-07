var express = require("express");
var app = express();
var PORT = process.env.PORT || 9999;
var db = require("./models");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));
app.use("view engine", "EJS");

require("./routes/html-routes")(app);
require("./routes/guests-api-routes")(app);

db.sequelize.sync({ force: true }).then(function(){
    app.listen(PORT, function(){
        console.log("listening on: " + PORT);
    });
});

