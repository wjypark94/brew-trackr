  // Update recipes
  
  function updateBrewRequest(id, title, content, address, type) {
    if (window.localStorage.getItem('brew')) {
      const brew = JSON.parse(window.localStorage.getItem('brew'));
      console.log(id);
      console.log(title);
      console.log(content);
      console.log(address);
      $.ajax({
          method: 'PUT',
          url: `/brewlist/${id}`,
          data: JSON.stringify({
            id: id,
            title: title,
            content: content,
            address: address,
            type: type,
          }),
          contentType: 'application/json',
          dataType: 'json',
          success: result => {
             window.location = "/placesnew.html";
          }
      });
  }
}

function addNewBrew() {
  if (window.localStorage.getItem('brew')) {
    const brew = JSON.parse(window.localStorage.getItem('brew'));
    const brewId = brew.id;
    const brewTitle = $('#brew-title').val().trim();
    const brewContent = $('.brew-entry').val().trim();
    const brewAddress = $('.brew-address').val().trim();
    const brewType = $('.brew-type').val().trim();
    updateBrewRequest(brewId, brewTitle, brewContent, brewAddress, brewType);
  }
}

//hit update and run addNewBrew function
$('.new-brew-form').submit(function(event) {
    event.preventDefault();
    addNewBrew();
});

/**** automatic autocomplete form****/
function fillForm() {

if (window.localStorage.getItem('brew')) {
    const brew = JSON.parse(window.localStorage.getItem('brew'));
    //console.log(recipe);  
    $('#brew-title').val(brew.title);
    $('.brew-entry').val(brew.content);
    $('.brew-address').val(brew.address);
    $('.brew-type').val(brew.type);
}
}

$(fillForm);