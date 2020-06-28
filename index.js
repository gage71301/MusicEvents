'use strict';

let key = "376167-ArtistEv-T4U59SM3"

function inputListen() {
    $(".userInputF").submit(event => {
        event.preventDefault();
        let artistInput = $(".userInput").val();
        console.log(artistInput);
        let url = `https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&`
        $(".recoResults").empty();
        makeTDReq(artistInput);
        makeEBReq(artistInput);
    })
}

function makeTDReq(artistInput) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://seatgeek-seatgeekcom.p.rapidapi.com/events",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "seatgeek-seatgeekcom.p.rapidapi.com",
            "x-rapidapi-key": "c29cad4333msh4a88ec98aa21c50p1de641jsn425b2f370f68"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

   // $.ajax({
   //     url: `https://tastedive.com/api/similar?q=${artistInput}&type=music&k=${key}`,
   //  
   //     jsonp: "callback",
   //  
   //     dataType: "jsonp",
   //  
   //     data: {
    //    },
     
    //    success: function( response ) {
    //        handleTDResponse(response); 
    //    }
   // });
}

function makeEBReq(artistInput) {
    
    $.ajax({
        url: `https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=2BNFHN4AULKQXXVMSJZX&redirect_uri=https://master.d1sqriqdlxy39w.amplifyapp.com/`,
     
        jsonp: "callback",
     
        dataType: "jsonp",
     
        data: {
        },
     
        success: function( response ) {
            console.log(response); 
        }
    });
}

function handleTDResponse(response) {
    console.log(response)

    let artistStr = response.Similar.Info[0].Name.toString();
    let recommended = response.Similar.Results

    for (let i = 0 ; i < recommended.length ; i++) {
        $(".recoResults").append(`<li><h2>${recommended[i].Name.toString()}</h2></li>`)
    }

    $(".content").html(`<h1>${artistStr}</h1>`);
}


$(function() {
    inputListen();
})