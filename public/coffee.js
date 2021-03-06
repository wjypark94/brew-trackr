const FOURSQUARE_SEARCH_URL = "https://api.foursquare.com/v2/venues/explore?&client_id=4EV4L2TYGITPLJCO4NYMHAXT1VU5ORATYF0DYR3OKO4O0LEF&client_secret=O0MRRAG1BNMQBID4LOIFNRD1XANUCP0J0TV2QTJAYNW1M5RR&v=20180417";

//const VENUE_ID = result.venue.id;
//retrieve data from FourSquareAPI

function getDataFromFourApi() {
    let city = $('.search-query').val();
    let category = $(this).text();
    $.ajax(FOURSQUARE_SEARCH_URL, {
        data: {
            near: city,
            venuePhotos: 1,
            limit: 9,
            query: 'coffee',
        },
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            try {
                //console.log(data);
                let results = data.response.groups[0].items.map(function (item, index) {
                   return displayResults(item);
                });
                $('#foursquare-results').html(results);
                $('.save1-button').on('click', function(e){
                    //console.log("hello!")
                    event.preventDefault();
                    var e = window.event,
                    btn = e.target || e.srcElement;
                    const brewTitle = btn.id;
                    const img = btn.getAttribute('data-imgurl');
                    const address = btn.getAttribute('data-address');
                    addNewBrew(brewTitle, img, address);
                    //console.log(btn);
                    //console.log(btn.id);
                    //console.log($('#' + btn.id).attr('imgurl'));
               });
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
    let venueName = result.venue.name;
    venueName = venueName.replace(/["'()]/g,"");
    venueName = venueName.replace(/&/g, "");
    let venueAddress1 = result.venue.location.formattedAddress[0];
    let venueAddress2 = result.venue.location.formattedAddress[1];
    venueAddress1 = venueAddress1.replace(/["'()&]/g,"");
    venueAddress2 = venueAddress2.replace(/["'()&]/g,"");
    venueAddress3 = venueAddress1 + " " + venueAddress2;
    let VENUE_ID = result.venue.id;
    const FOURSQUARE_PHOTO_URL = "https://api.foursquare.com/v2/venues/" + result.venue.id + "/photos?&client_id=4EV4L2TYGITPLJCO4NYMHAXT1VU5ORATYF0DYR3OKO4O0LEF&client_secret=O0MRRAG1BNMQBID4LOIFNRD1XANUCP0J0TV2QTJAYNW1M5RR&v=20180417"
    
    $.ajax(FOURSQUARE_PHOTO_URL, {
        data: {
            limit: 1,
        },
        dataType: 'json',
        type: 'GET',
        async: false,
        success: function(data){
                //console.log(data);
                myPhotoResult = data;
                const venuePhoto = "https://igx.4sqi.net/img/general/width960" + data.response.photos.items[0].suffix;
                //console.log(venuePhoto);
        }
    })
        let venuePhoto = "https://igx.4sqi.net/img/general/width960" + myPhotoResult.response.photos.items[0].suffix;
       // let brewLink = `https://www.google.com/maps/search/${brewLocation} + ${result.venue.location.formattedAddress[1]}`;
            return `
                <div class="result col-3">
                    <div class="result-image" style="background-image: url(https://igx.4sqi.net/img/general/width960${myPhotoResult.response.photos.items[0].suffix})" ;>
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
                        <button type="submit" aria-label="search" data-address="${venueAddress3}" id="${venueName}"  data-imgurl=${venuePhoto} class="save1-button">Save</button>
                    </div>
                </div>
            `;
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
    
    //post brew lists
    function postBrewRequest(userId, title, img, content, address, type){
        $.ajax({
            method: 'POST',
            url: '/brewlist',
            data: JSON.stringify({
              userId: localStorage.getItem('userId'),
              title: title,
              img: img,
              content: content,
              address: address,
              type: type,
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: result => {
            //console.log('success!');
            //console.log(localStorage.getItem('userId'));
             //window.location = "/placesnew.html";
            }
        });
    }

    function addNewBrew(brewTitle, img, address){
        const userId = localStorage.getItem('userId');
        const type = "Coffee/Brewery"
        const content = "Write your review/comments here";
        postBrewRequest(userId, brewTitle, img, content, address, type);
    }

    $(searchLocation);

    //show hidden handle menu on click
    $('.handle').on('click', function(event) {  
        $('nav ul').toggleClass('showing');
    });