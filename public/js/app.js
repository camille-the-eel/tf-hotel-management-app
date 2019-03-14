//routing in static app.use in server.js
//this is where we do our jquery onclicks and also the ajax put/post to push the info into our api arrays

$(document).ready(function () {

//===================================================================
//INDEX HTML PAGE 

    //CONTAINERS
    var guestcontainer = $(".guestContent");
    var reservationcontainer = $(".reservationContent");
    var roomscontainer = $(".roomscontainer");

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
        
        $.ajax({
            url : "/api/guests/search?first_name=" + condition.first_name + "&last_name=" + condition.last_name + "&guest_phone=" + condition.guest_phone + "&guest_email" + condition.guest_email
        }).then(function(data){

            for (var i = 0; i < data.length; i++){
                data = data[i]
            }

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
        $(".reservtablebody").empty();

        var condition = {
            id: $("#reservnumber").val().trim(),
            date_in: $("#reservdatein").val().trim(),
            date_out: $("#reservdateout").val().trim()
        }
        $.ajax({   
        url: "/api/reservations/reservation/search?id=" + condition.id + "&date_in="+ condition.date_in +"&date_out="+ condition.date_out
        }).then(function(data){
        

            for (var i = 0; i < data.length; i++){
                
                console.log("firstname "+data[i].Guest.first_name);

                $(".reservtablebody").append("<tr>");
                $(".reservtablebody").append("<td>" + data[i].id + "</td>" );
                $(".reservtablebody").append("<td>" + data[i].Guest.first_name + " " + data[i].Guest.last_name+"</td>" );
                $(".reservtablebody").append("<td>" + data[i].date_in + "</td>" );
                $(".reservtablebody").append("<td>" + data[i].date_out + "</td>" );
                $(".reservtablebody").append("<td>" + data[i].RoomId + "</td>" );
               
                //UPDATE BUTTON
                $(".reservtablebody").append("<td>");
                $(".reservtablebody").append(" <form action = '/api/updateRes' method = 'POST'>");
                $(".reservtablebody").append("<div class='field is-horizontal'>");
                $(".reservtablebody").append("<div class='field-body'>");
                $(".reservtablebody").append("<div class='field has-addons'>");
                $(".reservtablebody").append("<div class = 'control'>");
                $(".reservtablebody").append("<input  class = 'button update-res' type = 'submit' value = 'UPDATE'>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</form>");
                $(".reservtablebody").append("</td>");

                //CANCEL BUTTON
                $(".reservtablebody").append("<td>");
                $(".reservtablebody").append("<form action = '/api/cancelRes' method = 'POST'>");
                $(".reservtablebody").append("<div class='field is-horizontal'>");
                $(".reservtablebody").append("<div class='field-body'>");
                $(".reservtablebody").append("<div class='field has-addons'>");
                $(".reservtablebody").append("<div class = 'control'>");
                $(".reservtablebody").append("<input  class = 'button cancel-res' type = 'submit' value = 'X'>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</div>");
                $(".reservtablebody").append("</form>");
                $(".reservtablebody").append("</td>");
                $(".reservtablebody").append("</tr>");

                



            }
            

        });
    });

    $(".reservbyguest").on("click", function(event){
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
                // console.log(data[0].Reservations);
                $(".reservtablebody").empty();

                for (var i = 0; i < data.length; i ++){
                    for (var j = 0; j < data[i].Reservations.length; j++){
                        
                        console.log(data[i].Reservations[j].id);
                       

                        $(".reservtablebody").append("<tr>");
                        $(".reservtablebody").append("<td>" + data[i].Reservations[j].id + "</td>" );
                        $(".reservtablebody").append("<td>" + data[i].first_name + " " + data[i].last_name+"</td>" );
                        $(".reservtablebody").append("<td>" + data[i].Reservations[j].date_in + "</td>" );
                        $(".reservtablebody").append("<td>" + data[i].Reservations[j].date_out + "</td>" );
                        $(".reservtablebody").append("<td>" + data[i].Reservations[j].RoomId + "</td>" );
                       
                        //UPDATE BUTTON
                        $(".reservtablebody").append("<td>");
                        $(".reservtablebody").append(" <form action = '/api/updateRes' method = 'POST'>");
                        $(".reservtablebody").append("<div class='field is-horizontal'>");
                        $(".reservtablebody").append("<div class='field-body'>");
                        $(".reservtablebody").append("<div class='field has-addons'>");
                        $(".reservtablebody").append("<div class = 'control'>");
                        $(".reservtablebody").append("<input  class = 'button update-res' type = 'submit' value = 'UPDATE'>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</form>");
                        $(".reservtablebody").append("</td>");
        
                        //CANCEL BUTTON
                        $(".reservtablebody").append("<td>");
                        $(".reservtablebody").append("<form action = '/api/cancelRes' method = 'POST'>");
                        $(".reservtablebody").append("<div class='field is-horizontal'>");
                        $(".reservtablebody").append("<div class='field-body'>");
                        $(".reservtablebody").append("<div class='field has-addons'>");
                        $(".reservtablebody").append("<div class = 'control'>");
                        $(".reservtablebody").append("<input  class = 'button cancel-res' type = 'submit' value = 'X'>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</div>");
                        $(".reservtablebody").append("</form>");
                        $(".reservtablebody").append("</td>");
                        $(".reservtablebody").append("</tr>");


            
                    }
                  
                    
                }

            });
    });
    $(".cancelreserv").on("click", function(event){
        event.preventDefault();

        var condition = {

            id : $("#cancelreservnumber").val().trim(),
            canceled: $("#reservationiscanceled").val()

        }
        console.log(condition.canceled);
        $.ajax({
            url: "/api/reservations/canceled/search?id=" +  condition.id + "&canceled="+condition.canceled
        }).then(function(data){
            console.log(data);

            for (var i = 0; i < data.length; i ++){
                for (var j = 0; j < data[i].Reservation.length; j++){
                    
                    console.log(data[i].Reservation[j].id);
                   

                    $(".reservtablebody").append("<tr>");
                    $(".reservtablebody").append("<td>" + data[i].Reservation[j].id + "</td>" );
                    $(".reservtablebody").append("<td>" + data[i].first_name + " " + data[i].last_name+"</td>" );
                    $(".reservtablebody").append("<td>" + data[i].Reservation[j].date_in + "</td>" );
                    $(".reservtablebody").append("<td>" + data[i].Reservation[j].date_out + "</td>" );
                    $(".reservtablebody").append("<td>" + data[i].Reservation[j].RoomId + "</td>" );
            
                    $(".reservtablebody").append("</tr>");


        
                }
              
                
            }

            






        });
    });

    //ROOM SEARCH
    $(".roomsearch").on("click", function(event){
        event.preventDefault();

        var condition = {
            id : $("#roomID").val().trim(),
            price_per_night: $("#pricepernight").val().trim(),
            bed_type: $("#bedtype").val().trim(),
            number_of_beds: $("#numberofbeds").val().trim(),
            max_occupancy: $("#maxoccupancy").val().trim(),
            adjoining: $("#adjoining").val(),
            jacuzzi: $("#jacuzzi").val(),
            balcony: $("#balcony").val(),
            smoke: $("#smoke").val()
        }
        $.ajax({
            url: "api/room/search?id="+condition.id+"&price_per_night="+condition.price_per_night+"&bed_type="+condition.bed_type+"&number_of_beds="+condition.number_of_beds+"&max_occupancy="+condition.max_occupancy+"&adjoining="+condition.adjoining+"&jacuzzi="+condition.jacuzzi+"&balcony="+condition.balcony+"&smoke="+condition.smoke
        }).then(function(data){
            console.log(data);
        });
    });

