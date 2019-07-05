import $ from 'jquery';
$(document).ready(function() {
  $('#search').click(function() {
    let name = $('#name').val();
    let symptom = $('#symptom').val();
    $('#name').val("");
    $('#symptom').val("");


    let doctorSearch = new DoctorSearch();
    let nameSearchResult = searchResults.getDoctorByName(name);
    let symptomSearchResult = searchResults.getDoctorBySymptom(symptom);

    promise.then(function(response) {
      body = JSON.parse(response);
      // $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      // $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
