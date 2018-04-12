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
           <button class="btn row"> ${data.brew[index].title}</button
             <img src="${data.brew[index].img}">
             <div class="acd-content col-12">

             <p class="brew-content">${data.brew[index].content}</p>
             <button id="${data.brew[index].id}" class="delete-btn">Delete</button><button id="${data.brew[index].id}" class="edit-btn">Edit</button>
             <div id="raw-data" hidden>${JSON.stringify(data.brew[index])}</div>
             </div>
           </div>
         `);
   }
  }
  function deleteBrewEntries(data) {
    for (index in data.brew) {
      $('.delete-btn').on('click', function(event) {
        let brewId = $(this).attr('id');
        console.log(brewId);
        $.ajax({
          url: `/brewlist/${brewId}`,
          type: 'DELETE',
          dataType: 'json',
          contentType: 'application/json',
  
          success: data => {
            console.log("it worked!")
            window.location = "/placesnew.html"
          }
        });
      });
    }
  }

  function getAndDisplayBrewEntries() {
    getBrewEntries(displayBrewEntries);
  }


function getAndDeleteBrewEntries() {
    getBrewEntries(deleteBrewEntries);
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
$(getAndDeleteBrewEntries);

$(document).on('click', 'button', function () {
    $(this).toggleClass("max").next().slideToggle(500);
});

$(document).on('click', '.edit-btn', function(event) {
    window.localStorage.setItem('brew', $(this).siblings('#raw-data').text())
    window.location = '/editbrews.html';
  });