//===================================================================
//NEW-RESERVATION HTML PAGE 

    //CONTAINERS
    var resroomscontainer = $(".room-search");
    var prevguestcontainer = $(".previous-guest-search");

    //CREATE NEW RESERVATION SEARCH PARAMETERS
    $("#newreservationsearch").on("click", function(event){
        event.preventDefault();
        var condition = {
            startDate: $("#start-date").val().trim(),
            endDate: $("#end-date").val().trim(),
            }
        $.ajax({
            url : "/reservation/new/roomsearch?start_date=" + condition.startDate + "&end_date=" + condition.endDate
        }).then(function(data){
            resroomscontainer.html(data);
        });
    });

    //PREVIOUS GUEST SEARCH FOR CREATE NEW RESERVATION
    $(".previous-guest-search").on("click", function(event){
        event.preventDefault();
        var condition = {
            first_name: $("#first-name").val().trim(),
            last_name: $("#last-name").val().trim(),
            guest_phone: $("#guest-phone").val().trim(),
            guest_email: $("#guest-email").val().trim()
            }
        $.ajax({
            url: "/reservation/new/previousguestsearch?first_name=" + condition.first_name + "&last_name="+ condition.last_name +"&guest_phone="+ condition.guest_phone +"&guest_email="+ condition.guest_email
        }).then(function(data){
            console.log(data);
            prevguestcontainer.html(data);
        });
    });

});

//END DOC.READY