$(document).ready(function () {

//===================================================================
//INDEX HTML PAGE 

    //CONTAINERS
    var guestcontainer = $(".guestContent");
    var reservationcontainer = $(".reservationContent");
    var roomscontainer = $(".roomscontainer");

    //===================================================================
    //HEADER CLICKABLES

    //SEARCH ALL
    $("#searchAllGuests").on("click", function (event) {
        $.ajax({
            url: "/partial/allguests"
        }).then(function (data) {      
            guestcontainer.html(data);
        })
    });

    //CURRENT GUESTS
    $("#currentGuests").on("click", function (event) {
        $.ajax({
            url: "/partial/inHouse"
        }).then(function (data) { 
            guestcontainer.html(data);
        })
    });

    //TODAY'S ARRIVALS
    $("#reservationArrivals").on("click", function(event){
        $.ajax({
            url: "/arrivals"
        }).then(function(data){
            reservationcontainer.html(data);
        })
    });

    //TODAY'S DEPARTURES
    $("#reservationDepartures").on("click", function(event){
        $.ajax({
            url: "/departures"
        }).then(function(data){
            reservationcontainer.html(data);

        });
    });

    //OCCUPIED ROOMS
    $("#roomsOcupied").on("click", function(event){
        $.ajax({
            url : "/occupied"
        }).then(function(data){
            roomscontainer.html(data);
        });
    });

    //AVAILABLE ROOMS
    $("#roomsAvailable").on("click", function(event){
        $.ajax({
            url : "/available"
        }).then(function(data){
            roomscontainer.html(data);
        });
    });

    //===================================================================
    //SEARCHES

    //GUEST SEARCH
    $(".guestsearch").on("click", function(event){
        $(".gueststablebody").empty();
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
            console.log(data);

            for (var i = 0; i < data.length; i++){
                console.log(data[i]);
                $(".gueststablebody").append("<tr>");
                $(".gueststablebody").append("<td width = '90px'>" + data[i].first_name + "</td>" );
                $(".gueststablebody").append("<td width = '90px'>" + data[i].last_name+"</td>" );
                $(".gueststablebody").append("<td width = '95px'>" + data[i].guest_phone + "</td>" );
                $(".gueststablebody").append("<td width = '155px'>" + data[i].guest_email + "</td>" );
                $(".gueststablebody").append("</tr>");
            }
        });
    });

    //RESERVATION SEARCH BY ID AND DATES
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
                $(".reservtablebody").append("</tr>");
            }
        });
    });

    //RESERVATION SEARCH BY NAME/NUMBER/EMAIL
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
                        $(".reservtablebody").append("</tr>");
                    }    
                }
            });
    });

    //RESERVATION SEARCH BY CANCELED/ID
    $(".cancelreserv").on("click", function(event){
        event.preventDefault();
        $(".reservtablebody").empty();

        var condition = {
            id : $("#cancelreservnumber").val().trim(),
            canceled: $("#reservationiscanceled").val()
        }

        $.ajax({
            url: "/api/reservations/canceled/search?id=" +  condition.id + "&canceled="+condition.canceled
        }).then(function(data){
            // console.log(data);
            
            for (var i = 0; i < data.length; i ++){
                console.log(data[i].Reservation);
 
                $(".reservtablebody").append("<tr>");
                $(".reservtablebody").append("<td>" + data[i].Reservation.id + "</td>" );
                $(".reservtablebody").append("<td>" + data[i].Reservation.Guest.first_name + " " + data[i].Reservation.Guest.last_name+"</td>" );
                $(".reservtablebody").append("<td>" + data[i].Reservation.date_in + "</td>" );
                $(".reservtablebody").append("<td>" + data[i].Reservation.date_out + "</td>" );
                $(".reservtablebody").append("<td>" + data[i].Reservation.RoomId + "</td>" );
                $(".reservtablebody").append("</tr>");
            }
        });
    });

    //ROOM SEARCH
    $(".roomsearch").on("click", function(event){
        event.preventDefault();
        $(".roomsbodycontainer").empty();

        var condition = {
            id : $("#roomID").val().trim(),
            min_price: $("#minprice").val(),
            max_price: $("#maxprice").val(),
            bed_type: $("#bedtype").val().trim(),
            number_of_beds: $("#numberofbeds").val().trim(),
            max_occupancy: $("#maxoccupancy").val().trim(),
            adjoining: $("#adjoining").val(),
            jacuzzi: $("#jacuzzi").val(),
            balcony: $("#balcony").val(),
            smoke: $("#smoke").val()
        }
        $.ajax({
            url: "/api/room/search?id="+condition.id+"&max_price="+condition.max_price+"&min_price="+condition.min_price+"&bed_type="+condition.bed_type+"&number_of_beds="+condition.number_of_beds+"&max_occupancy="+condition.max_occupancy+"&adjoining="+condition.adjoining+"&jacuzzi="+condition.jacuzzi+"&balcony="+condition.balcony+"&smoke="+condition.smoke
        }).then(function(data){
              
            for (var i = 0; i < data.length; i++){

                $(".roomsbodycontainer").append("<tr>");
                $(".roomsbodycontainer").append("<td width = '88px'>" + data[i].id+"</td>");
                $(".roomsbodycontainer").append("<td width = '128px'>" + data[i].price_per_night+"</td>");
                $(".roomsbodycontainer").append("<td width = '105px'>" + data[i].number_of_beds+"</td>");
                $(".roomsbodycontainer").append("<td width = '101px'>" + data[i].bed_type+"</td>");
            }   
        });
    });

    // CURRENT TIME IN INDEX
    function currentTime (){

        var sec = 1;
        var date = moment().format("MMMM Do, YYYY");  
        var time = moment().format('LT'); 

        $("#date").text(date);
        $("#time").text(time);

        t = setTimeout(function() {
            currentTime();
        }, sec * 1000);	

    };
    currentTime ();
   
