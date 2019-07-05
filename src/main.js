import $ from 'jquery';
import { DoctorSearch } from "./search.js"

$(document).ready(function() {
  $('#search').click(function() {
    let name = $('#name').val();
    let symptom = $('#symptom').val();
    $('#name').val("");
    $('#symptom').val("");


    let doctorSearch = new DoctorSearch();
    let nameSearchResult = doctorSearch.getDoctorByName(name)
    // let symptomSearchResult = searchResults.getDoctorBySymptom(symptom);
    nameSearchResult.then(function(response) {
      body = JSON.parse(response);
      $('.showdoc').text(`${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
