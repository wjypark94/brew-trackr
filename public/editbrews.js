function fillForm() {

    if (window.localStorage.getItem('brew')) {
        const brew = JSON.parse(window.localStorage.getItem('brew'));
        //console.log(recipe);  
        $('#brew-title').val(brew.title);
        $('.brew-entry').val(brew.content);
    }
  }
  
  // Update recipes
  
  function updateBrewRequest(id, title, content) {
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
 
  
  
      updateBrewRequest(brewId, brewTitle, brewContent);
    }
  
  }
  
  $('.new-brew-form').submit(function(event) {
      event.preventDefault();
      addNewBrew();
  });