const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?&client_id=AAX334AWRMDG2K3UNKXSXT5REBQZH3EQQPH0EOPSGU3CRBDQ&client_secret=SDZVEYKZBHKAS54ESJJZXOYTGKN2RKJHLUXQX5L4GLT2PS4U&v=20180417";

//retrieve data from FourSquareAPI

function getDataFromFourApi() {
    let city = $('.search-query').val();
    let category = $(this).text();
    $.ajax(FOURSQUARE_SEARCH_URL, {
        data: {
            near: city,
            venuePhotos: 1,
            limit: 21,
            query: 'breweries',
        },
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            try {
                //console.log(data);
                let results = data.response.groups[0].items.map(function (item, index) {
                    console.log(item);
                    return displayResults(item);
                });
                $('#foursquare-results').html(results);
            } catch (e) {
                console.log(e);
                $('#foursquare-results').html("<div class='result'><p>Sorry! No Results Found.</p></div>");
            }
        },
        error: function () {
            $('#foursquare-results').html("<div class='result'><p>Sorry! No Results Found.</p></div>");
        }
    });  
}

function displayResults(result) {
    //console.log(result.venue.location.formattedAddress[0])
    //console.log(result);
        let brewLocation = result.venue.name;
        let brewLink = `https://www.google.com/maps/search/${brewLocation} + ${result.venue.location.formattedAddress[1]}`;
        if (result.venue.photos.groups.length > 0){
            return `
                <div class="result col-3">
                    <div class="result-image" style="background-image: url(https://igx.4sqi.net/img/general/width960${result.venue.photos.groups[0].items[0].suffix})" ;>
                    </div>
                    <div class="result-description">
                        <h2 class="result-name">${result.venue.name}</h2>
                        <span class="icon">
                            <img src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" alt="category-icon">
                        </span>
                        <span class="icon-text">
                            ${result.venue.categories[0].name}
                        </span>
                        <p class="result-address">${result.venue.location.formattedAddress[0]}</p>
                        <p class="result-address">${result.venue.location.formattedAddress[1]}</p>
                        <p class="result-address">${result.venue.location.formattedAddress[2]}</p>
                        <a class="hike-directions" href="${brewLink}" target="_blank">Get Directions</a>
                    </div>
                </div>
            `;
        } 
    }

    function searchLocation() {
        $('.search-form').submit(function (event) {
            event.preventDefault();
            $('#foursquare-results').html("");
            getDataFromFourApi();
        });
    }



    function activatePlacesSearch() {
        let options = {
            types: ['(regions)']
        };
        let input = document.getElementById('search-term');
        let autocomplete = new google.maps.places.Autocomplete(input, options);
    }
    

    $(searchLocation);