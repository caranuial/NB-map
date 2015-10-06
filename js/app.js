

function point(data) {
    
    var self = this;

    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.altNames = ko.observableArray(data.altNames);
    this.wikiPage = ko.observable(data.wikiPage);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.lat(), self.lng()),
        title: self.name(),
        map: map,
        altNames: self.altNames,
        wikiPage: self.wikiPage
    });

    //console.log (marker.altNames());

    /*google.maps.event.addListener(marker, 'click', (function(marker){
            return function() {
                toggleBounce(marker);
            }           
        })(marker)
    );*/

    marker.addListener('click', (function(marker){
            return function() {
                toggleBounce(marker);
                vm.searchForWikiPage(marker);
            }           
        })(marker));
    //    marker.addListener('click', viewModel.setSearchedPoint(this));
    markers.push(marker);
    //if you need the poition while dragging
    /*google.maps.event.addListener(marker, 'drag', function() {
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));

    //if you just need to update it when the user is done dragging
    google.maps.event.addListener(marker, 'dragend', function() {
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));*/
};

function toggleBounce(marker) {
    console.log(marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function(){
            marker.setAnimation(null);        
        },2000);
     
};


var width = $(window).width();
//console.log (width);
var zoomLevel;
if (width > 1080){
    zoomLevel = 8;
} else if (width > 480){
    zoomLevel = 7;
} else {
    zoomLevel = 6;
}

var map =  new google.maps.Map(document.getElementById('map'), {
    zoom: zoomLevel,
    center: new google.maps.LatLng(48.6724821,19.696058),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});



var getCen = map.getCenter();

google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(getCen);
    if ($(window).width() > 1080){
        map.setZoom(8);
    } else if ($(window).width() > 480){
        map.setZoom(7);
    } else {
        map.setZoom(6);
    }

    
});



var markers =[];

var pointsOfInterest = [
        {
            name: 'Spišský hrad',
            altNames:[
                {nick: 'Spišský hrad'},
                {nick: 'Spissky hrad'},
                {nick: 'Spis Castle'},
                {nick: 'Spish Castle'},
                {nick: 'Spiš Castle'},
            ],
            lat: 48.9994708,
            lng: 20.7675117,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Bratislavský hrad',
            altNames:[
                {nick: 'Bratislavsky hrad'},
                {nick: 'Bratislava Castle'}
            ],
            lat: 48.1421086,
            lng: 17.1002348,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Nitriansky hrad',
            altNames:[
                {nick: 'Nitriansky hrad'},
                {nick: 'Nitra Castle'}
            ],
            lat: 48.19,
            lng: 18.05,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Strečniansky hrad',
            altNames:[
                {nick: 'Strečniansky hrad'},
                {nick: 'Strecniansky hrad'},
                {nick: 'Hrad Strecno'},
                {nick: 'Hrad Strečno'},
                {nick: 'Hrad Strecno'},
                {nick: 'Strečno Castle'},
                {nick: 'Strecno Castle'}
            ],
            lat: 49.10,
            lng: 18.51,
            wikiPage: 'Strečno_Castle'
        },
        {
            name: 'Tematín',
            altNames:[
                {nick: 'Tematín'},
                {nick: 'Tematin'},
                {nick: 'Tematínsky hrad'},
                {nick: 'Tematinsky hrad'},
                {nick: 'Tematín Castle'},
                {nick: 'Tematin Castle'}
            ],
            lat: 48.40,
            lng: 17.55,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Trenčiansky hrad',
            altNames:[
                {nick: 'Trenčiansky hrad'},
                {nick: 'Trenciansky hrad'},
                {nick: 'Trenčín Castle'},
                {nick: 'Trencin Castle'}
            ],
            lat: 48.53,
            lng: 18.02,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Považský hrad',
            altNames:[
                {nick: 'Považský hrad'},
                {nick: 'Povazsky hrad'},
                {nick: 'Považský Castle'},
                {nick: 'Povazsky Castle'}
            ],
            lat: 49.14,
            lng: 18.45,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Krásna Hôrka',
            altNames:[
                {nick: 'Krásna Hôrka'},
                {nick: 'Krasna Horka'},
                {nick: 'Krásna Hôrka Castle'},
                {nick: 'Krasna Horka Castle'}               
            ],
            lat: 48.39,
            lng: 20.36,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Šarišský hrad',
            altNames:[
                {nick: 'Šarišský hrad'},
                {nick: 'Sarissky hrad'},
                {nick: 'Šariš Castle'},
                {nick: 'Saris Castle'}
            ],
            lat: 49.03,
            lng: 21.10,
            wikiPage: 'Spiš_Castle'
        },
        {
            name: 'Bojnický zámok',
            altNames:[
                {nick: 'Bojnický zámok'},
                {nick: 'Bojnicky zamok'},
                {nick: 'Bojnice Castle'},
            ],
            lat: 48.46,
            lng: 18.34,
            wikiPage: 'Spiš_Castle'
        }

    ];

