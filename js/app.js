

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

    marker.addListener('click', (function(marker){
            return function() {
                toggleBounce(marker);
                vm.searchForWikiPage(marker);
                vm.disableMarkers(marker);
                var latLng = marker.getPosition();
                infoWindow.setContent('<h4>Castle position is:</h4>' + latLng.lat() + ', ' + latLng.lng());
                infoWindow.open(map, marker);
            }           
        })(marker));
    markers.push(marker);
};

function toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(function(){
        marker.setAnimation(null);        
    },2000); 
};


var width = $(window).width();

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

var infoWindow = new google.maps.InfoWindow();

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

google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
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
            wikiPage: 'Bratislava_Castle'
        },
        {
            name: 'Nitriansky hrad',
            altNames:[
                {nick: 'Nitriansky hrad'},
                {nick: 'Nitra Castle'}
            ],
            lat: 48.32,
            lng: 18.09,
            wikiPage: 'Nitra_Castle'
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
            lat: 49.16,
            lng: 18.88,
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
            lat: 48.68,
            lng: 17.93,
            wikiPage: 'Tematín'
        },
        {
            name: 'Trenčiansky hrad',
            altNames:[
                {nick: 'Trenčiansky hrad'},
                {nick: 'Trenciansky hrad'},
                {nick: 'Trenčín Castle'},
                {nick: 'Trencin Castle'}
            ],
            lat: 48.88,
            lng: 18.04,
            wikiPage: 'Trenčín_Castle'
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
            wikiPage: 'Považský_hrad'
        },
        {
            name: 'Krásna Hôrka',
            altNames:[
                {nick: 'Krásna Hôrka'},
                {nick: 'Krasna Horka'},
                {nick: 'Krásna Hôrka Castle'},
                {nick: 'Krasna Horka Castle'}               
            ],
            lat: 48.66,
            lng: 20.60,
            wikiPage: 'Krásna_Hôrka_Castle'
        },
        {
            name: 'Šarišský hrad',
            altNames:[
                {nick: 'Šarišský hrad'},
                {nick: 'Sarissky hrad'},
                {nick: 'Šariš Castle'},
                {nick: 'Saris Castle'}
            ],
            lat: 49.05,
            lng: 21.17,
            wikiPage: 'Šariš_Castle'
        },
        {
            name: 'Bojnický zámok',
            altNames:[
                {nick: 'Bojnický zámok'},
                {nick: 'Bojnicky zamok'},
                {nick: 'Bojnice Castle'},
            ],
            lat: 48.79,
            lng: 18.56,
            wikiPage: 'Bojnice_Castle'
        }

    ];

var viewModel = function() {

    var self = this;

    this.points = ko.observableArray([]);

    this.pointsList = ko.observableArray([]);

    pointsOfInterest.forEach(function(data){
        
        self.points.push(new point(data));
    });

    this.fillPointsList = function(){
        
        self.pointsList.removeAll();

        this.points().forEach(function(data) {
            self.pointsList.push(data);
        });    
    }

    this.fillPointsList();

    self.searchedPoint = ko.observable("");  

    this.setSearchedPoint = function(searchedPoint) {
        self.searchedPoint(searchedPoint);
    }

    self.wikiPage = ko.observable();
    self.wikiHeader = ko.observable();
    self.wikiUrl = ko.observable();
    self.wikiUrlText = ko.observable();

    this.setWikiFields = function (wikiPage, wikiHeader, wikiUrl, wikiUrlText){
        self.wikiPage(wikiPage);
        self.wikiHeader(wikiHeader);
        self.wikiUrl(wikiUrl);
        self.wikiUrlText(wikiUrlText);
    }

    this.setDefaultWikiFields = function(){
        self.setWikiFields("Please serach for castle or select one from map or pick one from menu. <br> To reset search click <i class='glyphicon glyphicon-repeat'></i> or selected castle again. ", "Slovak Castles", "", "");
    }

    this.setDefaultWikiFields();

    this.search = function() {

        var searchSelf = this;
        
        var search = this.searchedPoint().toLowerCase();
        var searchedCastleName;
        var visibility = false;
        var amountOfPositiveSearches;

        self.pointsList.removeAll();

        self.points().forEach(function(obj) {
            
            obj.altNames().forEach(function(altName){
                if(altName.nick.toLowerCase().indexOf(search) >= 0){
                    console.log(altName.nick + "True");
                    searchSelf.visibility = true; 
                } 
            });
            if (searchSelf.visibility === true) {
                self.pointsList.push(obj);
            };
            searchSelf.visibility = false;
        });

        this.amountOfPositiveSearches = 0;

        ko.utils.arrayForEach(markers, function(marker) {
            ko.utils.arrayForEach(marker.altNames(), function(altName){
                if(altName.nick.toLowerCase().indexOf(search) >= 0){
                    searchSelf.visibility = true; 
                } 
            });
            marker.setVisible(searchSelf.visibility);
            if (searchSelf.visibility === true){
                searchSelf.amountOfPositiveSearches = searchSelf.amountOfPositiveSearches + 1;
            };
            searchSelf.visibility = false;      
        });

        if (this.amountOfPositiveSearches === 1 ) {
            ko.utils.arrayForEach(markers, function(marker) {
                ko.utils.arrayForEach(marker.altNames(), function(altName){
                    if(altName.nick.toLowerCase().indexOf(search) >= 0){
                        self.searchForWikiPage(marker);
                    };
                });
            });
        }
        else {
            self.setDefaultWikiFields();
        };  

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

    this.selectListPoint = function(point){
        if (self.pointsList().length != 1 ){
            self.pointsList.removeAll();
            self.points().forEach(function(obj) {
                if(obj.name().toLowerCase().indexOf(point.name().toLowerCase()) >= 0){
                    self.pointsList.push(obj);
                } 
            });
            
            markers.forEach(function(marker){
                if (marker.title.toLowerCase() === point.name().toLowerCase()){
                    self.disableMarkers(marker);
                    self.searchForWikiPage(marker);
                }
            });  
        } else {
            self.resetSearch();
        } 
    }

    this.disableMarkers = function(marker){

        ko.utils.arrayForEach(markers, function(searchedMarker) {
            if (searchedMarker.title != marker.title){
                searchedMarker.setVisible(false);
            };
        });

    }

     this.enableMarkers = function(){

        ko.utils.arrayForEach(markers, function(marker) {
            marker.setVisible(true);
        });

    }

    this.resetSearch = function(){

        self.enableMarkers();
        self.setDefaultWikiFields();
        self.setSearchedPoint("");
        infoWindow.close();
        self.fillPointsList();
    }

    this.searchForWikiPage = function(marker){
        
        var wikiRequestTimeout = setTimeout(function(){
            console.log("Failed to get wikipedia resources");
        }, 8000);
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=' + marker.wikiPage();
        
        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            jsonp: "callback",
            success: function( response ) {
                var article;
                $.each(response.query.pages, function(i, item) {
                    article = i;
                });
                
                self.setWikiFields(
                    response["query"]["pages"][article]["extract"], 
                    response["query"]["pages"][article]["title"], 
                    "http://en.wikipedia.org/wiki/" + response["query"]["pages"][article]["title"], 
                    "Link: " + response["query"]["pages"][article]["title"]
                );

                clearTimeout(wikiRequestTimeout);
                console.log(self.wikiPage());
            }
        });
    }

   
    


};



window.vm = new viewModel();
ko.applyBindings(vm);
//vm.wikiHeader.extend({ notify: 'always' });
//ko.applyBindings(viewModel);

$(".form-control").on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) { // ESC
        vm.resetSearch();
    }
});