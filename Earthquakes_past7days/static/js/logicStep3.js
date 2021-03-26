 // Add console.log to check to see if our code is working.
 console.log("working");


 // //  Add a marker to the map for Los Angeles, California.
 // let marker = L.marker([34.0522, -118.2437]).addTo(map);
 
 //  Add a marker to the map for Los Angeles, California.
 
 // Get data from cities.js
 // let cityData = cities;
 
 // // Loop through the cities array and create one marker for each city.
 // cityData.forEach(function(city) {
 //     console.log(city)
 //     L.circleMarker(city.location, {
 //         radius: city.population/100000
 //     })
 //     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
 //   .addTo(map);
 // });
 
 // Add GeoJSON data.
//  let sanFranAirport =
//  {"type":"FeatureCollection","features":[{
//      "type":"Feature",
//      "properties":{
//          "id":"3469",
//          "name":"San Francisco International Airport",
//          "city":"San Francisco",
//          "country":"United States",
//          "faa":"SFO",
//          "icao":"KSFO",
//          "alt":"13",
//          "tz-offset":"-8",
//          "dst":"A",
//          "tz":"America/Los_Angeles"},
//          "geometry":{
//              "type":"Point",
//              "coordinates":[-122.375,37.61899948120117]}}
//  ]};
 
 // // Grabbing our GeoJSON data.
 // L.geoJson(sanFranAirport, {
 //     onEachFeature: function(feature, layer) {
 //         console.log(layer);
 //         layer.bindPopup("<h2>Airport name: " + feature.properties.name + "</hs> <hr> <h3>Airport Code: " + feature.properties.faa + "</h3>");        
 //                             }
 //                         }).addTo(map);
 
 
     // We turn each feature into a marker on the map.
     // pointToLayer: function(feature, latlng) {
     //   console.log(feature);
     //   return L.marker(latlng)
     //   .bindPopup("<h2>" + feature.properties.city + ", " + feature.properties.name + ", " + feature.properties.tz + " </h2>");
     // }
 
   
 
 // We create the tile layer that will be the background of our map.
 let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
     accessToken: API_KEY
 });
 
 // We create the dark view tile layer that will be an option for our map.
 let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
 attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
     accessToken: API_KEY
 });
 
// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };
 
 
 // Create the map object with center, zoom level and default layer.
 let map = L.map('mapid', {
     center: [39.5, -98.5],
     zoom: 3,
     layers: [streets]
 });
 
 // Pass our map layers into our layers control and add the layers control to the map.
 L.control.layers(baseMaps).addTo(map);
 
 // Accessing the airport GeoJSON URL
 let airportData = "https://raw.githubusercontent.com/Mikeblanchard/Mapping_Earthquakes/main/majorAirports.json";
 
 // Accessing the Toronto airline routes GeoJSON URL.
 let torontoData = "https://raw.githubusercontent.com/Mikeblanchard/Mapping_Earthquakes/main/torontoRoutes.json";

 // Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/Mikeblanchard/Mapping_Earthquakes/main/torontoNeighborhoods.json";
 
//  // Then we add our 'graymap' tile layer to the map.
//  streets.addTo(map);

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into two separate functions
// to calculate the color and radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
 
//  // Create a style for the lines.
//  let myStyle = {
//      color: "yellow",
//      weight: 1
//  }
 
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(map);
   

// L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer) {
//         layer.bindPopup("<h3> Neighbourhood: " + feature.properties.AREA_NAME + "</h3>");
//     }
// })



// .addTo(map);
// });
})