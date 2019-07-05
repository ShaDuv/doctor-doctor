import $ from 'jquery';
import { DoctorSearch } from './search.js';

$(document).ready(function() {
  $('#search').click(function() {
    let name = $('#name').val();
    let symptom = $('#symptom').val();
    $('#name').val("");
    $('#symptom').val("");


    let doctorSearch = new DoctorSearch();
    let nameSearchResult = doctorSearch.getDoctorByName(name);
    nameSearchResult.then(function(response) {
      let body = JSON.parse(response);
      console.log(nameSearchResult);
      for (var i = 0; i < body.data.practices.length; i++) {
        array[i]
      }

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
