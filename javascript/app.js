
function is_safe(routes, bad_loc){
      var i = 0;
      while(i < routes.length){
       
        var j = 0;
        my_route = routes[i];
        while(j < bad_loc.length){
            my_position = bad_loc[j];
            if (google.maps.geometry.poly.isLocationOnEdge(my_position, my_route, 10e-1)){
                return 1;
            }
            j += 1;
        } 

       	i += 1;
   		}
      return 0;
    }
  
function get_route(total_routes_json, bad_loc_json, complete_routes_json){
    var total_routes = [];
    for(var i in total_routes_json){
      total_routes.push([i, json_data [i]]);
    }
    
    var bad_loc = [];
    for(var i in bad_loc_json){
      bad_loc.push([i, json_data [i]]);
    }

    for(var i = 0; i < total_routes.length; i++){
        routes = total_routes[i];
        var result = is_safe(routes, bad_loc);
        if(result == 0){
            return complete_routes_json[i];

        }
    }
}


  'use strict';
  const fs = require('fs');

let rawdata1 = fs.readFileSync('complete_routes.json');  
let complete_route_json = JSON.parse(rawdata1);  

let rawdata2 = fs.readFileSync('total_routes.json');  
let total_route_json = JSON.parse(rawdata2);

let rawdata3 = fs.readFileSync("bad_loc.json");
let bad_loc_json = JSON.parse(rawdata3);

var final_route = get_route(total_routes_json, bad_loc_json, complete_routes_json);

fs.writeFile('final_route.txt', final_route);
