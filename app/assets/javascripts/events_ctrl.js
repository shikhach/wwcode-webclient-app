(function () {
  "use strict";

  angular.module("app").controller("EventsCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http({method: 'JSONP',
        url:'http://localhost:3000/api/v1/users/events/?user_id=5&callback=$scope.jsonpCallback'}).then(function(response) {
      },
        function(error){
          console.log(error.data)
      });
    }

    $scope.jsonpCallback = function(json){
      var networks=[json]
      var events = []
      for (var i=0;i<networks.length;i++){
        var network = networks[i];
        console.log(network);
        var networkTitle = network.title;
        for (var j=0;j<network.events.length;j++){
          network.events[j]["network_title"]=networkTitle
          events.push(network.events[j])
        }

      }
      console.log(events);
      $scope.events = events

      $scope.events = convertEventsDates($scope.events);
      $scope.setupColors();
      $scope.selectEvent(findSoonestEvent($scope.events));
    }

    $scope.setupColors = function(){ 
      var bgColorHeadRGB = hexToRgb("#00b6aa");
      var bgColorBodyRGB = hexToRgb("#fafafa");

      $scope.events.bgColorHeadDefault= 
      "rgba(" + bgColorHeadRGB['r'].toString() + "," +
        bgColorHeadRGB['g'].toString()+ "," +
        bgColorHeadRGB['b'].toString()+ ",1)"
        ;
      $scope.events.bgColorBodyDefault= 
      "rgba(" + bgColorBodyRGB['r'].toString() + "," +
        bgColorBodyRGB['g'].toString()+ "," +
        bgColorBodyRGB['b'].toString()+ ",1)"
        ;

      // $scope.events.bgColorHeadSelected="#009688";
      // $scope.events.bgColorBodySelected="#ffffff";
      // $scope.events.bgColorHeadMouseover="#faa73f";
      $scope.events.bgColorBodyMouseover="#eeeeee";

      for (var i=0;i<$scope.events.length;i++){   
        $scope.events[i].bgColorHead=$scope.events.bgColorHeadDefault;
        $scope.events[i].headOpacity=1;
        $scope.events[i].bodyOpacity=1;
        $scope.events[i].bgColorBody=$scope.events.bgColorBodyDefault;
      }
    }

    $scope.selectEvent = function(event) {
      $scope.events.selected_id=event.id;
      $scope.events.selected_title=event.title;
      $scope.events.selected_subscribe_count=event.subscribe_count;
      $scope.setupColors();//reset the color settings so that any other events that were previously clicked are no longer highlighted
      // if ( $('#event'+event.id+':hover').length )//if the event's div is still being hovered (moused-over) after selection, return to hover colors:
      //  {
      //   $scope.mouseoverEvent(event);
      // }
      // //the only time the event's div is not hovered (moused-over) after selection is when an event is auto-selected on page load
      // else {
      //   $scope.highlightSelectedEvent(event);
      // }
    }

    // $scope.highlightSelectedEvent =function(event){
    //   event.bgColorHead=$scope.events.bgColorHeadSelected;
    //   event.bgColorBody=$scope.events.bgColorBodySelected;
    // }

    $scope.mouseoverEvent = function(event){
      // event.bgColorHead=$scope.events.bgColorHeadMouseover;
      event.headOpacity=1
      event.bodyOpacity=1
      // event.bgColorBody=$scope.events.bgColorBodyMouseover;
    }

    $scope.mouseleaveEvent = function(event){
      event.headOpacity=1
      event.bodyOpacity=1
      // if (event.id == $scope.events.selected_id){
      //   $scope.        highlightSelectedEvent(event);
      // }
      // else{
      // // event.bgColorHeadDefaultad=$scope.events.bgColorHeadDefault;
      // // event.bgColorBody=$scope.events.bgColorBodyDefault;
      // }
    }

    // $scope.events = [
    //     { 
    //       id: 1,
    //       title: "Women Who Code - Medellín",
    //       event_date: "2015-12-23 18:00:00 UTC",
    //       time_zone: 'US/Pacific',
    //       location: "Hack Reactor",
    //       network: {
    //         title:"San Francisco"
    //       },
    //       subscribe_count: 1
    //     },
    //     { 
    //       id: 4,
    //       title: "Algorhitms and Interview Prep - TBD",
    //       event_date: "2016-01-01 18:45:00 UTC",
    //       location: "Hack Reactor",
    //       time_zone: 'US/Pacific',
    //       network: {
    //         title:"East Bay"
    //       },
    //       subscribe_count: 11
    //     },
    //     { 
    //       id: 3,
    //       title: "JavaScript Study Group (Hack Reactor)",
    //       event_date: "2016-01-23 24:00:00 UTC",
    //       location: "Hack Reactor",
    //       time_zone: 'US/Eastern',
    //       network: {
    //         title:"New York City"
    //       },
    //       subscribe_count: 0
    //     }
    // ];

    window.$scope = $scope;
  
  });
}());