var viewModel = function() {

    var self = this;

    this.points = ko.observableArray([]);

    pointsOfInterest.forEach(function(data){
        
        self.points.push(new point(data));
    });

    this.searchedPoint = ko.observable("");

    this.wikiPage = ko.observable("Tu bude zobrazeny text");

    this.search = function() {

        
        var search = this.searchedPoint().toLowerCase();
        var searchedCastleName;
        var visibility = false;

        ko.utils.arrayForEach(self.points(), function(obj) {
            ko.utils.arrayForEach(obj.altNames(), function(altName){
                if(altName.nick.toLowerCase().indexOf(search) >= 0){
                    //console.dir(altName.nick);
                };    
            });
            /// tu pracovat na prehladavani hradov na zaklade nickov a filtrovat markre
        });

        ko.utils.arrayForEach(markers, function(marker) {
            ko.utils.arrayForEach(marker.altNames(), function(altName){
                if(altName.nick.toLowerCase().indexOf(search) >= 0){
                    visibility = true; 
                } 
            });
            marker.setVisible(visibility);
            visibility = false;            
            /// tu pracovat na prehladavani hradov na zaklade nickov a filtrovat markre
        });

        /*markers.forEach(function(marker) {
            if (marker.title.toLowerCase().indexOf(search) >= 0) {
                marker.setVisible(true);
            } else {
              marker.setVisible(false);
            }
        });
        /*self.points.forEach(function(obj){  
            if (obj.name.toLowerCase().indexOf(search) >= 0){
                console.log('find');
            };
        });*/


    };

    this.searchForWikiPage = function(marker){
        
        var wikiRequestTimeout = setTimeout(function(){
            console.log("Failed to get wikipedia resources");
        }, 8000);
        console.log(marker.title);
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=' + marker.wikiPage();
        console.log(wikiUrl);
        
        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            jsonp: "callback",
            success: function( response ) {
                var article;
                var extract;
                $.each(response.query.pages, function(i, item) {
                    article = i;
                });
                console.log         (response["query"]["pages"][article]["extract"]);
                extract = response["query"]["pages"][article]["extract"]
                self.wikiPage(extract); 
                clearTimeout(wikiRequestTimeout);
            }
        });
    }

    //console.dir(this.points()[1].name());
    //console.dir(searchedPoint());

/*    this.setSearchedPoint = function(clicked){
        self.searchedPoint(clicked);
    }
*/
    //self.searchLocations = function () {

        /* Convert search input to lowercase in order to compare like
        characters in each break and location name & store in a new var*/
    //    var search = self.searchedPoint().toLowerCase();

        /* Remove all location objects from obs. array, so that only objects
        which match the search can be re-added to the array and subsequently
        rendered in the View*/
        //self.locationGrid.removeAll();

        /* Compare each object's break name and location to the search terms.
         If it matches, re-add it to the obs. array and render in the View.
         If it doesn't match, then it isnt re-added*/
    /*    self.LocationArray.forEach(function(obj) {

            if (obj.breakName.toLowerCase().indexOf(search) >= 0) {

              self.locationGrid.push(obj);

            } else if (obj.location.toLowerCase().indexOf(search) >= 0) {

              self.locationGrid.push(obj);
            }
        });

        // Set the map bounds & map position for every search
        setMapBounds();

        /* Compare each marker's title, which holds the break and location name, to the search terms. If it matches, set the marker as visible.
        If it doesn't match, make setVisible false*/
/*        markers.forEach(function(marker) {

            if (marker.title.toLowerCase().indexOf(search) >= 0) {

              marker.setVisible(true);

            } else {

              marker.setVisible(false);

            }

        });
    }*/



};

window.vm = new viewModel();
ko.applyBindings(vm);
//ko.applyBindings(viewModel);