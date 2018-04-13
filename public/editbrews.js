function fillForm() {

    if (window.localStorage.getItem('brew')) {
        const brew = JSON.parse(window.localStorage.getItem('brew'));
        //console.log(recipe);  
        $('#brew-title').val(brew.title);
        $('.brew-entry').val(brew.content);
        $('.brew-type').val(brew.address);
    }
  }
  
  // Update recipes
  
  function updateBrewRequest(id, title, content, address) {
      if (window.localStorage.getItem('brew')) {
        const brew = JSON.parse(window.localStorage.getItem('brew'));
        let brewId = brew.id;
  
        $.ajax({
            method: 'PUT',
            url: `/brewlist/${brewId}`,
            data: JSON.stringify({
              id: id,
              title: title,
              content: content,
              address: address,
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
      const brewAddress = $('.brew-type').val().trim();
 
  
  
      updateBrewRequest(brewId, brewTitle, brewContent, brewAddress);
    }
  
  }
  //hit update and run addNewBrew function
  $('.new-brew-form').submit(function(event) {
      event.preventDefault();
      addNewBrew();
  });