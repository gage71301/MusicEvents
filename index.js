'use strict';

const TDkey = "376167-ArtistEv-T4U59SM3"

const TMkey = "7xL9FgBbPjzmH8llXqj2NoEpg9UPCofl"

function inputListen() {
    $(".userInputF").submit(event => {
        event.preventDefault();
        $(".eventdetails").hide();
        let artistInput = $(".userInput").val();
        console.log(artistInput);
        let url = `https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&`
        $(".recoResults").empty();
        makeTDReq(artistInput);
        makeTMReq(artistInput);
    })
}

function makeTDReq(artistInput) {

    $.ajax({
        url: `https://tastedive.com/api/similar?q=${artistInput}&type=music&k=${TDkey}`,
     
        jsonp: "callback",
     
        dataType: "jsonp",
     
        data: {
        },
     
        success: function( response ) {
            handleTDResponse(response); 
        }
    });
}

function makeTMReq(artistInput) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "02205bd1ff054927ac89412bc04ff067");
    
    var requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${TMkey}&keyword=${artistInput}`, requestOptions)
      .then(response => console.log(response))
      //.then(result => console.log(result))
      //.catch(error => console.log('error', error));
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

function handleTMResponse(json) {
    let tmrespo = json._embedded.events[0]


    console.log(tmrespo);
    console.log(json);
    $()
    $(".eventdetails").show().html(`<img src=${tmrespo.images[0].url} width="100px">
                                    <a href=${tmrespo.url}>LINK</a>
                                    <p>${tmrespo.info}</p>
    `)

 
}


$(function() {
    inputListen();
})