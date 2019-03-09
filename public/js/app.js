//routing in static app.use in server.js
//this is where we do our jquery onclicks and also the ajax put/post to push the info into our api arrays

$(document).ready(function () {
//GUEST
    //SEARCH ALL
    $("#searchAllGuests").on("click", function(event) {
        $.ajax("/api/guests/all", {
            type: "GET"
        }).then(function () {
            console.log("All guests are displayed. Use form to narrow your search.");
            
            //this reloads page, must change
            location.reload(); //we don't want the whole page to reload, just the list to update as we go
        })
    });
    

}); //END DOC.READY