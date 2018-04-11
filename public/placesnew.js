function getBrewEntries(callbackFn) {
   // $('.save2-button').click(function () {
     //   console.log("hello")
    $.ajax({
      url: `/brewlist/user/${localStorage.getItem('userId')}`,
      type: 'GET',
      dataType: 'json',
  
      success: data => {
        if(data) {
          let results = data;
          console.log(results);
          callbackFn(results);
        }
      }
    });
//})
  }


function displayBrewEntries(data) {

    for (index in data.brew) {
        $('.container').append(`
           <div class="col-8" id="${data.brew[index].id}">
           ${data.brew[index].title}
             <div class="acd-content col-12">


             </div>
           </div>
         `);
   }
  }

  function getAndDisplayBrewEntries() {
    getBrewEntries(displayBrewEntries);
  }
  
  const token = localStorage.getItem('token');

$.ajax({
  method: 'GET',
  url: '/api/protected',
  headers: {
    Authorization: `Bearer ${token}`
  },
  success: response => $('.header').html(response.data),
  //error: error => window.location = "/"
});

$(getAndDisplayBrewEntries);