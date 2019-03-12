//routing in static app.use in server.js
//this is where we do our jquery onclicks and also the ajax put/post to push the info into our api arrays

$(document).ready(function () {
    //GUEST
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

    // $("#guestsearch").on("click", function(event){
    //     event.preventDefault();

    //     $.ajax({
    //         url : "/"
    //     }).then(function(data){
          
    //         console.log(data);
            
    //     });
    // });


    // NEW-RESERVATION PAGE WHICH IS NOT WORKING EITHER
    $("#newreservationsearch").on("click", function(event){
        event.preventDefault();

        $.ajax({url : "/rooms"}).then(function(data){console.log(data)});

    });


});

//END DOC.READY