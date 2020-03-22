/*!
* Markers On Map ('https://github.com/furcan/Markers-On-Map')
* Version: 1.3.0
* Author: Furkan MT ('https://github.com/furcan')
* Copyright 2019 Markers On Map, MIT Licence ('https://opensource.org/licenses/MIT')*
*/

// DEMO: Markers On Map - Init and Run on



var db = firebase.firestore();
var helpers = [];
var searcher = [];





var mymap = L.map('mapid').setView([52.520008, 13.404954], 11);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    detectRetina: true,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2FuZ2hhbmciLCJhIjoiY2pxdmp2bXhqMHc1ZzQzb2NpOWY5NmRuMCJ9.LTrUYDuCAPXnJ-0vzQ9gsQ'
}).addTo(mymap);


db.collection("helpers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

       // console.log(`${doc.id} => ${doc.data()}`);
        //console.log(doc.data().firstName);
        //var marker = L.marker([doc.data().addressLat, doc.data().addressLong]).addTo(mymap);
        var circle = L.circle([doc.data().addressLat, doc.data().addressLong], {

    color: 'green',
    fillColor: '#f03',
    fillOpacity: 0.12,
    radius: 500
}).addTo(mymap);

        circle.bindPopup("I am a circle.");
        //var helper = new add(helperMarker(),25,doc.data().addressLat,doc.data().addressLong,doc.data().firstName,'<h3 style="text-align:center;margin:0 0 10px;">' + doc.data().firstName + ", " + doc.data().age.toString() + '</h3><p style="text-align:center; margin:0 0 10px;">' + doc.data().typeOfHelp + '</p><button style="display:table;margin:auto;padding:8px 12px;border-radius:20px;font-weight:700;background:#DE2A00;color:#fff;cursor:pointer;">' + doc.data().contactInfo + '</button>');
        //helpers.push(helper)


    });
            //console.log(helpers)

db.collection("searcher").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

       // console.log(`${doc.id} => ${doc.data()}`);
        //console.log(doc.data().firstName);
        var search = new add(searcherMarker(),25,doc.data().addressLat,doc.data().addressLong,doc.data().firstName,'<h3 style="text-align:center;margin:0 0 10px;">' + doc.data().firstName + ", " + doc.data().age.toString() + '</h3><p style="text-align:center; margin:0 0 10px;">' + doc.data().typeOfHelp + '</p><button style="display:table;margin:auto;padding:8px 12px;border-radius:20px;font-weight:700;background:#DE2A00;color:#fff;cursor:pointer;">' + doc.data().contactInfo + '</button>');
        searcher.push(search)


    });
      //console.log(helpers)

            MarkersOnMap.Init({
    googleApiKey: 'AIzaSyBDWpSKKqmaBHmKwBobTEjxToXSRk2GkPc', // this key restricted except this project
    googlePlacesApiEnabled: true,
    mapTypeId: 'terrain',
    mapHeight: '500px',
    markerOverlay: false,
    mapZoomControl: true,
    mapScrollWheel: false,
    markerObjects: helpers.concat(searcher),
});
MarkersOnMap.Run('div#GoogleMaps');

furcanTooltip('[data-toggle="tooltip"]');

});

});




// DEMO: Markers On Map - Init and Run off
function add (markerUrl,markerSize,markerLat,markerLong,markerTitle,markerContent) {
this.markerUrl = markerUrl;
this.markerSize = markerSize;
this.markerLat = markerLat;
this.markerLong = markerLong;
this.markerTitle = markerTitle;
this.markerContent = markerContent;
}

// DEMO: Tooltip on
function furcanTooltip(tooltip) {
    $('body > .tooltip').remove();
    $(tooltip).tooltip({
        trigger: 'hover',
        container: 'body',
    });
}

$(document).on('click', function () {
    if ($('body > .tooltip').length > 0) {
        $('body > .tooltip').remove();
    }
});
// DEMO: Tooltip off

// DEMO: Map Markers Title Tooltip on
$(window).on('load', function () {
    var tooltipTimeout = setTimeout(function () {
        $(document).on('mouseenter', 'div#GoogleMaps', function () {
            furcanTooltip($('div#GoogleMaps *[title]'));
            clearTimeout(tooltipTimeout);
        });
    }, 1000);
});
// DEMO: Map Markers Title Tooltip off