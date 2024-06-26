(function ($) {
    'use strict';

    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
     *
     * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
     *
     * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */

    $(document).ready(function () {
        pd_handle_location_input_visibility($);

        let pos = {
            lat: 23.761458193084376,
            lng: 90.43844234921826,
        };

        pd_visual_map(pos, 'Junaid Bin Jaman', 10);
    });
})(jQuery);

function pd_handle_location_input_visibility($) {
    $('.pd-manual-location-detector').on('click', function () {
        $('.pd-manual-location-detector-wrapper').show();
        pd_foobar();
    });

    $('.pd-auto-location-detector').on('click', function () {
        $('.pd-manual-location-detector-wrapper').hide();
    });
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.querySelector('.pd-auto-location-detector');

    locationButton.addEventListener('click', () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                    let pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }

                    pd_visual_map(pos, 'We found your location', 15)
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed.'
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

window.initMap = initMap;

// Search auto complete
function pd_foobar() {
    const center = {lat: 23.76353368870684, lng: 90.43209677661604};
    // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
    };

    const input = document.getElementById('pac-input');
    const options = {
        bounds: defaultBounds,
        componentRestrictions: {country: 'bd'},
        fields: ['address_components', 'geometry', 'icon', 'name', 'place_id'], // Note: 'place_id' instead of 'placeId'
        strictBounds: false,
    };

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();

        if (!place.place_id) {
            console.log('Place ID not returned.');
        }

        let pos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }

        pd_visual_map(pos, place.name, 15)
    });
}

function pd_visual_map(pos, name, zoom) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: zoom,
    });

    const marker = new google.maps.Marker({
        position: pos,
        map,
        title: name,
    });
}
