function getBrewEntries(callbackFn) {
    $.ajax({
      url: `/brewlist/user/${localStorage.getItem('userId')}`,
      type: 'GET',
      dataType: 'json',
  
      success: data => {
        if(data) {
          let results = data;
          callbackFn(results);
        }
      }
    });
  }


function displayRecipeEntries(data) {
    console.log(data);
         $('.container').append(`
            <div class="col-8" id="${data}">
              <div class="acd-content col-12">
              </div>
            </div>
          `);
    
  }

  function getAndDisplayRecipeEntries() {
    getBrewEntries(displayRecipeEntries);
  }
  
  const token = localStorage.getItem('token');

$.ajax({
  method: 'GET',
  url: '/api/protected',
  headers: {
    Authorization: `Bearer ${token}`
  },
  success: response => $('.header').html(response.data),
  error: error => window.location = "/"
});

$(getAndDisplayRecipeEntries);