//===================================================================
//UPDATE BUTTONS

    //CHECK IN
    $(document).on("click", ".check-in", function(event){

        var id = $(this).attr("data");
        $(this).addClass("clicked");

        $.ajax({
            url : "/api/reservations/checkin/" + id,
            method: "PUT",
            data: {in_house: 0}
        }).then(function(data){

        });
    });

    //CHECK OUT
    $(document).on("click", ".check-out", function(event){
      
        var id = $(this).attr("data");
        console.log(id);

        $.ajax({
            url : "/api/reservations/checkout/" + id,
            method: "PUT",
            data: {in_house: 0}
        }).then(function(data){

        });
    });

//===================================================================
//NEW-RESERVATION EJS PAGE 

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
    $(".previous_guest_search").on("click", function(event){
        event.preventDefault();
        var condition = {
            first_name: $("#first_name").val().trim(),
            last_name: $("#last_name").val().trim(),
            guest_phone: $("#guest_phone").val().trim(),
            guest_email: $("#guest_email").val().trim()
            }
        $.ajax({
            url: "/reservation/new/previousguestsearch?first_name=" + condition.first_name + "&last_name="+ condition.last_name +"&guest_phone="+ condition.guest_phone +"&guest_email="+ condition.guest_email
        }).then(function(data){
            console.log(data);
            prevguestcontainer.html(data);
        });
    });

    //CREATE NEW GUEST
    $(".create_new_guest").on("click", function(event){
        event.preventDefault();
        
        var newGuest = {
            last_name: $("#last_name").val().trim(),
            first_name: $("#first_name").val().trim(),
            guest_phone: $("#guest_phone").val().trim(),
            guest_email: $("#guest_email").val().trim(),
            guest_notes: $("#guest_notes").val().trim(),
            credit_card_number: parseInt($("#credit_card_number").val().trim()),
            credit_card_type: $("#credit_card_type option:selected").text(),
            credit_card_expiration: $("#credit_card_expiration").val().trim()
        };

        $.ajax({
            url : "/reservation/new/createguest",
            type: "POST",
            data: newGuest
        }).then(function(data){
            prevguestcontainer.html(data);
        });
    });

}); //END DOC.READY