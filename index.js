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

    $.ajax({
        url: `https://tastedive.com/api/similar?q=${artistInput}&type=music&k=${key}`,
     
        jsonp: "callback",
     
        dataType: "jsonp",
     
        data: {
        },
     
        success: function( response ) {
            handleTDResponse(response); 
        }
    });
}

function makeEBReq(artistInput) {
    
    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=2BNFHN4AULKQXXVMSJZX`,
     
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