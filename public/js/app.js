//routing in static app.use in server.js
//this is where we do our jquery onclicks and also the ajax put/post to push the info into our api arrays

$(document).ready(function () {
    //GUEST
    var guestcontainer = $(".guestContent");
    var reservationcontainer = $(".reservationContent");
    var roomscontainer = $(".roomscontainer");

    var reservationtable = $("#reservationtable");

    var resroomscontainer = $(".room-search");


    //SEARCH ALL
    $("#searchAllGuests").on("click", function (event) {
        $.ajax({
            url: "/partial/allguests"
        }).then(function (data) {      
            guestcontainer.html(data);
        })
    });

    $("#currentGuests").on("click", function (event) {
        $.ajax({
            url: "/partial/inHouse"
        }).then(function (data) { 
            guestcontainer.html(data);
        })
    });

    $("#reservationArrivals").on("click", function(event){
        $.ajax({
            url: "/arrivals"
        }).then(function(data){
            reservationcontainer.html(data);
        })
    });
    $("#reservationDepartures").on("click", function(event){
        $.ajax({
            url: "/departures"
        }).then(function(data){
            reservationcontainer.html(data);

        });
    });
    $("#roomsOcupied").on("click", function(event){
        $.ajax({
            url : "/occupied"
        }).then(function(data){
            roomscontainer.html(data);
        });
    });

    $("#roomsAvailable").on("click", function(event){
        $.ajax({
            url : "/available"
        }).then(function(data){
            roomscontainer.html(data);
        });
    });


    
    $(".guestsearch").on("click", function(event){
        event.preventDefault();
      

        var condition = {
            first_name: $("#guestfirstname").val().trim(),
            last_name: $("#guestlastname").val().trim(),
            guest_phone: $("#guestphone").val().trim(),
            guest_email: $("#guestemail").val().trim(),

        }
        // console.log(condition);
        
        var values = Object.values(condition);
        // console.log(values);
        
        var parameter = "";
        for (var i = 0; i < values.length; i++){
            if(values[i] !== "") {parameter = values[i]}
        }
        
        console.log("this is the parameter " + parameter);  
        
        $.ajax({
            url : "/api/guests/" + parameter,
        }).then(function(data){

            var table = $("<table>");
            var thead = $("<thead>");
            var trh = $("<tr>");
            var trb = $("<tr>");
            var th1 = $("<th>");
            var th2 = $("<th>");
            var th3 = $("<th>");
            var th4 = $("<th>");
            var tbody = $("<tbody>");
            var td1 = $("<td>");
            var td2 = $("<td>");
            var td3 = $("<td>");
            var td4 = $("<td>");
            table.attr("class", "table is-fullwidth");
            table.append(thead);
            thead.append(trh);
            th1.text("FIRST NAME");
            th2.text("LAST NAME");
            th3.text("PHONE #");
            th4.text("EMAIL");
            td1.text(data.first_name);
            td2.text(data.last_name);
            td3.text(data.guest_phone);
            td4.text(data.guest_email);
            trh.append(th1);
            trh.append(th2);
            trh.append(th3);
            trh.append(th4);
            tbody.append(trh);
            table.append(tbody);
            tbody.append(trb);
            trb.append(td1);
            trb.append(td2);
            trb.append(td3);
            trb.append(td4);
            guestcontainer.html(table);
            
        });

    });


    $(".reservbyreserv").on("click", function(event){
        event.preventDefault();
        var condition = {
            id: $("#reservnumber").val().trim(),
            date_in: $("#reservdatein").val().trim(),
            date_out: $("#reservdateout").val().trim()
        }
        $.ajax({   
        url: "/api/reservations/reservation/search?id=" + condition.id + "&date_in="+ condition.date_in +"&date_out="+ condition.date_out
        }).then(function(data){
        console.log(data);
        });
    });

    $("#reservbyguest").on("click", function(event){
        event.preventDefault();
        var condition = {
            first_name: $("#reservfirstname").val().trim(),
            last_name: $("#reservlastname").val().trim(),
            guest_phone: $("#reservationphone").val().trim(),
            guest_email: $("#reservationemail").val().trim(),
            }
            $.ajax({
                url: "/api/reservations/guests/search?first_name=" + condition.first_name + "&last_name="+ condition.last_name +"&guest_phone="+ condition.guest_phone +"&guest_email="+ condition.guest_email
            }).then(function(data){
                console.log(data);
            });
    });

    $("#newreservationsearch").on("click", function(event){
        $.ajax({
            url : "/reservation/new/roomsearch"
        }).then(function(data){
            resroomscontainer.html(data);
        });
    });



});

//END DOC.READY