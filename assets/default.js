$(function () {
    //   alert(1);
});

$(document).ready(function () {

});

window.onscroll = function () {
    myFunction()
};

function myFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $("#go-top").css({"opacity": "1", "bottom": "20px"});
    } else {
        $("#go-top").css({"opacity": "0", "bottom": "-100px"});
    }
}

function scrollToTop()
{
    var body = $("html, body");
    body.stop().animate({scrollTop: 0}, '500', 'swing', function () {});
}


$('#go-top').click(function () {
    /* $("#scroll-top").click(function(){return $("html,body").animate({scrollTop:0},"fast"),!1}) */
    scrollToTop();
});


/**********************************************************/
var latlng, map, marker, lat, lng;
var googleMap =
        {
            apiPath: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCCa56T84VGOlce54xMsCrU2Fwds-BFmlw&callback=googleMap.initialize', ''],
            latlng: ['', ''],
            setBackground: function ($path) {
                document.getElementById("map").style.backgroundImage = "url('" + $path + "')";
                console.log(' Background is set to MAP Wrapper! ' + $path);
            },
            /**
             * &libraries=places and etc.
             * @returns {undefined}
             */
            loadScript: function () {
                //for (var i = 0; i < this.apiPath.length + 1; i++)
                //{
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = this.apiPath[0];
                //document.body.appendChild(script);
                $('head').append(script);
                console.log(' Google Map Script loading! ' + this.apiPath[0]);
                //}

            },
            /**
             *
             * @returns {undefined}
             */
            defualtLatLng: function () {
                /**
                 * default city to focus.
                 */
                latlng = new google.maps.LatLng(this.latlng[0], this.latlng[1]);
                console.log(' Default City to Map is Set! ' + this.latlng[0] + '|' + this.latlng[0]);
            },
            showMap: function () {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: latlng,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
            },
            marker: function () {
                marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: 'کليک کنيد و سپس فشار دهيد',
                    draggable: true
                });
            },
            /**
             * initialize - load functions after google api script the method loadScript
             * @returns functions
             */
            initialize: function () {
                googleMap.defualtLatLng();
                googleMap.showMap();
                googleMap.marker();
                //googleMap.searchPlace();

                var div = document.createElement('div');
                document.getElementsByTagName('body')[0].appendChild(div);

                google.maps.event.addListener(marker, 'dragend', function (a) {
                    console.log(a);
                    div.innerHTML = a.latLng.lat().toFixed(4) + ', ' + a.latLng.lng().toFixed(4);
                    div.className = "text-danger fix-bottom latlng-box en text-center";
                    document.getElementById("lat").value = this.getPosition().lat();
                    document.getElementById("long").value = this.getPosition().lng();
                    $(".latlng-box").show().fadeOut(2000);
                });

            }, searchPlace: function () {
                // Create the search box and link it to the UI element.
                var input = /** @type {HTMLInputElement} */(document.getElementById('pac-input'));
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                var searchBox = new google.maps.places.SearchBox(/** @type {HTMLInputElement} */(input));
                // Listen for the event fired when the user selects an item from the
                // pick list. Retrieve the matching places for that item.
                google.maps.event.addListener(searchBox, 'places_changed', function () {
                    var places = searchBox.getPlaces();


                    // For each place, get the icon, place name, and location.
                    markers = [];
                    var bounds = new google.maps.LatLngBounds();
                    for (var i = 0, place; place = places[i]; i++) {
                        var image = {
                            url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(25, 25)
                        };

                        // Create a marker for each place.
                        /*var marker = new google.maps.Marker({
                         map: map,
                         icon: image,
                         title: place.name,
                         position: place.geometry.location
                         });*/
                        marker.setPosition(place.geometry.location);

                        bounds.extend(place.geometry.location);
                    }

                    map.fitBounds(bounds);
                });

                // Bias the SearchBox results towards places that are within the bounds of the
                // current map's viewport.
                google.maps.event.addListener(map, 'bounds_changed', function () {
                    var bounds = map.getBounds();
                    searchBox.setBounds(bounds);
                });
            }
        }

function loadGoogleMap(lat, lng)
{
    googleMap.latlng[0] = lat;
    googleMap.latlng[1] = lng;
    googleMap.setBackground("http://localhost/ads/public/images/map.png");
    googleMap.loadScript();
}

$('.loadGoogleMap').click(function () {
    loadGoogleMap();
});

$(document).ready(function () {
    //loadGoogleMap();
});


//-------------------news
$(document).ready(function () {
    var length = $("#tips li").length;
    var old = 0;

    function show() {
        var news = getRan();
        $("#tips li").hide();
        $("#tips li:nth-child(" + news + ")").fadeIn("fast");
        old++;
    }

    function getRan() {
        var news = old + 1;
        if (news < length) {
            return news;
        } else {
            news = 1;
            old = 0;
            return news;
        }
    }

    show();
    setInterval(show, 3000);

});