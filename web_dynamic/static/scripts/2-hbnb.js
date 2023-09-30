$(() => {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5001/api/v1/status/",
    dataType: "JSON"
  }).done((data) => {
    if (data.status === 'OK')
      $("div#api_status").addClass('available');
    else
      $("div#api_status").removeClass('available');
  });
});
