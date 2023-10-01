$(() => {
  $('input').css({'margin-right': '10px'}); // Set margin for all inputs
  let amenities = {}; // Store all checked amenities

  /**
   * Listen if an input is checked. If so, store it in amenities
   * If the input is unchecked by the user, make a filter to delete it
   */
  $("input:checkbox").on('change', function () {
    if ($( this ).prop('checked')){
      amenities[$( this ).data('id')] = $( this ).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenities).join(', ')); // Join all checked amenities
  });

  /** Check status of API */
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5001/api/v1/status/",
    dataType: "json"
  }).done((data) => {
    if (data.status === 'OK')
      $("div#api_status").addClass('available');
    else
      $("div#api_status").removeClass('available');
  });

  $('button').on('click', () => {
    $.ajax({
      method: "POST",
      url: "http://127.0.0.1:5001/api/v1/places_search/",
      data: JSON.stringify({'amenities': Object.keys(amenities)}),
      contentType: 'application/json',
      dataType: 'json',
    }).done( (response) => {
      let html = ``;
      response.forEach(place => {
        html += `
        <article>
          <div class="title_box">
            <h2>${ place.name }</h2>
            <div class="price_by_night">$${ place.price_by_night }</div>
          </div>
          <div class="information">
            <div class="max_guest">${ place.max_guest } Guest</div>
              <div class="number_rooms">${ place.number_rooms } Bedroom</div>
              <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
          </div>
          <div class="description">${ place.description }</div>
        </article>
        `
      });
      $('.places').append(html);
    }).fail((error) => {
      console.log("Error " + error);
    });
  });
});

