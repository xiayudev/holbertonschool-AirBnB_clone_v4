$(() => {
  $('input').css({'margin-right': '10px'}); // Set margin for all inputs
  let amenities = []; // Store all checked amenities

  /**
   * Listen if an input is checked. If so, store it in amenities
   * If the input is unchecked by the user, make a filter to delete it
   */
  $("input:checkbox").on('change', function () {
    if ($( this ).prop('checked')){
      amenities.push($( this ).data('name'));
    } else {
      const search = $( this ).data('name');
      amenities = amenities.filter(function(amenity) {
        return amenity !== search;
      });
    }
    $('.amenities h4').text(amenities.join(', ')); // Join all checked amenities
  });
});
